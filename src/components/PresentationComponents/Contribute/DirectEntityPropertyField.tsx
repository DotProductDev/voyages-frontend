import {
  DirectPropertyChange,
  MaterializedEntity,
  TextProperty,
  NumberProperty,
  BoolProperty,
  PropertyValue,
} from '@dotproductdev/voyages-contribute';
import { Input } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { EntityFormProps } from './EntityForm';
import { EntityPropertyChangeCommentBox } from './EntityPropertyChangeCommentBox';
import { Checkbox } from '@mui/material';

export interface DirectEntityPropertyFieldProps {
  property: TextProperty | NumberProperty | BoolProperty;
  entity: MaterializedEntity;
  lastChange?: DirectPropertyChange;
  onChange: EntityFormProps['onChange'];
}

export const lowerCaseFirstLetter = (s: string) =>
  s.length > 0 ? s[0].toLocaleLowerCase() + s.slice(1) : s;

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
            original: entity.data[label] as PropertyValue ?? undefined,
            comments,
          },
        ],
      });
    },
    [onChange, entity, property, lastChange, value, comments],
  );
  const setComments = useCallback(
    (c: string) => {
      setComments(c);
      handleChange(value);
    },
    [handleChange, value],
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
      ) : (
        <Input
          className={`truncate-input ${lastChange ? 'changedEntityProperty' : ''}`}
          type={kind}
          placeholder={`Enter ${lowerCaseFirstLetter(label)}`}
          style={{ width: 'calc(100% - 20px)' }}
          value={value + ''}
          onChange={(e: any) => {
            handleChange(e.target.value);
          }}
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
