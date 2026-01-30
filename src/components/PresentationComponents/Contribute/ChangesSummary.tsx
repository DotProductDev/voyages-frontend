import { useMemo } from 'react';

import {
  ReloadOutlined,
  SaveOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  Contribution,
  EntityChange,
  MaterializedEntity,
} from '@dotproductdev/voyages-contribute';
import { Preview } from '@mui/icons-material';
import { Button, Typography, Timeline, Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import '@/style/contributeContent.scss';

import { ReviewMode } from './ContributionForm';
import PropertyChangesList from './PropertyChangesList';

const { Text } = Typography;

const iconMap = {
  update: <EditOutlined style={{ color: '#1890ff' }} />,
  undelete: <PlusOutlined style={{ color: '#52c41a' }} />,
  delete: <DeleteOutlined style={{ color: '#f5222d' }} />,
};

// Reusable inner component for displaying changes timeline
interface ChangesTimelineProps {
  changes: EntityChange[];
  handleDeleteChange?: (propertyToDelete: string) => void;
  readOnly?: boolean;
  emptyMessage?: string;
}

const ChangesTimeline = ({
  changes,
  handleDeleteChange,
  readOnly = false,
  emptyMessage = 'No changes in this version',
}: ChangesTimelineProps) => {
  // No-op function for read-only mode
  const noOpDelete = () => {};

  if (changes.length === 0) {
    return (
      <Text type="secondary" italic>
        {emptyMessage}
      </Text>
    );
  }

  return (
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
                handleDeleteChange={readOnly ? noOpDelete : (handleDeleteChange ?? noOpDelete)}
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
  );
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
  isSaveChange?: boolean;
  isSaving?: boolean;
  isSubmitting?: boolean;
  mode?: ReviewMode;
  // New props for stacked review system
  contribution?: Contribution;
  currentReviewChanges?: EntityChange[];
  originalChanges?: EntityChange[];
}

const ChangesSummary = ({
  changes,
  mode,
  resetAllChanges,
  handlePreview,
  submitChanges,
  handleSaveChanges,
  handleDeleteChange,
  isReviewMode = false,
  onCommitReview,
  readOnly = false,
  isSaveChange = false,
  isSaving = false,
  isSubmitting = false,
  contribution,
  currentReviewChanges = [],
  originalChanges = [],
}: ChangesSummaryProps) => {
  const isDisableSubmitChange =
    (isSaveChange && mode === ReviewMode.Create) || mode === ReviewMode.Edit;

  // Build tab items for stacked review view
  const tabItems: TabsProps['items'] = useMemo(() => {
    // For Create mode or when no contribution, show simple single-tab view
    // Show stacked tabs when:
    // 1. In review mode, OR
    // 2. In ReadOnly/Edit mode, OR
    // 3. There are committed reviews to display
    const hasCommittedReviews = contribution?.reviews && contribution.reviews.length > 0;
    const shouldShowStackedTabs =
      contribution &&
      (isReviewMode || hasCommittedReviews || mode === ReviewMode.ReadOnly || mode === ReviewMode.Edit);

    if (!shouldShowStackedTabs) {
      return [
        {
          key: 'changes',
          label: `Changes (${changes.length})`,
          children: (
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 50px)' }}>
              <ChangesTimeline
                changes={changes}
                handleDeleteChange={handleDeleteChange}
                readOnly={readOnly}
                emptyMessage="No changes have been made yet"
              />
            </div>
          ),
        },
      ];
    }

    const items: TabsProps['items'] = [];

    // Tab 1: Contribution changes (Read-Only)
    // Use the originalChanges prop which preserves the initial state
    const contributorName = contribution.changeSet?.author || 'Unknown';
    items.push({
      key: 'contribution',
      label: 'Contribution',
      children: (
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 50px)' }}>
          <div
            style={{
              padding: '8px 12px',
              marginBottom: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              borderLeft: '3px solid rgb(55, 148, 141)',
            }}
          >
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Contributor:
            </Text>{' '}
            <Text strong style={{ fontSize: '12px' }}>
              {contributorName}
            </Text>
          </div>
          <ChangesTimeline
            changes={originalChanges}
            readOnly={true}
            emptyMessage="No changes in this contribution"
          />
        </div>
      ),
    });

    // Review Tabs: Map through contribution.reviews (Read-Only)
    if (contribution.reviews && contribution.reviews.length > 0) {
      contribution.reviews.forEach((review, index) => {
        const reviewChanges = review.changeSet?.changes || [];
        const reviewerName = review.changeSet?.author || 'Unknown';
        items.push({
          key: `review-${index}`,
          label: `Review V${index + 1}`,
          children: (
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 50px)' }}>
              <div
                style={{
                  padding: '8px 12px',
                  marginBottom: '8px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  borderLeft: '3px solid #1890ff',
                }}
              >
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Reviewer:
                </Text>{' '}
                <Text strong style={{ fontSize: '12px' }}>
                  {reviewerName}
                </Text>
              </div>
              <ChangesTimeline
                changes={reviewChanges}
                readOnly={true}
                emptyMessage={`No changes in Review V${index + 1}`}
              />
            </div>
          ),
        });
      });
    }

    // Active Tab: Current Review (Editable) - Only show if in review mode
    if (isReviewMode) {
      items.push({
        key: 'current-review',
        label: 'Current Review',
        children: (
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 50px)' }}>
            <div
              style={{
                padding: '8px 12px',
                marginBottom: '8px',
                backgroundColor: '#e6f7ff',
                borderRadius: '4px',
                borderLeft: '3px solid #1890ff',
              }}
            >
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Reviewer:
              </Text>{' '}
              <Text strong style={{ fontSize: '12px', color: '#1890ff' }}>
                You (In Progress)
              </Text>
            </div>
            <ChangesTimeline
              changes={currentReviewChanges}
              handleDeleteChange={handleDeleteChange}
              readOnly={false}
              emptyMessage="No changes in current review yet"
            />
          </div>
        ),
      });
    }

    return items;
  }, [
    contribution,
    changes,
    currentReviewChanges,
    originalChanges,
    isReviewMode,
    mode,
    readOnly,
    handleDeleteChange,
  ]);

  // Determine default active tab
  const defaultActiveKey = useMemo(() => {
    // For Create mode, always show the simple changes tab
    if (mode === ReviewMode.Create) {
      return 'changes';
    }
    if (isReviewMode && contribution) {
      return 'current-review';
    }
    // If there are committed reviews, show the latest review tab
    if (contribution?.reviews && contribution.reviews.length > 0) {
      return `review-${contribution.reviews.length - 1}`;
    }
    if (contribution && (mode === ReviewMode.ReadOnly || mode === ReviewMode.Edit)) {
      return 'contribution';
    }
    return 'changes';
  }, [isReviewMode, contribution, mode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <Tabs
          defaultActiveKey={defaultActiveKey}
          items={tabItems}
          size="small"
          type="card"
          style={{ height: '100%' }}
          tabBarStyle={{ marginBottom: 8 }}
        />
      </div>
      <Space.Compact style={{ flexShrink: 0, paddingTop: 8 }}>
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
              disabled={
                isReviewMode
                  ? currentReviewChanges.length === 0
                  : changes.length === 0
              }
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
              disabled={
                (isReviewMode
                  ? currentReviewChanges.length === 0
                  : changes.length === 0) ||
                isSaving ||
                isSubmitting
              }
            >
              {isReviewMode ? 'Abandon Review' : 'Reset All'}
            </Button>
            {!isReviewMode && (
              <Button
                style={{ width: 150 }}
                type="primary"
                onClick={submitChanges}
                block
                disabled={!isDisableSubmitChange}
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
