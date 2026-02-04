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
  readOnly?: boolean;
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
  readOnly = false,
}: DirectEntityPropertyFieldProps) => {
  const { kind, label } = property;
  const [comments, internalSetComments] = useState<string | undefined>();

  let value = lastChange
    ? lastChange.changed
    : ((entity.data[label] ?? null) as DirectPropertyChange['changed']);

  // Type safety: ensure numeric fields don't receive string UUIDs or invalid values
  if (kind === 'number' && typeof value === 'string') {
    const parsed = parseFloat(value);

    value = isNaN(parsed) ? null : parsed;
  }

  const handleChange = useCallback(
    (changed: DirectPropertyChange['changed']) => {
      // Skip if nothing changed
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
      let processedValue = localValue;

      if (kind === 'number' && typeof localValue === 'string') {
        processedValue = parseFloat(localValue);
        // Handle NaN case
        if (isNaN(processedValue)) {
          return;
        }
      }

      handleChange(processedValue);
    },
    [handleChange, kind],
  );

  // Type guard for value
  if (
    value !== null &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  ) {
    return (
      <span style={{ color: 'red' }}>
        Error: Invalid value type for this field
      </span>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
      }}
    >
      {kind === 'bool' ? (
        <Checkbox
          checked={Boolean(value)}
          onChange={
            readOnly ? undefined : (e) => handleChange(e.target.checked)
          }
          disabled={readOnly}
        />
      ) : htmlProps.includes(property) ? (
        <ReactQuill
          style={{ width: 'calc(100% - 20px)' }}
          value={String(value ?? '')}
          onChange={readOnly ? undefined : (v) => handleInputChange(v)}
          readOnly={readOnly}
          theme="snow"
        />
      ) : (
        <Input
          className={`truncate-input ${lastChange ? 'changedEntityProperty' : ''}`}
          type={kind === 'number' ? 'number' : 'text'}
          style={{ width: 'calc(100% - 20px)' }}
          placeholder={readOnly ? '' : `Enter ${lowerCaseFirstLetter(label)}`}
          value={
            value === null || value === undefined
              ? ''
              : kind === 'number' && typeof value === 'number'
                ? value
                : String(value)
          }
          onChange={
            readOnly ? undefined : (e) => handleInputChange(e.target.value)
          }
          readOnly={readOnly}
        />
      )}
      <EntityPropertyChangeCommentBox
        property={property}
        current={lastChange?.comments}
        onComment={readOnly ? () => {} : setComments}
        readOnly={readOnly}
      />
    </div>
  );
};
