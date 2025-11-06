/* eslint-disable indent */
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  LinkedEntitySelectionChange,
  isMaterializedEntity,
  MaterializedEntity,
  EntityLinkEditMode,
  LinkedEntityProperty,
  getSchema,
  cloneEntity,
  applyUpdate,
} from '@dotproductdev/voyages-contribute';
import { Alert, Select, Spin, Tooltip } from 'antd';

import { useDebounce } from '@/hooks/useDebounce';
import { useSchemaEnumeration } from '@/hooks/useEnumeration';
import { useTreeSelectContributeLocation } from '@/hooks/useTreeSelectContributeLocation';

import TreeSelectedEntity, {
  TreeSelectedEntityProps,
} from './commonContribute/TreeSelectedEntity';
import { lowerCaseFirstLetter } from './DirectEntityPropertyField';
import { EntityFormProps } from './EntityForm';
import { EntityPropertyChangeCommentBox } from './EntityPropertyChangeCommentBox';
import LinkedEntityAddNewDialogComponent from './LinkedEntityAddNewDialogComponent';
import { LinkedEntityOwnedPropertyComponent } from './LinkedEntityOwnedPropertyComponent';

import '@/style/contributeContent.scss';

export interface LinkedEntityPropertyComponentProps {
  property: LinkedEntityProperty;
  entity: MaterializedEntity;
  lastChange?: LinkedEntitySelectionChange;
  onChange: EntityFormProps['onChange'];
  readOnly?: boolean;
}

// Utility to strip HTML tags and decode entities
const stripHtmlTags = (html: string): string => {
  if (!html) return 'N/A';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || 'N/A';
};

const LinkedLocationComponent = (
  props: Omit<TreeSelectedEntityProps, 'locationsList'>,
) => {
  const { locationsList, loading, error } = useTreeSelectContributeLocation({
    expirationSeconds: 300,
  });
  if (loading) {
    return (
      <Spin spinning={true} tip="Loading location tree...">
        <div style={{ minHeight: 60 }} />
      </Spin>
    );
  }

  if (error) {
    return <Alert type="error" message="Failed to load location data." />;
  }

  return <TreeSelectedEntity {...props} locationsList={locationsList} />;
};

export const LinkedEntityPropertyComponent = (
  props: LinkedEntityPropertyComponentProps & EntityFormProps,
) => {
  const { property, entity, lastChange, onChange, readOnly = false } = props;
  const [comments, setComments] = useState<string | undefined>();
  const { uid, mode, label, linkedEntitySchema } = property;

  // Call all hooks before any conditional returns (Rules of Hooks)
  const linkedSchema = getSchema(linkedEntitySchema);
  const { items: optionItems } = useSchemaEnumeration(linkedEntitySchema);
  const debouncedLastChange = useDebounce(lastChange, 800);

  const value = lastChange
    ? lastChange.changed
    : (entity.data[label] as MaterializedEntity | null);

  const options = useMemo(() => {
    const res = optionItems.map((entity) => {
      const labelText = linkedSchema.getLabel(entity.data, true);
      const cleanText = stripHtmlTags(labelText);
      return {
        label: labelText,
        value: entity.entityRef.id,
        entity,
        searchText: cleanText,
      };
    });

    // Handle new entities from debounced changes
    if (debouncedLastChange?.changed?.entityRef?.type === 'new') {
      const updatedLinkedEntity = debouncedLastChange.linkedChanges
        ? applyUpdate(
            cloneEntity(debouncedLastChange.changed),
            debouncedLastChange.linkedChanges,
          )
        : debouncedLastChange.changed;

      const newLabelText = linkedSchema.getLabel(
        updatedLinkedEntity.data,
        true,
      );

      res.push({
        label: newLabelText,
        value: debouncedLastChange.changed.entityRef.id,
        entity: updatedLinkedEntity,
        searchText: stripHtmlTags(newLabelText),
      });
    }

    return res;
  }, [optionItems, linkedSchema, debouncedLastChange]);

  const handleChange = useCallback(
    (item: string | number | null) => {
      if (item == null) return;

      const currentId = (lastChange?.changed ?? value)?.entityRef.id ?? null;
      if (item === currentId && comments === lastChange?.comments) {
        return;
      }

      const matchedOption = options.find(
        (x) => String(x.value) === String(item),
      );

      if (!matchedOption) {
        console.warn('No matching option found for item:', item);
        return;
      }

      onChange({
        type: 'update',
        entityRef: entity.entityRef,
        changes: [
          {
            kind: 'linked',
            property: uid,
            comments,
            changed: {
              entityRef: {
                id: item,
                schema: linkedEntitySchema,
                type: 'existing',
              },
              data: matchedOption.entity.data,
              state: 'lazy',
            },
          },
        ],
      });
    },
    [
      onChange,
      entity,
      comments,
      lastChange,
      value,
      options,
      uid,
      linkedEntitySchema,
    ],
  );

  // Trigger a change if the comments have been updated.
  useEffect(() => {
    handleChange(value?.entityRef.id ?? null);
  }, [handleChange, value, comments]);

  const styledOptions = useMemo(
    () =>
      options.map((opt) => ({
        ...opt,
        label: (
          <Tooltip
            title={<span dangerouslySetInnerHTML={{ __html: opt.label }} />}
          >
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '400px',
              }}
              dangerouslySetInnerHTML={{ __html: opt.label }}
            />
          </Tooltip>
        ),
        searchText: opt.searchText,
      })),
    [options],
  );

  // Early returns after all hooks have been called
  if (value && !isMaterializedEntity(value)) {
    return <span>BUG: Expected an entity reference value!</span>;
  }

  if (mode === EntityLinkEditMode.View) {
    return <span>{value?.entityRef.id ?? 'null'}</span>;
  }

  if (mode === EntityLinkEditMode.Own) {
    return <LinkedEntityOwnedPropertyComponent {...props} />;
  }

  let displaySelected;

  if (property.linkedEntitySchema === 'Location') {
    displaySelected = (
      <LinkedLocationComponent
        handleChange={handleChange}
        value={value}
        label={label}
        options={options}
        lastChange={lastChange}
      />
    );
  } else {
    displaySelected = (
      <Select
        className={`truncate-select ${lastChange ? 'changedEntityProperty' : ''}`}
        value={value?.entityRef.id}
        placeholder={readOnly ? '' : `Select ${lowerCaseFirstLetter(label)}`}
        style={{ width: 'calc(100% - 20px)' }}
        options={styledOptions}
        onChange={readOnly ? undefined : handleChange}
        showSearch={!readOnly}
        disabled={readOnly}
        popupMatchSelectWidth={false}
        styles={{
          popup: {
            root: { maxHeight: 400, overflow: 'auto', zIndex: 9999 },
          },
        }}
        optionLabelProp="label"
        filterOption={
          readOnly
            ? undefined
            : (input: string, option: any) =>
                (option?.searchText ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
        }
      />
    );
  }

  return (
    <>
      {displaySelected}
      {mode === EntityLinkEditMode.Create && !readOnly && (
        <LinkedEntityAddNewDialogComponent {...props} comments={comments} />
      )}
      <EntityPropertyChangeCommentBox
        property={property}
        current={lastChange?.comments}
        onComment={readOnly ? () => {} : setComments}
        readOnly={readOnly}
      />
    </>
  );
};
