import { useState, useCallback } from 'react';

import {
  DirectPropertyChange,
  MaterializedEntity,
  TextProperty,
  NumberProperty,
  BoolProperty,
  PropertyValue,
  VoyageSourceSchema,
} from '@dotproductdev/voyages-contribute';
import { Checkbox } from '@mui/material';
import { Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { EntityFormProps } from './EntityForm';
import { EntityPropertyChangeCommentBox } from './EntityPropertyChangeCommentBox';

export interface DirectEntityPropertyFieldProps {
  property: TextProperty | NumberProperty | BoolProperty;
  entity: MaterializedEntity;
  lastChange?: DirectPropertyChange;
  onChange: EntityFormProps['onChange'];
}

export const lowerCaseFirstLetter = (s: string) =>
  s.length > 0 ? s[0].toLocaleLowerCase() + s.slice(1) : s;

const htmlProps = [
  VoyageSourceSchema.properties.find(
    (p) => p.kind === 'text' && p.backingField === 'bib',
  ),
];

export const DirectEntityPropertyField = ({
  property,
  entity,
  lastChange,
  onChange,
}: DirectEntityPropertyFieldProps) => {
  const { kind, label } = property;
  const [comments, internalSetComments] = useState<string | undefined>();
  const value = lastChange
    ? lastChange.changed
    : (entity.data[label] as DirectPropertyChange['changed']);

  const handleChange = useCallback(
    (changed: DirectPropertyChange['changed']) => {
      if (
        changed === (lastChange?.changed ?? value) &&
        comments === lastChange?.comments
      ) {
        return;
      }
      onChange({
        type: 'update',
        entityRef: entity.entityRef,
        changes: [
          {
            kind: 'direct',
            property: property.uid,
            changed,
            original: (entity.data[label] as PropertyValue) ?? undefined,
            comments,
          },
        ],
      });
    },
    [
      lastChange?.changed,
      lastChange?.comments,
      value,
      comments,
      onChange,
      entity.entityRef,
      entity.data,
      property.uid,
      label,
    ],
  );
  const setComments = useCallback(
    (c: string) => {
      internalSetComments(c);
      handleChange(value);
    },
    [handleChange, value],
  );

  const handleInputChange = useCallback(
    (localValue: string | number) => {
      if (kind === 'number' && typeof localValue === 'string') {
        localValue = parseFloat(localValue);
      }
      handleChange(localValue);
    },
    [handleChange, kind],
  );
  if (
    value !== null &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  ) {
    return (
      <span>BUG: Value type is incorrect for DirectEntityPropertyField</span>
    );
  }

  return (
    <>
      {kind === 'bool' ? (
        <Checkbox
          value={value}
          onChange={(e) => handleChange(e.target.checked)}
        />
      ) : htmlProps.includes(property) ? (
        <ReactQuill
          style={{ width: 'calc(100% - 20px)' }}
          value={String(value ?? '')}
          onChange={(v) => handleInputChange(v)}
        />
      ) : (
        <Input
          className={`truncate-input ${lastChange ? 'changedEntityProperty' : ''}`}
          type={kind}
          placeholder={`Enter ${lowerCaseFirstLetter(label)}`}
          style={{ width: 'calc(100% - 20px)' }}
          value={value === null ? '' : value + ''}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
      <EntityPropertyChangeCommentBox
        property={property}
        current={lastChange?.comments}
        onComment={setComments}
      />
    </>
  );
};
