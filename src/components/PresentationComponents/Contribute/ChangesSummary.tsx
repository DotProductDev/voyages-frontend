import {
  ReloadOutlined,
  SaveOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  EntityChange,
  MaterializedEntity,
} from '@dotproductdev/voyages-contribute';
import { Preview } from '@mui/icons-material';
import { Button, Typography, Timeline, Space } from 'antd';

import PropertyChangesList from './PropertyChangesList';
const { Text } = Typography;

const iconMap = {
  update: <EditOutlined style={{ color: '#1890ff' }} />,
  undelete: <PlusOutlined style={{ color: '#52c41a' }} />,
  delete: <DeleteOutlined style={{ color: '#f5222d' }} />,
};

interface ChangesSummaryProps {
  changes: EntityChange[];
  entity: MaterializedEntity;
  resetAllChanges: () => void;
  submitChanges?: () => void;
  handlePreview: () => void;
  handleSaveChanges: () => void;
  handleDeleteChange: (propertyToDelete: string) => void;
  isReviewMode?: boolean;
  onCommitReview?: () => void;
  readOnly?: boolean;
  currentStatus?: number;
  isSaveChange?: boolean
  isSaving?: boolean
  isSubmitting?: boolean
}

const ChangesSummary = ({
  changes,
  resetAllChanges,
  handlePreview,
  submitChanges,
  handleSaveChanges,
  handleDeleteChange,
  isReviewMode = false,
  onCommitReview,
  readOnly = false,
  currentStatus,
  isSaveChange = false,     
  isSaving = false,         
  isSubmitting = false, 
}: ChangesSummaryProps) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {changes.length === 0 ? (
          <Text type="secondary" italic>
            No changes have been made yet
          </Text>
        ) : (
          <Timeline
            mode="left"
            items={changes.map((change, index) => ({
              key: index,
              color: 'blue',
              dot: iconMap[change.type],
              children: (
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  <div style={{ marginBottom: 8 }}>
                    <Text strong style={{ color: 'rgb(55, 148, 141)' }}>
                      {change.type.toUpperCase()} @{' '}
                      <Text type="secondary">
                        {change.entityRef.schema}#{change.entityRef.id}
                      </Text>
                    </Text>
                  </div>
                  {change.type === 'update' ? (
                    <PropertyChangesList
                      changes={change.changes}
                      handleDeleteChange={handleDeleteChange}
                    />
                  ) : change.type === 'delete' ? (
                    <div>Delete</div>
                  ) : (
                    <div>Un Delete</div>
                  )}
                </div>
              ),
            }))}
          />
        )}
      </div>
      <Space.Compact>
        <Button
          color="cyan"
          icon={<Preview />}
          variant="outlined"
          onClick={handlePreview}
        >
          Preview
        </Button>
        {!readOnly && (
          <>
            <Button
              color="primary"
              variant="outlined"
              icon={<SaveOutlined />}
              onClick={
                isReviewMode && onCommitReview
                  ? onCommitReview
                  : handleSaveChanges
              }
              disabled={changes.length === 0}
            >
              {isSaving 
                ? 'Saving...' 
                : isReviewMode 
                  ? 'Commit Review' 
                  : 'Save Changes'}
            </Button>
            <Button
              icon={<ReloadOutlined />}
              danger
              onClick={resetAllChanges}
              disabled={changes.length === 0 || isSaving || isSubmitting}
            >
              {isReviewMode ? 'Abandon Review' : 'Reset All'}
            </Button>
            {!isReviewMode && (
              <Button
                style={{ width: 150 }}
                type="primary"
                onClick={submitChanges}
                block
                disabled={!isSaveChange || submitChanges === undefined}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Changes'}
              </Button>
            )}
          </>
        )}
      </Space.Compact>
    </div>
  );
};

export default ChangesSummary;
