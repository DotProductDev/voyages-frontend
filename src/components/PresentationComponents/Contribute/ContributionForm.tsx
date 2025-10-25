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

import { createSaveChangeContribution } from '@/fetch/contributeFetch/createSaveChangeContribution';
import { createSubmitChangeContribution } from '@/fetch/contributeFetch/createSubmitChangeContribution';
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
  contribuition: Contribution;
  onChange: (contribuition: Contribution | TransformedContribution) => void;
  accessLevel?: PropertyAccessLevel;
  contributionId?: string;
  currentStatus?: ContributionStatus;
  mode?: ReviewMode;
  onStartReview?: () => void;
  onCommitReview?: (review: Review) => void;
  onAbandonReview?: () => void;
  handleSaveChanges?: () => Promise<void>;
  onEditorialDecision?: (
    decision: 'accept' | 'reject',
    comments?: string,
  ) => void;
  title?: string;
}

export const ContributionForm = ({
  entity,
  contribuition,
  onChange,
  accessLevel: initAccessLevel,
  contributionId,
  currentStatus,
  mode,
  onStartReview,
  onCommitReview,
  onAbandonReview,
  onEditorialDecision,
  title,
}: ContributionFormProps) => {
  const { reviews, changeSet } = contribuition;
  const { contributePath } = usePageRouter();
  const { languageValue } = useSelector(
    (state: RootState) => state.getLanguages,
  );
  const translatedcontribute = translationLanguagesContribute(languageValue);
  const [contributeForm] = Form.useForm();
  const schema = getSchema(entity.entityRef.schema);
  const [accessLevel, setAccessLevel] = useState<PropertyAccessLevel>(
    initAccessLevel ?? PropertyAccessLevel.AdvancedContributor,
  );
  const [globalExpand, setGlobalExpand] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string[]>([]);
  const [sections, setSections] = useState<CollapseProps['items']>([]);
  const [isSaveChange, setIsSaveChange] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [previewEntity, setPreviewEntity] = useState<
    MaterializedEntity | undefined
  >(undefined);

  const [decisionComments, setDecisionComments] = useState('');
  const [selectedDecision, setSelectedDecision] = useState<
    'accept' | 'reject' | null
  >(null);

  // Track review mode and changes
  const [isReviewMode, setIsReviewMode] = useState(mode === ReviewMode.Review);
  const [originalChanges, setOriginalChanges] = useState<EntityChange[]>([]);
  const [reviewChanges, setReviewChanges] = useState<EntityChange[]>([]);
  const [preReviewState, setPreReviewState] = useState<Contribution | null>(
    null,
  );

  useEffect(() => {
    setIsReviewMode(mode === ReviewMode.Review);
  }, [mode]);

  const isNewVoyages = contributePath === 'interim';
  const isReadOnlyMode = mode === ReviewMode.ReadOnly && !isReviewMode;

  const stackedEntity = useMemo(() => {
    if (!contributionId) {
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

      // Clone the entity
      const stackedEntityClone = cloneEntity(entity);

      // Expand the entity to ensure all nested structures are available
      const expandedEntity = expandMaterialized(stackedEntityClone);

      // Apply all changes from the combined changeset
      applyChanges(expandedEntity, allChanges);

      // Then apply changes in stacking order:
      // 1. Apply original contribution changes
      if (originalChanges.length > 0) {
        applyChanges(expandedEntity, originalChanges);
      }

      // 2. Apply each committed review's changes
      reviews.forEach((review) => {
        if (review.changeSet.changes && review.changeSet.changes.length > 0) {
          applyChanges(expandedEntity, review.changeSet.changes);
        }
      });

      // 3. Apply current review changes (if in review mode)
      if (isReviewMode && reviewChanges.length > 0) {
        applyChanges(expandedEntity, reviewChanges);
      }

      return stackedEntityClone;
    } catch (error) {
      console.error('Error computing stacked entity:', error);
      return entity;
    }
  }, [
    changeSet,
    currentStatus,
    contributionId,
    entity,
    originalChanges,
    reviews,
    isReviewMode,
    reviewChanges,
  ]);

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

  // Initialize original changes when component mounts
  useEffect(() => {
    if (
      contribuition.changeSet.changes &&
      contribuition.changeSet.changes.length > 0
    ) {
      setOriginalChanges(changeSet.changes);
    }
  }, [contribuition.changeSet.changes, changeSet.changes]);

  useEffect(() => {
    contributeForm.setFieldsValue({
      title: changeSet.title,
      comments: changeSet.comments,
      accessLevel: PropertyAccessLevel.AdvancedContributor,
    });
  }, [changeSet.title, changeSet.comments, contributeForm]);

  // Review mode handlers
  const handleStartReview = useCallback(() => {
    setPreReviewState(contribuition);
    setIsReviewMode(true);
    setReviewChanges([]);
    if (onStartReview) {
      onStartReview();
    }
  }, [contribuition, onStartReview]);

  const handleCommitReview = useCallback(() => {
    if (reviewChanges.length === 0) {
      message.warning('No changes to commit');
      return;
    }

    const comments = contributeForm.getFieldValue('comments') || '';
    const review: Review = {
      changeSet: {
        id: `changeset-${Date.now()}`,
        author: 'current-user',
        title: changeSet.title || '',
        comments: comments,
        timestamp: new Date().toISOString() as unknown as number,
        changes: reviewChanges,
      },
      stackOrder: 1,
    };

    if (onCommitReview) {
      onCommitReview(review);
    }

    setIsReviewMode(false);
    setReviewChanges([]);
    setPreReviewState(null);
    message.success('Review committed successfully');
  }, [reviewChanges, changeSet.title, contributeForm, onCommitReview]);

  const handleCancelReview = useCallback(() => {
    Modal.confirm({
      title: 'Cancel Review',
      content:
        'Are you sure you want to cancel? All review changes will be lost.',
      onOk: () => {
        if (preReviewState) {
          onChange(preReviewState);
        }
        setIsReviewMode(false);
        setReviewChanges([]);
        setPreReviewState(null);
        if (onAbandonReview) {
          onAbandonReview();
        }
      },
    });
  }, [preReviewState, onChange, onAbandonReview]);

  const handleEditorialDecisionSubmit = useCallback(() => {
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
  }, [selectedDecision, decisionComments, onEditorialDecision]);

  const onChangesUpdate = useCallback(
    (newChange: EntityChange) => {
      // Reset save state when new changes are made
      setIsSaveChange(false);

      if (isReviewMode) {
        const nextReviewChanges = addToChangeSet(reviewChanges, newChange);
        dropOrphans(nextReviewChanges);
        const combined = combineEntityChanges(nextReviewChanges);
        setReviewChanges(combined);
        onChange({
          ...contribuition,
          changeSet: {
            ...(contribuition.changeSet || changeSet),
            changes: combined,
          },
        });
      } else {
        const next = addToChangeSet(changeSet.changes, newChange);
        dropOrphans(next);
        const combined = combineEntityChanges(next);
        onChange({
          ...contribuition,
          changeSet: {
            ...changeSet,
            changes: combined,
          },
        });
      }
    },
    [contribuition, isReviewMode, reviewChanges, changeSet, onChange],
  );

  const handlePreviewChanges = useCallback(() => {
    const formValues = contributeForm.getFieldsValue();
    console.log('Form Values:', formValues);
    console.log('ChangeSet:', changeSet);

    const changesToApply = isReviewMode ? reviewChanges : changeSet.changes;
    const combined = combineChanges(changesToApply);
    console.log('Flattened change set:', combined);

    const updated = cloneEntity(isReviewMode ? stackedEntity : entity);
    applyChanges(expandMaterialized(updated), changesToApply);
    setPreviewEntity(updated);
    console.log('Entity after applying changes:', updated);
  }, [
    contributeForm,
    changeSet,
    isReviewMode,
    reviewChanges,
    stackedEntity,
    entity,
  ]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setIsSaveChange(false); // Reset while saving
    console.log('changeSet.author', changeSet.author);
    try {
      const formValues = await contributeForm.validateFields();

      const changesToSubmit = isReviewMode ? reviewChanges : changeSet.changes;

      const payload: Contribution = {
        id: contributionId || '-1',
        root: entity.entityRef,
        changeSet: {
          title: formValues.title || changeSet.title,
          comments: formValues.comments || changeSet.comments || '',
          timestamp: Date.now(),
          changes: changesToSubmit,
          author: changeSet.author,
          id: changeSet.id,
        },
        status: ContributionStatus.WorkInProgress,
        reviews: [],
        media: [],
      };

      const response = await createSaveChangeContribution(payload);

      message.success('Changes saved successfully!');
      console.log('Save response:', response);

      setIsSaveChange(true);

      if (isReviewMode) {
        setReviewChanges([]);
        setIsReviewMode(false);
      } else {
        onChange({
          ...response,
        });
      }
    } catch (error) {
      console.error('Validation or save failed:', error);
      message.error(
        error instanceof Error
          ? error.message
          : 'Failed to save changes. Please check the form.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitChanges = async () => {
    if (!isSaveChange) {
      message.warning('Please save your changes before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const formValues = contributeForm.getFieldsValue();

      const changesToSubmit = isReviewMode ? reviewChanges : changeSet.changes;

      const payload: Contribution = {
        id: contributionId || changeSet.id,
        root: entity.entityRef,
        changeSet: {
          title: formValues.title || changeSet.title,
          comments: formValues.comments || changeSet.comments || '',
          timestamp: Date.now(),
          changes: changesToSubmit,
          author: changeSet.author,
          id: changeSet.id,
        },
        status: ContributionStatus.Submitted,
        reviews: [],
        media: [],
      };

      console.log('Submit Payload:', payload);

      const response = await createSubmitChangeContribution(payload);

      message.success('Contribution submitted successfully!');
      console.log('Submit response:', response);

      // Reset states after successful submission
      setIsSaveChange(false);

      if (isReviewMode) {
        setReviewChanges([]);
        setIsReviewMode(false);
      } else {
        onChange({
          ...response,
        });
      }
    } catch (error) {
      console.error('Submission failed:', error);
      message.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit contribution.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAllChanges = useCallback(() => {
    const title = isReviewMode ? 'Cancel review?' : 'Reset all changes?';
    const content = isReviewMode
      ? 'This will cancel the current review and discard all changes. Are you sure?'
      : 'This will clear all unsaved edits. Are you sure?';

    Modal.confirm({
      title,
      content,
      okText: isReviewMode ? 'Cancel Review' : 'Reset Changes',
      okButtonProps: { danger: true },
      onOk: () => {
        if (isReviewMode) {
          handleCancelReview();
        } else {
          onChange({
            ...contribuition,
            changeSet: {
              ...contribuition.changeSet,
              changes: [],
            },
          });
          contributeForm.resetFields();
        }
      },
    });
  }, [
    contribuition,
    isReviewMode,
    handleCancelReview,
    onChange,
    contributeForm,
  ]);

  const toggleExpandAll = () => {
    const allKeys = sections?.map((section) => section.key as string) ?? [];
    setExpandedMenu(globalExpand ? [] : allKeys);
    setGlobalExpand(!globalExpand);
  };

  const handleDeletePropertyChange = useCallback(
    (propertyToDelete: string) => {
      const changesToUpdate = isReviewMode ? reviewChanges : changeSet.changes;

      const updatedChanges: EntityChange[] = changesToUpdate
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

      if (isReviewMode) {
        setReviewChanges(updatedChanges);
        onChange({
          ...contribuition,
          changeSet: {
            ...(contribuition.changeSet || changeSet),
            changes: updatedChanges,
          },
        });
      } else {
        onChange({
          ...contribuition,
          changeSet: {
            ...changeSet,
            changes: updatedChanges,
          },
        });
      }
    },
    [contribuition, isReviewMode, reviewChanges, changeSet, onChange],
  );

  // Display the appropriate change count
  const displayedChanges = isReviewMode ? reviewChanges : changeSet.changes;
  const isShowStartReview =
    mode === ReviewMode.ReadOnly &&
    !isReviewMode &&
    (currentStatus === ContributionStatus.Submitted ||
      currentStatus === ContributionStatus.WorkInProgress);
  const isShowStartReviewDisable = ![
    ContributionStatus.Submitted,
    ContributionStatus.WorkInProgress,
  ].includes(currentStatus!);

  return (
    <>
      {title && <h1 className="page-title-1">{title}</h1>}
      <Form
        form={contributeForm}
        layout="vertical"
        onFinish={isSaveChange ? handleSaveChanges : handleSubmitChanges}
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
              <span>
                {isReviewMode ? 'Review Details' : 'Contribution Details'}
              </span>
              {isShowStartReview && (
                <Button
                  icon={<EditOutlined />}
                  onClick={handleStartReview}
                  disabled={isShowStartReviewDisable}
                  type="primary"
                >
                  Start Review
                </Button>
              )}
              {isReviewMode && (
                <div className="action-review-btn">
                  <Button onClick={handleCancelReview} danger>
                    <div className="abandon-review"> Cancel Review </div>
                  </Button>
                  <Button
                    onClick={handleCommitReview}
                    type="primary"
                    disabled={reviewChanges.length === 0}
                  >
                    <div className="commit-review">
                      Commit Review ({reviewChanges.length} changes)
                    </div>
                  </Button>
                </div>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text strong>
                  {translatedcontribute.titleCollaps}
                  {isReviewMode && ' (Review Mode - Changes Stack on Original)'}
                </Text>
                <Button onClick={toggleExpandAll}>
                  {globalExpand
                    ? translatedcontribute.collapse
                    : translatedcontribute.expand}
                </Button>
              </div>
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
                  changes={displayedChanges}
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
              <Text strong>
                {isReviewMode ? 'Review Changes' : 'Changes Summary'}
              </Text>
              <Text type="secondary">
                {displayedChanges.length} change
                {displayedChanges.length !== 1 && 's'}
              </Text>
            </div>
            {isSaveChange && !isReviewMode && (
              <div
                style={{
                  marginTop: 8,
                  padding: '8px 12px',
                  background: '#f6ffed',
                  border: '1px solid #b7eb8f',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#52c41a',
                }}
              >
                ✓ Changes saved. You can now submit your contribution.
              </div>
            )}
            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              <ChangesSummary
                changes={displayedChanges}
                resetAllChanges={resetAllChanges}
                submitChanges={handleSubmitChanges}
                handleSaveChanges={handleSaveChanges}
                handlePreview={handlePreviewChanges}
                entity={isReviewMode ? stackedEntity : entity}
                handleDeleteChange={handleDeletePropertyChange}
                isReviewMode={isReviewMode}
                onCommitReview={handleCommitReview}
                readOnly={isReadOnlyMode}
                currentStatus={currentStatus}
                isSaveChange={isSaveChange}
                isSaving={isSaving}
                isSubmitting={isSubmitting}
              />
            </div>
          </Card>
        </Col>
      </Row>
      {currentStatus === 1 && (
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
