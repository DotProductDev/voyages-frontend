import { useCallback, useMemo, useState } from 'react';

import {
  MaterializedEntity,
  isMaterializedEntity,
  getSchema,
  isUpdateEntityChange,
  areMatch,
  Property,
  EntityUpdate,
  EntityChange,
  OwnedEntityChange,
  EntityOwnedProperty,
  materializeNew,
} from '@dotproductdev/voyages-contribute';
import { Button } from '@mui/material';

import { DirectEntityPropertyField } from './DirectEntityPropertyField';
import { EntityFormProps, EntityForm } from './EntityForm';
import { EntityTableView } from './EntityTableView';
import { LinkedEntityPropertyComponent } from './LinkedEntityPropertyComponent';
import NumbersTableDialog from './NumbersTableDialog';

export interface EntityPropertyComponentProps<TProperty = Property>
  extends EntityFormProps {
  property: TProperty;
  entity: MaterializedEntity;
}

const EntityOwnedForm = ({
  parent,
  entity,
  property,
  onChange,
  lastChange,
  ...other
}: EntityPropertyComponentProps<EntityOwnedProperty> & {
  parent: MaterializedEntity;
  lastChange?: OwnedEntityChange;
}) => {
  const changes: EntityChange[] = useMemo(
    () =>
      lastChange
        ? [
            {
              entityRef: lastChange.ownedEntity.entityRef,
              type: 'update',
              changes: lastChange.changes,
            },
          ]
        : [],
    [lastChange],
  );
  const handleChange = useCallback(
    (c: EntityChange) => {
      if (c.type === 'update') {
        onChange({
          type: 'update',
          entityRef: parent.entityRef,
          changes: [
            {
              property: property.uid,
              kind: 'owned',
              ownedEntity: entity,
              changes: c.changes,
            },
          ],
        });
      }
    },
    [entity, property.uid, parent.entityRef, onChange],
  );
  return (
    <EntityForm
      key={entity.entityRef.id}
      {...other}
      changes={changes}
      onChange={handleChange}
      schema={getSchema(property.linkedEntitySchema)}
      entity={entity}
    />
  );
};

export const EntityPropertyComponent = ({
  property,
  entity,
  ...other
}: EntityPropertyComponentProps) => {
  const { uid, kind } = property;

  const localChanges = other.changes.find(
    (ec) =>
      isUpdateEntityChange(ec) && areMatch(ec.entityRef, entity.entityRef),
  ) as EntityUpdate | undefined;

  const lastChange = localChanges?.changes.find((c) => c.property === uid);
  const [isOpenNumbersTableDialog, setOpenNumbersTableDialog] = useState(false);

  const handleOnCloseNumbersTableDialog = () =>
    setOpenNumbersTableDialog(false);

  const handleCreateNew = useCallback((p: EntityOwnedProperty) => {
    const created = materializeNew(
      getSchema(p.linkedEntitySchema),
      crypto.randomUUID(),
    );
    other.onChange({
      type: 'update',
      entityRef: entity.entityRef,
      changes: [
        {
          kind: 'owned',
          property: p.uid,
          ownedEntity: created,
          changes: [],
        },
      ],
    });
  }, []);

  if (kind === 'entityOwned') {
    if (lastChange && lastChange.kind !== 'owned') {
      return <span>BUG: unexpected change type for Owned entity.</span>;
    }
    const value =
      entity.data[property.label] ?? lastChange?.ownedEntity ?? null;

    if (value === null) {
      return (
        <div style={{ paddingTop: 10 }}>
          <Button
            onClick={() => handleCreateNew(property)}
            variant="outlined"
            size="small"
            sx={{
              cursor: 'pointer',
              textTransform: 'unset',
              fontSize: '0.85rem',
              width: 50,
              borderColor: 'rgb(55, 148, 141)',
              color: 'rgb(55, 148, 141)',
              height: 28,
            }}
          >
            Create
          </Button>
        </div>
      );
    }
    if (
      isMaterializedEntity(value) &&
      value.entityRef.schema === property.linkedEntitySchema
    ) {
      if (
        lastChange &&
        !areMatch(lastChange.ownedEntity.entityRef, value.entityRef)
      ) {
        if (
          value.entityRef.type !== 'new' &&
          lastChange.ownedEntity.entityRef.type !== 'new'
        ) {
          return (
            <span>
              BUG: unexpected change type for Owned entity. Expected{' '}
              {lastChange.ownedEntity.entityRef.id} but got {value.entityRef.id}
              .
            </span>
          );
        }
        // Patch lastChange
        value.entityRef.id = lastChange.ownedEntity.entityRef.id;
      }
      return (
        <EntityOwnedForm
          key={`${entity.entityRef.id}_${property.uid}`}
          {...other}
          property={property}
          schema={getSchema(property.linkedEntitySchema)}
          entity={value}
          parent={entity}
          lastChange={lastChange}
        />
      );
    } else {
      return (
        <span>
          BUG: expected a materialized value of the correct entity type.
          {JSON.stringify(value)}
        </span>
      );
    }
  }
  if (kind === 'text' || kind === 'number' || kind === 'bool') {
    if (lastChange && lastChange.kind !== 'direct') {
      return (
        <span>BUG: Only Direct changes are accepted for this property</span>
      );
    }
    return (
      <DirectEntityPropertyField
        property={property}
        entity={entity}
        lastChange={lastChange}
        {...other}
      />
    );
  }
  if (kind === 'linkedEntity') {
    // Update the value if there are changes.
    if (lastChange && lastChange.kind !== 'linked') {
      return (
        <span>
          BUG: only Link changes are supported for this type of property!
        </span>
      );
    }
    return (
      <LinkedEntityPropertyComponent
        property={property}
        entity={entity}
        lastChange={lastChange}
        {...other}
      />
    );
  }
  if (kind === 'table') {
    if (lastChange && lastChange.kind !== 'table') {
      return (
        <span>
          BUG: only Table changes are supported for this type of property!
        </span>
      );
    }
    return (
      <div style={{ paddingTop: '4px' }}>
        <Button
          variant="outlined"
          onClick={() => setOpenNumbersTableDialog(true)}
        >
          <span>
            Show Table&nbsp;<i>{property.label}</i>
          </span>
        </Button>
        <NumbersTableDialog
          property={property}
          entity={entity}
          lastChange={lastChange}
          {...other}
          onClose={handleOnCloseNumbersTableDialog}
          openDialog={isOpenNumbersTableDialog}
        />
      </div>
    );
  }
  if (kind === 'ownedEntityList') {
    if (lastChange && lastChange.kind !== 'ownedList') {
      return (
        <span>
          BUG: only Table changes are supported for this type of property!
        </span>
      );
    }
    return (
      <EntityTableView
        lastChange={lastChange}
        entity={entity}
        property={property}
        {...other}
      />
    );
  }
  return <span>BUG: Unknown property {kind}</span>;
};
