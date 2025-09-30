import {
  CSSProperties,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { EditOutlined } from '@ant-design/icons';
import {
  addToChangeSet,
  combineChanges,
  dropOrphans,
  EntityChange,
  ChangeSet,
  getSchema,
  applyChanges,
  cloneEntity,
  expandMaterialized,
  MaterializedEntity,
  PropertyAccessLevel,
  PropertyChange,
  ContributionStatus,
  Review,
  combineContributionChanges,
  Contribution,
} from '@dotproductdev/voyages-contribute';
import {
  CollapseProps,
  Form,
  Row,
  Col,
  Input,
  Select,
  Card,
  Modal,
  Typography,
  Button,
  message,
} from 'antd';
import { useSelector } from 'react-redux';

import { usePageRouter } from '@/hooks/usePageRouter';
import { RootState } from '@/redux/store';
import { translationLanguagesContribute } from '@/utils/functions/translationLanguages';

import ChangesSummary from './ChangesSummary';
import ContributionEditDecision from './ContributionEditDecision';
import { EntityForm } from './EntityForm';
import PreviewChangeDialog from './PreviewChange/PreviewChangeDialog';
import { TransformedContribution } from './utils/transformContributionData';

const { Text } = Typography;

export enum ReviewMode {
  Create = 'create',
  Edit = 'edit',
  ReadOnly = 'read-only',
  Review = 'review',
}
export const ContributionSectionStyle: CSSProperties = {
  height: 'calc(100vh - 160px)',
  scrollSnapAlign: 'start',
};

function combineOwnedChanges(changes: PropertyChange[]): PropertyChange[] {
  const seen: Record<string, PropertyChange> = {};

  changes.forEach((change) => {
    seen[change.property] = change;
  });

  return Object.values(seen);
}

function combineEntityChanges(changes: EntityChange[]): EntityChange[] {
  return changes.map((change) => {
    if (change.type === 'update') {
      return {
        ...change,
        changes: change.changes.map((propertyChange) => {
          if (propertyChange.kind === 'owned') {
            return {
              ...propertyChange,
              changes: combineOwnedChanges(propertyChange.changes),
            };
          }
          return propertyChange;
        }),
      };
    }
    return change;
  });
}

export interface ContributionFormProps {
  entity: MaterializedEntity;
  changeSet: ChangeSet;
  onChange: (changeSet: ChangeSet | TransformedContribution) => void;
  accessLevel?: PropertyAccessLevel;
  contributionId?: string;
  currentStatus?: ContributionStatus;
  mode?: ReviewMode;
  reviews?: Review[];
  onStartReview?: () => void;
  onCommitReview?: (review: Review) => void;
  onAbandonReview?: () => void;
  onEditorialDecision?: (
    decision: 'accept' | 'reject',
    comments?: string,
  ) => void;
  title?: string;
}

export const ContributionForm = ({
  entity,
  changeSet,
  onChange,
  accessLevel: initAccessLevel,
  contributionId,
  currentStatus,
  mode,
  reviews = [],
  onStartReview,
  onCommitReview,
  onAbandonReview,
  onEditorialDecision,
  title,
}: ContributionFormProps) => {
  const { contributePath } = usePageRouter();
  const [contributeForm] = Form.useForm();
  const schema = getSchema(entity.entityRef.schema);
  const [accessLevel, setAccessLevel] = useState<PropertyAccessLevel>(
    initAccessLevel ?? PropertyAccessLevel.AdvancedContributor,
  );
  const [globalExpand, setGlobalExpand] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string[]>([]);
  const [sections, setSections] = useState<CollapseProps['items']>([]);
  const { languageValue } = useSelector(
    (state: RootState) => state.getLanguages,
  );
  const translatedcontribute = translationLanguagesContribute(languageValue);
  const [previewEntity, setPreviewEntity] = useState<
    MaterializedEntity | undefined
  >(undefined);
  const [isReviewMode, setIsReviewMode] = useState(mode === ReviewMode.Review);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [decisionComments, setDecisionComments] = useState('');
  const [selectedDecision, setSelectedDecision] = useState<
    'accept' | 'reject' | null
  >(null);
  const [originalChanges, setOriginalChanges] = useState<EntityChange[]>([]);
  const [originalEntityRef, setOriginalEntityRef] = useState<{
    schema: string;
    id: string | number;
  } | null>(null);
  const isNewVoyages = contributePath === 'interim';
  const isReadOnlyMode = mode === ReviewMode.ReadOnly && !isReviewMode;

  // Compute the entity with all stacked changes applied
  const stackedEntity = useMemo(() => {
    if (!contributionId || reviews.length === 0) {
      return entity;
    }

    try {
      // Create a mock contribution with all reviews
      const mockContribution: Contribution = {
        id: contributionId,
        root: entity.entityRef,
        changeSet: changeSet,
        status: currentStatus || ContributionStatus.WorkInProgress,
        reviews: reviews,
        media: [],
      };

      // Get the combined changeset from the library
      const combinedChangeSet = combineContributionChanges(mockContribution);

      // Convert the combined changeset back to EntityChange format
      const allChanges: EntityChange[] = [
        ...combinedChangeSet.deletions,
        ...combinedChangeSet.updates,
      ];

      // Apply all changes to create the stacked entity
      const stackedEntityClone = cloneEntity(entity);
      applyChanges(expandMaterialized(stackedEntityClone), allChanges);

      return stackedEntityClone;
    } catch (error) {
      console.error('Error computing stacked entity:', error);
      return entity;
    }
  }, [contributionId, reviews, entity, changeSet, currentStatus]);

  const accessLevelOptions = Object.entries(PropertyAccessLevel)
    .filter(
      ([key]) =>
        isNaN(Number(key)) &&
        key !== 'Hidden' &&
        !(isNewVoyages && key === 'Editor'),
    )
    .map(([label, value]) => ({
      label: label.replace(/([A-Z])/g, ' $1').trim(),
      value,
    }));

  useEffect(() => {
    contributeForm.setFieldsValue({
      title: changeSet.title,
      comments: changeSet.comments,
      accessLevel: PropertyAccessLevel.AdvancedContributor,
    });
  }, [changeSet.title, changeSet.comments, contributeForm]);

  // Removed handleEditorialDecision - using new decision panel instead

  const handleStartReview = useCallback(() => {
    setIsReviewMode(true);

    // Store the original changes and entity reference before clearing them
    const currentChangeSet = changeSet;
    console.log({ currentChangeSet });
    setOriginalChanges(currentChangeSet.changes);

    // Store the entity reference so we can recreate the empty entity later
    if (currentChangeSet.changes && currentChangeSet.changes.length > 0) {
      const firstChange = currentChangeSet.changes[0];
      setOriginalEntityRef({
        schema: firstChange.entityRef.schema,
        id: firstChange.entityRef.id,
      });
    } else {
      // Fall back to using the entity prop
      setOriginalEntityRef({
        schema: entity.entityRef.schema,
        id: entity.entityRef.id,
      });
    }

    // Create a new empty changeset for the review
    // The original changes are now stored in originalChanges state and
    // will be accessible through the stackedEntity calculation
    onChange({
      ...currentChangeSet,
      changes: [], // Start with empty changes for the review
    });

    setCurrentReview({
      changeSet: {
        id: `review-${Date.now()}`,
        author: 'Editor', // TODO: Get from current user
        title: `Review for ${currentChangeSet.title}`,
        comments: '',
        timestamp: Date.now(),
        changes: [],
      },
      stackOrder: reviews.length + 1,
    });

    if (onStartReview) {
      onStartReview();
    }
  }, [
    changeSet,
    entity.entityRef.schema,
    entity.entityRef.id,
    onChange,
    onStartReview,
    reviews.length,
  ]);

  const handleCommitReview = () => {
    if (!currentReview) return;

    Modal.confirm({
      title: 'Commit Review',
      content:
        'Are you sure you want to commit this review? This will add your changes as a new changeset.',
      okText: 'Commit Review',
      onOk: () => {
        const reviewWithChanges = {
          ...currentReview,
          changeSet: {
            ...currentReview.changeSet,
            changes: changeSet.changes,
          },
        };

        if (onCommitReview) {
          onCommitReview(reviewWithChanges);
        }

        setIsReviewMode(false);
        setCurrentReview(null);
        message.success('Review committed successfully');
      },
    });
  };

  const handleAbandonReview = useCallback(() => {
    Modal.confirm({
      title: 'Abandon Review',
      content:
        'Are you sure you want to abandon this review? All unsaved changes will be lost.',
      okText: 'Abandon Review',
      okButtonProps: { danger: true },
      onOk: () => {
        setIsReviewMode(false);
        setCurrentReview(null);
        // Use current changeSet without adding it to dependencies
        const currentChangeSet = changeSet;
        onChange({ ...currentChangeSet, changes: [] }); // Reset changes
        if (onAbandonReview) {
          onAbandonReview();
        }
        message.info('Review abandoned');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, onAbandonReview]);

  const handleEditorialDecisionSubmit = () => {
    console.log({ selectedDecision, decisionComments });
    if (!selectedDecision || !onEditorialDecision) return;

    Modal.confirm({
      title: `${selectedDecision === 'accept' ? 'Accept' : 'Reject'} this contribution?`,
      content: `Are you sure you want to ${selectedDecision} this contribution? This action cannot be undone.`,
      okText: selectedDecision === 'accept' ? 'Accept' : 'Reject',
      okButtonProps: {
        danger: selectedDecision === 'reject',
        style:
          selectedDecision === 'accept'
            ? { background: '#52c41a', borderColor: '#52c41a' }
            : undefined,
      },
      onOk: () => {
        onEditorialDecision(selectedDecision, decisionComments);
        setSelectedDecision(null);
        setDecisionComments('');
      },
    });
  };

  const onChangesUpdate = useCallback(
    (newChange: EntityChange) => {
      // Use a ref to avoid dependency on changeSet
      const currentChangeSet = changeSet;
      const next = addToChangeSet(currentChangeSet.changes, newChange);
      dropOrphans(next);
      const combined = combineEntityChanges(next);
      onChange({ ...currentChangeSet, changes: combined });
    },
    [changeSet, onChange],
  );

  const handlePreviewChanges = () => {
    const formValues = contributeForm.getFieldsValue();
    console.log('Form Values:', formValues);
    console.log('ChangeSet:', changeSet);
    const combined = combineChanges(changeSet.changes);
    console.log('Flattened change set:', combined);

    const updated = cloneEntity(entity);
    applyChanges(expandMaterialized(updated), changeSet.changes);
    setPreviewEntity(updated);
    console.log('Entity after applying changes:', updated);
  };

  const submitChanges = async () => {
    try {
      const formValues = await contributeForm.validateFields();

      const payload = {
        title: formValues.title,
        comments: formValues.comments,
        accessLevel: formValues.accessLevel,
        timestamp: Date.now(),
        changes: changeSet.changes,
      };

      console.log('Submit Payload:', payload);
      // TODO: Call your API here
      // await yourApi.submitContribution(payload);

      alert('Changes submitted successfully!');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const resetAllChanges = useCallback(() => {
    const title = isReviewMode ? 'Abandon review?' : 'Reset all changes?';
    const content = isReviewMode
      ? 'This will abandon the current review and clear all changes. Are you sure?'
      : 'This will clear all unsaved edits. Are you sure?';

    Modal.confirm({
      title,
      content,
      onOk: () => {
        if (isReviewMode) {
          handleAbandonReview();
        } else {
          // Use current values without adding to dependencies
          const currentChangeSet = changeSet;
          onChange({ ...currentChangeSet, changes: [] });
          contributeForm.resetFields();
        }
      },
    });
  }, [isReviewMode, handleAbandonReview, changeSet, onChange, contributeForm]);

  const toggleExpandAll = () => {
    const allKeys = sections?.map((section) => section.key as string) ?? [];
    setExpandedMenu(globalExpand ? [] : allKeys);
    setGlobalExpand(!globalExpand);
  };

  const handleDeletePropertyChange = useCallback(
    (propertyToDelete: string) => {
      const prev = changeSet;
      const updatedChanges: EntityChange[] = prev.changes
        .map((entityChange) => {
          if (
            'changes' in entityChange &&
            Array.isArray(entityChange.changes)
          ) {
            const updatedEntityChanges = entityChange.changes
              .map((propChange) => {
                if (
                  'changes' in propChange &&
                  Array.isArray(propChange.changes)
                ) {
                  const filteredFieldChanges = propChange.changes.filter(
                    (fieldChange) => fieldChange?.property !== propertyToDelete,
                  );

                  if (filteredFieldChanges.length === 0) return null;

                  return {
                    ...propChange,
                    changes: filteredFieldChanges,
                  };
                }
                return propChange;
              })
              .filter(Boolean);

            if (updatedEntityChanges.length === 0) return null;

            return {
              ...entityChange,
              changes: updatedEntityChanges,
            };
          }

          return entityChange;
        })
        .filter(Boolean) as EntityChange[];

      onChange({
        ...prev,
        changes: updatedChanges,
      });
    },
    [changeSet, onChange],
  );

  return (
    <>
      {title && <h1 className="page-title-1">{title}</h1>}
      <Form
        form={contributeForm}
        layout="vertical"
        onFinish={submitChanges}
        style={{
          ...ContributionSectionStyle,
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          justifyContent: 'space-around',
        }}
      >
        <Card
          title={
            <div className="contribute-edit-header">
              <span>Contribution Details</span>
              {mode === ReviewMode.ReadOnly && !isReviewMode && (
                <>
                  <Button
                    icon={<EditOutlined />}
                    onClick={handleStartReview}
                    disabled={currentStatus === ContributionStatus.Published}
                  >
                    Start Review
                  </Button>
                </>
              )}
            </div>
          }
          className="card-contribute"
          style={{ flexShrink: 0 }}
          styles={{ body: { padding: '10px' } }}
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Contribution Title" name="title">
                <Input disabled={isReadOnlyMode} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {initAccessLevel === undefined && (
                <Form.Item label="Contributor Mode" name="accessLevel">
                  <Select
                    options={accessLevelOptions}
                    style={{ width: '100%' }}
                    value={accessLevel}
                    onChange={(value: PropertyAccessLevel) =>
                      setAccessLevel(value)
                    }
                    disabled={isReadOnlyMode}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  isReviewMode ? 'Review Comments' : 'Contribution Message'
                }
                name="comments"
              >
                <Input.TextArea rows={8} disabled={isReadOnlyMode} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Row
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          gap: '4px',
          ...(mode === ReviewMode.Edit ? ContributionSectionStyle : null),
        }}
      >
        <Col
          span={12}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Card
            style={{
              flex: 1,
              overflow: 'auto',
              flexDirection: 'column',
              display: 'flex',
            }}
            styles={{
              body: {
                padding: 8,
              },
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                background: '#fff',
                padding: 10,
                borderBottom: '1px solid #f0f0f0',
                zIndex: 99,
              }}
            >
              <Text strong>{translatedcontribute.titleCollaps}</Text>
              <Button onClick={toggleExpandAll} style={{ marginLeft: 12 }}>
                {globalExpand
                  ? translatedcontribute.collapse
                  : translatedcontribute.expand}
              </Button>
            </div>
            <div
              style={{
                overflow: 'hidden',
                padding: 4,
                flex: 1,
              }}
            >
              <Form>
                <EntityForm
                  key={entity.entityRef.id}
                  schema={schema}
                  entity={isReviewMode ? stackedEntity : entity}
                  changes={changeSet.changes}
                  onChange={isReadOnlyMode ? () => {} : onChangesUpdate}
                  expandedMenu={expandedMenu}
                  setExpandedMenu={setExpandedMenu}
                  accessLevel={accessLevel}
                  onSectionsChange={setSections}
                  readOnly={isReadOnlyMode}
                />
              </Form>
            </div>
          </Card>
        </Col>

        <Col
          span={12}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Card
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            styles={{
              body: {
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              },
            }}
          >
            <div
              style={{
                padding: 10,
                borderBottom: '1px solid #eee',
                background: '#fff',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text strong>Changes Summary</Text>
              <Text type="secondary">
                {changeSet.changes.length} change
                {changeSet.changes.length !== 1 && 's'}
              </Text>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              <ChangesSummary
                changes={changeSet.changes}
                resetAllChanges={resetAllChanges}
                submitChanges={submitChanges}
                handleSaveChanges={submitChanges}
                handlePreview={handlePreviewChanges}
                entity={entity}
                handleDeleteChange={handleDeletePropertyChange}
                isReviewMode={isReviewMode}
                onCommitReview={handleCommitReview}
                readOnly={isReadOnlyMode}
              />
            </div>
          </Card>
        </Col>
      </Row>
      {isReviewMode && (
        <ContributionEditDecision
          handleEditorialDecisionSubmit={handleEditorialDecisionSubmit}
          setSelectedDecision={setSelectedDecision}
          selectedDecision={selectedDecision}
          mode={mode}
          setDecisionComments={setDecisionComments}
          decisionComments={decisionComments}
          contributionId={contributionId}
          currentStatus={currentStatus}
          reviews={reviews}
          isReviewMode={isReviewMode}
        />
      )}
      <PreviewChangeDialog
        previewEntity={previewEntity}
        open={previewEntity !== undefined}
        onClose={() => setPreviewEntity(undefined)}
      />
    </>
  );
};
