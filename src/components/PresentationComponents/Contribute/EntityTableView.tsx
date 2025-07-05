/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react';

import {
  isMaterializedEntityArray,
  MaterializedEntity,
  getSchema,
  materializeNew,
  areMatch,
  OwnedEntityListChange,
  OwnedEntityListProperty,
} from '@dotproductdev/voyages-contribute';
import { Add } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { Typography } from 'antd';

import { EntityFormProps } from './EntityForm';
import { EntityTableRow } from './EntityTableRow';

export interface EntityTableViewProps {
  property: OwnedEntityListProperty;
  lastChange?: OwnedEntityListChange;
  entity: MaterializedEntity;
}

export const createEmptyChange = (property: string): OwnedEntityListChange => ({
  kind: 'ownedList',
  modified: [],
  removed: [],
  property,
});

export const EntityTableView = ({
  property,
  entity,
  lastChange,
  ...other
}: EntityTableViewProps & EntityFormProps) => {
  const { label, linkedEntitySchema } = property;
  const fieldValue = entity.data[label] ?? [];
  const childSchema = getSchema(linkedEntitySchema);

  const children = useMemo(() => {
    if (!isMaterializedEntityArray(fieldValue)) {
      return [];
    }

    const res: MaterializedEntity[] = [...fieldValue];
    if (lastChange) {
      const added = lastChange.modified.filter(
        (m) =>
          m.ownedEntity.entityRef.type === 'new' &&
          !res.find((e) => areMatch(m.ownedEntity.entityRef, e.entityRef)),
      );
      res.push(...added.map((m) => m.ownedEntity));
    }
    // Make sure that the order in which the rows appear is consistent.
    res.sort((x, y) => {
      const a = x.entityRef.id;
      const b = y.entityRef.id;
      if (typeof a === 'number') {
        if (typeof b === 'number') {
          return a - b;
        }
        return -1;
      }
      if (typeof b === 'number') {
        return 1;
      }
      return a.localeCompare(b);
    });
    return res;
  }, [entity, lastChange, childSchema, fieldValue]);

  if (!isMaterializedEntityArray(fieldValue)) {
    return (
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          color: 'error.main',
          backgroundColor: 'error.light',
          borderRadius: 1,
          mb: 2,
        }}
      >
        BUG: The entity data does not match the expectation of being an array of
        materialized entities (children)
      </Box>
    );
  }

  const onChange = other.onChange;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleAdd = useCallback(() => {
    const change = lastChange ?? createEmptyChange(property.uid);
    const childProp = childSchema.properties.find(
      (p) => p.label === property.childBackingProp,
    );
    if (childProp === undefined) {
      throw new Error(
        `Invalid schema: the child property "${property.childBackingProp}" was not found in ${childSchema.name}`,
      );
    }
    const added = materializeNew(
      childSchema,
      `${new Date().getTime()}${crypto.randomUUID()}`,
    );
    onChange({
      type: 'update',
      entityRef: entity.entityRef,
      changes: [
        {
          ...change,
          modified: [
            ...change.modified,
            {
              kind: 'owned',
              ownedEntity: added,
              changes: [
                {
                  kind: 'direct',
                  property: childProp.uid,
                  changed: entity.entityRef.id,
                },
              ],
              property: '',
            },
          ],
        },
      ],
    });
  }, [entity, lastChange, property, childSchema, onChange]);

  return (
    <Box sx={{ mb: 3 }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell
                sx={{
                  width: 48,
                  padding: '2px 16px',
                  borderColor: 'divider',
                }}
              />
              <TableCell
                sx={{
                  padding: '2px 16px',
                  borderColor: 'divider',
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    color: 'rgb(55, 148, 141)',
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {property.label}
                </Typography.Title>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  padding: '2px 16px',
                  borderColor: 'divider',
                }}
              >
                <IconButton
                  size="small"
                  color="success"
                  onClick={handleAdd}
                  sx={{
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: '#13c2c2',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children.map((c, i) => (
              <EntityTableRow
                key={c.entityRef.id}
                {...other}
                entity={c}
                schema={childSchema}
                parent={entity}
                property={property}
                lastChange={lastChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
