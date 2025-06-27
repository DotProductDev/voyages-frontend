import { CSSProperties, useCallback, useEffect, useState } from 'react';

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
} from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import { translationLanguagesContribute } from '@/utils/functions/translationLanguages';

import ChangesSummary from './ChangesSummary';
import { EntityForm } from './EntityForm';
import PreviewChangeDialog from './PreviewChange/PreviewChangeDialog';

const { Text } = Typography;

export const ContributionSectionStyle: CSSProperties = {
  height: 'calc(100vh - 160px)',
  scrollSnapAlign: 'start',
};

function combineOwnedChanges(changes: PropertyChange[]): PropertyChange[] {
  const seen: Record<string, PropertyChange> = {};

  changes.forEach((change) => {
    seen[change.property] = change; // overwrite old with new
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
  onChange: (changeSet: ChangeSet) => void;
  accessLevel?: PropertyAccessLevel;
}

export const ContributionForm = ({
  entity,
  changeSet,
  onChange,
  accessLevel: initAccessLevel,
}: ContributionFormProps) => {
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

  const accessLevelOptions = Object.entries(PropertyAccessLevel)
    .filter(([key]) => isNaN(Number(key)) && key !== 'Hidden')
    .map(([label, value]) => ({
      label: label.replace(/([A-Z])/g, ' $1').trim(),
      value,
    }));

  useEffect(() => {
    contributeForm.setFieldsValue({
      title: `Contribution for ${schema.getLabel(entity.data)}`,
      comments: '',
      accessLevel: PropertyAccessLevel.AdvancedContributor,
    });
    // TODO: Thasanee: I commented out the following as now the
    // changeSet is managed by the parent component.
    //onChange({
    //  id: -1,
    //  author: 'Mocked',
    //  title: `Contribution for ${schema.getLabel(entity.data)}`,
    //  changes: [],
    //  comments: '',
    //  timestamp: new Date().getTime(),
    //});
  }, [schema, contributeForm, entity, onChange]);

  const onChangesUpdate = useCallback(
    (newChange: EntityChange) => {
      const current = changeSet;
      const next = addToChangeSet(current.changes, newChange);
      dropOrphans(next);
      const combined = combineEntityChanges(next);
      onChange({ ...current, changes: combined });
    },
    [onChange, changeSet],
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
    Modal.confirm({
      title: 'Reset all changes?',
      content: 'This will clear all unsaved edits. Are you sure?',
      onOk: () => {
        onChange({ ...changeSet, changes: [] });
        contributeForm.resetFields();
      },
    });
  }, [onChange, changeSet, contributeForm]);

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
        {/* Top Form - Contribution Details */}
        <Card
          title="Contribution Details"
          style={{ flexShrink: 0 }}
          styles={{ body: { padding: '10px 16px' } }}
        >
          <Row gutter={6}>
            <Col span={12}>
              <Form.Item label="Contribution Title" name="title">
                <Input />
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
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={24}>
              <Form.Item label="Contribution Message" name="comments">
                <Input.TextArea rows={8} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      {/* Middle Section */}
      <Row
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          gap: '4px',
          ...ContributionSectionStyle,
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
                  entity={entity}
                  changes={changeSet.changes}
                  onChange={onChangesUpdate}
                  expandedMenu={expandedMenu}
                  setExpandedMenu={setExpandedMenu}
                  accessLevel={accessLevel}
                  onSectionsChange={setSections}
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
            {/* Sticky header */}
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

            {/* Scrollable area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              <ChangesSummary
                changes={changeSet.changes}
                resetAllChanges={resetAllChanges}
                submitChanges={submitChanges}
                handleSaveChanges={submitChanges}
                handlePreview={handlePreviewChanges}
                entity={entity}
                handleDeleteChange={handleDeletePropertyChange}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <PreviewChangeDialog
        previewEntity={previewEntity}
        open={previewEntity !== undefined}
        onClose={() => setPreviewEntity(undefined)}
      />
    </>
  );
};

export default ContributionForm;
