import '@/style/contributeContent.scss';
import '@/style/newVoyages.scss';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  VoyageSchema,
  EntitySchema,
  materializeNew,
  MaterializedEntity,
  Contribution,
  ContributionStatus,
  getSchema,
} from '@dotproductdev/voyages-contribute';
import { AgGridReact } from 'ag-grid-react';
import { Button, Divider, Form, Input, Pagination, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { fetchContributionsDataByAuthor } from '@/fetch/contributeFetch/fetchContributionsData';
import { usePageRouter } from '@/hooks/usePageRouter';
import { useSearchEditRequestsFilters } from '@/hooks/useSearchEditRequestsFilters';
import { loadUserFromStorage } from '@/redux/getAuthUserSlice';
import { RootState } from '@/redux/store';

import { useColumnNewVoyagesDefs } from '../commons/useColumnDefs';
import { ContributionForm, ReviewMode } from '../ContributionForm';
import {
  TransformedContribution,
  transformContributionData,
} from '../utils/transformContributionData';

export interface EntityFormProps {
  schema: EntitySchema;
}

const tempNewVoyage = materializeNew(VoyageSchema, uuidv4());

export interface NewVoyageProps {
  entity?: MaterializedEntity;
}

const NewVoyage: React.FC = ({
  entity: _entity = tempNewVoyage,
}: NewVoyageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.getAuthUserSlice);
  const { contributePath } = usePageRouter();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const [form] = Form.useForm();
  const [contributions, setContributions] = useState<TransformedContribution[]>(
    [],
  );
  const gridRef = useRef<AgGridReact<TransformedContribution>>(null);
  const { newVoyagesFilters, buildNewVoyagesFilterQuery } =
    useSearchEditRequestsFilters(form, gridRef);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalResultsCount, setTotalResultsCount] = useState(0);

  // State for showing form vs table
  const [showForm, setShowForm] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<
    Contribution | TransformedContribution | undefined
  >(undefined);
  const [formEntity, setFormEntity] = useState<MaterializedEntity | undefined>(
    undefined,
  );
  const [formMode, setFormMode] = useState<ReviewMode>(ReviewMode.Create);

  // Load contribution by ID when id param exists
  useEffect(() => {
    if (id && user?.email && contributions.length > 0) {
      const contribution = contributions.find((c) => c.root?.id === id);

      if (contribution) {
        setSelectedContribution(contribution);
        setFormMode(ReviewMode.Edit);

        // Create entity from the contribution
        if (
          contribution.changeSet?.changes &&
          contribution.changeSet.changes.length > 0
        ) {
          const schema = contribution.changeSet.changes[0].entityRef.schema;
          const entityId = contribution.changeSet.changes[0].entityRef.id;
          const entity = materializeNew(getSchema(schema), entityId);
          setFormEntity(entity);
        } else {
          setFormEntity(tempNewVoyage);
        }

        setShowForm(true);
      }
    }
  }, [id, user?.email, contributions]);

  const handlePageChange = useCallback(
    (newPage: number, pageSize?: number) => {
      setPage(newPage);
      if (pageSize && pageSize !== rowsPerPage) {
        setRowsPerPage(pageSize);
      }
      gridRef.current?.api.paginationGoToPage(newPage - 1);
    },
    [rowsPerPage],
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: false,
      cellStyle: {
        paddingTop: '12px',
        fontSize: '13px',
      },
    }),
    [],
  );
  const columnDefs = useColumnNewVoyagesDefs();
  const getRowRowStyle = useCallback(
    () => ({
      fontSize: '0.8rem',
      fontWeight: 500,
      color: '#000',
      fontFamily: 'sans-serif',
    }),
    [],
  );

  // Fetch contributions data
  const fetchContributions = useCallback(async () => {
    const params = buildNewVoyagesFilterQuery();
    try {
      const response = await fetchContributionsDataByAuthor(
        params,
        user?.email,
      );
      const contributionsArray = response?.data || [];
      // Transform contributions (API already filters by author)
      const transformedContributions = contributionsArray.map(
        transformContributionData,
      );
      setContributions(transformedContributions);
      setTotalResultsCount(response?.total || transformedContributions.length);
    } catch (err) {
      console.error('Error fetching data:', err);
      message.error('Failed to fetch contributions');
    }
  }, [buildNewVoyagesFilterQuery, user?.email]);

  // Handle row click - load contribution
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowClick = useCallback(
    ({ data, event }: any) => {
      if (!event || !data) return;

      const target = event.target as HTMLElement;
      const cellElement = target.closest('.ag-cell');
      const colId = cellElement?.getAttribute('col-id');
      const disabledColumns = ['status', 'ag-Grid-SelectionColumn'];

      if (colId && disabledColumns.includes(colId)) {
        return;
      }

      // Set the selected contribution
      setSelectedContribution(data);
      setFormMode(ReviewMode.Edit);

      // Create entity from the contribution
      if (data.changeSet?.changes && data.changeSet.changes.length > 0) {
        const schema = data.changeSet.changes[0].entityRef.schema;
        const entityId = data.changeSet.changes[0].entityRef.id;
        const entity = materializeNew(getSchema(schema), entityId);
        setFormEntity(entity);
      } else {
        // Fallback to default entity
        setFormEntity(tempNewVoyage);
      }

      setShowForm(true);
      navigate(`/contribute/interim/new/${data?.root?.id}`);
    },
    [navigate],
  );

  // Handle new voyage button click
  const handleNewVoyageClick = useCallback(() => {
    const newEntity = materializeNew(VoyageSchema, uuidv4());
    const newContribution: Contribution = {
      id: '-1',
      root: newEntity.entityRef,
      changeSet: {
        id: uuidv4(),
        author: user?.email || '',
        title: '',
        comments: '',
        timestamp: Date.now(),
        changes: [],
      },
      status: ContributionStatus.WorkInProgress,
      reviews: [],
      media: [],
    };

    setFormEntity(newEntity);
    setSelectedContribution(newContribution);
    setFormMode(ReviewMode.Create);
    setShowForm(true);
  }, [user?.email]);

  // Handle back button click
  const handleBackClick = useCallback(() => {
    setShowForm(false);
    setSelectedContribution(undefined);
    setFormEntity(undefined);
    fetchContributions();
    navigate('/contribute/interim/new/', { replace: true });
  }, [fetchContributions, navigate]);

  // Handle contribution form change
  const handleContributionChange = useCallback(
    (contribution: Contribution | TransformedContribution) => {
      setSelectedContribution(contribution);

      // If contribution has been saved (has a valid ID and is not -1), refresh the table
      if (
        contribution?.id &&
        contribution.id !== '-1' &&
        formMode === ReviewMode.Create
      ) {
        // Small delay to ensure backend has processed
        setTimeout(() => {
          fetchContributions();
        }, 500);
      }
    },
    [fetchContributions, formMode],
  );

  // Fetch contributions on mount and when filters change
  useEffect(() => {
    if (user?.email && !showForm) {
      fetchContributions();
    }
  }, [
    newVoyagesFilters,
    buildNewVoyagesFilterQuery,
    user?.email,
    showForm,
    fetchContributions,
  ]);
  // Show form view
  if (showForm && formEntity && selectedContribution) {
    return (
      <>
        <div className="contribute-content" style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <Button onClick={handleBackClick} style={{ height: '32px' }}>
              ← Back to Table
            </Button>
          </div>
          <div style={{ marginTop: '5vh' }}>
            <Form layout="vertical" form={form}>
              <Form.Item
                name="voyageComments"
                label={<span className="lable-title">Voyage comments:</span>}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Form>
            <small className="comment-small">
              The comments above are meant for information related to the voyage
              which does not fit any of the existing fields. For comments meant
              to the reviewer/editor, please use the contributor&apos;s comments
              at the end of this form or any of the specific field comment
              boxes.
            </small>
          </div>

          <Divider style={{ margin: '12px 0' }} />
          <ContributionForm
            entity={formEntity}
            contribuition={selectedContribution}
            onChange={handleContributionChange}
            mode={formMode}
            contributionId={
              formMode === ReviewMode.Edit && selectedContribution?.id !== '-1'
                ? selectedContribution.id
                : undefined
            }
            currentStatus={
              formMode === ReviewMode.Edit
                ? selectedContribution?.status
                : ContributionStatus.WorkInProgress
            }
          />
        </div>
      </>
    );
  }

  // Show table view
  return (
    <div className="contribute-content">
      {contributePath === 'interim' && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h1 className="page-title-1" style={{ margin: 0 }}>
              New Voyage
            </h1>
            <Button
              type="primary"
              onClick={handleNewVoyageClick}
              className="new-voyage-button"
            >
              + New Voyage
            </Button>
          </div>
          <p>
            Variables are organized into eight categories. Complete as many
            boxes in each category as your source(s) allow. Comments or notes on
            any entry may be added by clicking on the comment icon to the right
            of each input box. Should you wish to add a port or region that does
            not appear in the drop-down menu, please let the editors know via
            the note box at the foot of the entry form. If required, use this
            box for any additional information. You can review your complete
            entry at any time by clicking on the &apos;Review&apos; button. To
            submit your entry you must move to the Review page first.
          </p>
        </>
      )}
      {contributions.length > 0 && (
        <>
          <div
            className="ag-theme-alpine compact-table"
            style={{
              height: 'calc(60vh - 280px)',
              width: 'calc(100vw - 120px)',
              border: '1px solid #d9d9d9',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <AgGridReact<TransformedContribution>
              theme="legacy"
              ref={gridRef}
              rowData={contributions}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              getRowStyle={getRowRowStyle}
              enableBrowserTooltips={true}
              paginationPageSize={rowsPerPage}
              onRowClicked={handleRowClick}
              pagination={true}
              suppressPaginationPanel={true}
              getRowClass={(params) =>
                params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
              }
              headerHeight={36}
              suppressHorizontalScroll={false}
            />
          </div>
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Pagination
              current={page}
              total={totalResultsCount}
              pageSize={rowsPerPage}
              showSizeChanger
              showTotal={(total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} contributions`
              }
              pageSizeOptions={['5', '10', '20', '50', '100']}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
              style={{ margin: 0 }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NewVoyage;
