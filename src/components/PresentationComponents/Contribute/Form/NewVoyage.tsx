import '@/style/contributeContent.scss';
import '@/style/newVoyages.scss';
import React, { useEffect, useState } from 'react';

import {
  VoyageSchema,
  EntitySchema,
  materializeNew,
  MaterializedEntity,
  Contribution,
} from '@dotproductdev/voyages-contribute';
import { Divider, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { loadUserFromStorage } from '@/redux/getAuthUserSlice';
import { RootState } from '@/redux/store';

import { ContributionForm, ReviewMode } from '../ContributionForm';

export interface EntityFormProps {
  schema: EntitySchema;
}

const tempNewVoyage = materializeNew(VoyageSchema, uuidv4());

export interface NewVoyageProps {
  entity?: MaterializedEntity;
}

const NewVoyage: React.FC = ({ entity = tempNewVoyage }: NewVoyageProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.getAuthUserSlice);
  const { email, name, username } = user;

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const [form] = Form.useForm();

  const [contribuition, setContribuition] = useState<Contribution>({
    id: '-1',
    root: {
      type: 'new',
      schema: '',
      id: '-1',
    },
    changeSet: {
      // will change pass contribuition
      id: uuidv4(),
      author: username || email || name,
      title: 'Mocked new voyage',
      changes: [],
      comments: '',
      timestamp: new Date().getTime(),
    },
    status: 0,
    reviews: [],
    media: [],
  });

  return (
    <div className="contribute-content">
      <h1 className="page-title-1">New Voyage</h1>
      <p>
        Variables are organized into eight categories. Complete as many boxes in
        each category as your source(s) allow. Comments or notes on any entry
        may be added by clicking on the comment icon to the right of each input
        box. Should you wish to add a port or region that does not appear in the
        drop-down menu, please let the editors know via the note box at the foot
        of the entry form. If required, use this box for any additional
        information. You can review your complete entry at any time by clicking
        on the &apos;Review&apos; button. To submit your entry you must move to
        the Review page first.
      </p>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="voyageComments"
          label={<span className="lable-title">Voyage comments:</span>}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
      <small className="comment-small">
        The comments above are meant for information related to the voyage which
        does not fit any of the existing fields. For comments meant to the
        reviewer/editor, please use the contributor&apos;s comments at the end
        of this form or any of the specific field comment boxes.
      </small>
      <Divider style={{ margin: '12px 0' }} />
      <ContributionForm
        entity={entity}
        contribuition={contribuition}
        onChange={setContribuition}
        mode={ReviewMode.Create}
      />
    </div>
  );
};

export default NewVoyage;
