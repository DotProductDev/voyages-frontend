/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/style/contributeContent.scss';
import '@/style/newVoyages.scss';
import { useEffect, useState } from 'react';

import {
  Contribution,
  ContributionStatus,
} from '@dotproductdev/voyages-contribute';
import { Form, Input, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LOADINGLOGO from '@/assets/sv-logo_v2_notext.svg';
import { fetchSubmitEditVoaygesForm } from '@/fetch/contributeFetch/fetchSubmitEditVoaygesForm';
import { useVoyageContribution } from '@/hooks/useVoyageContribution';
import { loadUserFromStorage } from '@/redux/getAuthUserSlice';
import { RootState } from '@/redux/store';
import {
  checkVoyageConflict,
  getConflictErrorMessage,
} from '@/utils/functions/voyageValidation';

import { VoyageFormWrapper } from '../commons/VoyageFormWrapper';
import { ContributionSectionStyle, ReviewMode } from '../ContributionForm';

interface EditExistingVoyageProps {
  openSideBar: boolean;
}

const EditExistingVoyage: React.FC<EditExistingVoyageProps> = ({
  openSideBar,
}) => {
  const [formId] = Form.useForm();
  const dispatch = useDispatch();
  const { id: ID } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.getAuthUserSlice);
  const [loading, setLoading] = useState(false);
  const [contributionId, setContributionId] = useState<string | undefined>('');
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  // Use shared hook for contribution state management
  const {
    selectedContribution,
    formEntity,
    updateContribution,
    setContributionWithEntity,
    resetContribution,
  } = useVoyageContribution();

  // Handle back button click to return to search
  const handleBack = () => {
    resetContribution();
    formId.resetFields();
    setLoading(false);
  };

  const handleSubmit = async (values: any): Promise<void> => {
    const voyageId = values.voyageId;
    if (!voyageId) {
      Modal.error({
        title: 'Voyage ID Required',
        content: 'Please enter a voyage ID to continue.',
      });
      return;
    }

    setLoading(true);

    try {
      // Use shared validation utility to check for conflicts
      const conflictResult = await checkVoyageConflict(
        voyageId,
        user?.email || '',
        'existing',
      );

      if (conflictResult.hasConflict) {
        Modal.error({
          title: 'Voyage Already Submitted',
          content: getConflictErrorMessage(conflictResult.conflictType!),
        });
        setLoading(false);
        return;
      }

      // Proceed with fetching the existing voyage
      const res = await fetchSubmitEditVoaygesForm(voyageId);

      if (res.status === 200) {
        // The API returns a MaterializedEntity with the existing voyage data
        const materializedEntity = res.data;
        const entityRef = materializedEntity?.entityRef;

        if (!entityRef) {
          Modal.error({
            title: 'Invalid Data',
            content: 'The voyage data received is invalid. Please try again.',
          });
          setLoading(false);
          return;
        }

        const updateID = `${entityRef.schema}.${entityRef.schema}.${entityRef.id}`;
        setContributionId(updateID);

        // Create a contribution using the fresh entity data from the API
        // The entity contains all the current voyage data
        // The contribution will track changes made by the user
        const existingContribution: Contribution = {
          id: updateID,
          root: {
            type: 'existing', // This is an existing voyage in the database
            schema: entityRef.schema,
            id: String(entityRef.id),
          },
          changeSet: {
            id: ID!,
            author: user?.email || '',
            title: `Edit voyage ${voyageId}`,
            changes: [], // Start with empty changes - user will make edits
            comments: '',
            timestamp: new Date().getTime(),
          },
          status: ContributionStatus.WorkInProgress,
          reviews: [],
          media: [],
        };

        // Pass the materialized entity (with all existing voyage data) and the contribution
        // - The entity will be displayed in EntityForm (shows all current data)
        // - The empty changeSet will track new edits in ChangesSummary
        setContributionWithEntity(existingContribution, materializedEntity);
        setLoading(false);
      } else {
        Modal.error({
          title: 'Voyage Not Found',
          content: `Voyage ID ${voyageId} was not found in the database. Please verify the ID and try again.`,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error validating or fetching voyage:', error);
      Modal.error({
        title: 'Error',
        content:
          'An error occurred while processing your request. Please try again.',
      });
      setLoading(false);
    }
  };

  const hasEntity = formEntity && formEntity?.entityRef?.id !== 0;
  return (
    <div
      className="contribute-content"
      style={{
        ...ContributionSectionStyle,
        width: openSideBar ? '75vw' : '90vw',
        scrollSnapType: 'y mandatory',
        overflowY: 'auto',
      }}
    >
      <div style={{ ...ContributionSectionStyle, height: undefined }}>
        {!hasEntity && (
          <>
            <h1 className="page-title-1">
              Edit an Existing Record of a Voyage
            </h1>
            <div className="content-inner-wrapper">
              <p className="description-text">
                Please select the voyage you wish to edit.
              </p>
              <Form layout="vertical" form={formId} onFinish={handleSubmit}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    marginBottom: 10,
                    width: 320,
                  }}
                >
                  <Form.Item
                    style={{ flex: 1, marginBottom: 0 }}
                    name="voyageId"
                  >
                    <Input placeholder="Enter Voyage ID" type="number" />
                  </Form.Item>
                  <Button
                    type="primary"
                    ghost
                    style={{
                      marginLeft: 10,
                      height: 32,
                      borderColor: 'rgb(55, 148, 141)',
                      color: 'rgb(55, 148, 141)',
                    }}
                    onClick={() => formId.submit()}
                  >
                    Search
                  </Button>
                </div>
              </Form>
            </div>
          </>
        )}
        {!hasEntity && (
          <div
            style={{
              height: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: '1px dashed #ccc',
              borderRadius: '8px',
              marginTop: '20px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {loading ? (
              <div className="loading-logo">
                <img src={LOADINGLOGO} alt="loading" style={{ width: '50%' }} />
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#999',
                    marginBottom: '10px',
                  }}
                >
                  ✏️
                </div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                  Please enter a Voyage ID and click <strong>Search</strong> to
                  start editing.
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {hasEntity && selectedContribution && (
        <VoyageFormWrapper
          title="Edit an Existing Record of a Voyage"
          showBackButton={true}
          onBack={handleBack}
          backButtonText="← Back to Search"
          entity={formEntity}
          contribution={selectedContribution}
          onChange={updateContribution}
          mode={ReviewMode.Edit}
          contributionId={contributionId}
        />
      )}
    </div>
  );
};

export default EditExistingVoyage;
