/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/style/contributeContent.scss';
import '@/style/newVoyages.scss';
import { useState } from 'react';

import {
  Contribution,
  ContributionStatus,
  MaterializedEntity,
} from '@dotproductdev/voyages-contribute';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

import LOADINGLOGO from '@/assets/sv-logo_v2_notext.svg';
import { fetchSubmitEditVoaygesForm } from '@/fetch/contributeFetch/fetchSubmitEditVoaygesForm';
import { RootState } from '@/redux/store';

import {
  ContributionForm,
  ContributionSectionStyle,
  ReviewMode,
} from '../ContributionForm';
import { TransformedContribution } from '../utils/transformContributionData';

const initialExistingVoyageEntity: MaterializedEntity = {
  entityRef: {
    type: 'existing',
    schema: 'Voyage',
    id: 0,
  },
  data: {},
  state: 'original',
};

interface EditExistingVoyageProps {
  openSideBar: boolean;
}
const EditExistingVoyage: React.FC<EditExistingVoyageProps> = ({
  openSideBar,
}) => {
  const [formId] = Form.useForm();
  const { user } = useSelector((state: RootState) => state.getAuthUserSlice);
  const [formEntity, setFormEntity] = useState<MaterializedEntity | undefined>(
    initialExistingVoyageEntity,
  );
  const [loading, setLoading] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<
    Contribution | TransformedContribution | undefined
  >(undefined);

  const handleSubmit = async (values: any): Promise<void> => {
    const voyageId = values.voyageId;

    if (voyageId) {
      setLoading(true);
      const res = await fetchSubmitEditVoaygesForm(voyageId);

      const existingContribution: Contribution = {
        id: '-1',
        root: {
          type: 'new',
          schema: '',
          id: '-1',
        },
        changeSet: {
          id: '-1',
          author: user?.email || '',
          title: `Edit voyage ${voyageId}`,
          changes: [],
          comments: '',
          timestamp: new Date().getTime(),
        },
        status: ContributionStatus.WorkInProgress,
        reviews: [],
        media: [],
      };

      if (res.status === 200) {
        setFormEntity(res.data);
        setSelectedContribution(existingContribution);
        setLoading(true);
      } else {
        alert(`Voyage not found/error on api`);
        setLoading(true);
      }
    } else {
      alert(`Please enter a voyage ID`);
      setLoading(true);
    }
  };

  const hasEntity = formEntity && formEntity.entityRef.id !== 0;

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
                    rules={[
                      { required: true, message: 'Please input Voyage ID!' },
                    ]}
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
        <ContributionForm
          title="Edit an Existing Record of a Voyage"
          entity={formEntity}
          contribuition={selectedContribution}
          onChange={setSelectedContribution}
          mode={ReviewMode.Edit}
        />
      )}
    </div>
  );
};

export default EditExistingVoyage;
