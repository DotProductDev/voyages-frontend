import React, { useCallback, useMemo, useState } from 'react';

import {
  EntityChange,
  TableChange,
  MaterializedEntity,
  TableProperty,
} from '@dotproductdev/voyages-contribute';
import { Table, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { EntityPropertyChangeCommentBox } from './EntityPropertyChangeCommentBox';
import '@/style/numberTable.scss';

interface EditableTableProps {
  property: TableProperty;
  entity: MaterializedEntity;
  lastChange?: TableChange;
  onChange: (change: EntityChange) => void;
}

interface ActiveCell {
  rowIndex: number;
  colIndex: number;
}

interface CellInfo {
  field: string | undefined;
  value: string;
  rowIndex: number;
  colIndex: number;
}

type NumberTableRowContents = {
  [K in `col-${number}`]: CellInfo;
};

interface NumberTableRow extends NumberTableRowContents {
  key: number;
  rowHeader: string;
}

const NumbersTableComponent: React.FC<EditableTableProps> = ({
  property,
  entity,
  lastChange,
  onChange,
}) => {
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const [localChanges, setLocalChanges] = useState<Record<string, string>>({});

  const entityData = entity.data;

  const handleCellChange = useCallback(
    (col: number, row: number, changed: string) => {
      const field = property.cellField(col, row);
      if (!field) return;

      const numValue = changed === '' ? null : parseFloat(changed);
      if (changed !== '' && isNaN(numValue as number)) return;

      setLocalChanges((prev) => ({
        ...prev,
        [field]: changed,
      }));

      const allChanges = { ...lastChange?.changes, [field]: numValue };
      onChange({
        type: 'update',
        entityRef: entity.entityRef,
        changes: [
          {
            kind: 'table',
            property: property.uid,
            changes: allChanges,
            comments: lastChange?.comments,
          },
        ],
      });
    },
    [property, entity, lastChange, onChange],
  );

  const getCellValue = useCallback(
    (col: number, row: number): string => {
      const field = property.cellField(col, row);
      if (!field) return '';
      const changed = lastChange?.changes[field];
      const original = changed === undefined ? entityData[field] : changed;
      const value =
        typeof original === 'string' ? parseInt(original) : original;
      return typeof value === 'number' && !isNaN(value) ? value.toString() : '';
    },
    [property, lastChange, entityData],
  );

  const handleComment = useCallback(
    (comment: string) => {
      onChange({
        type: 'update',
        entityRef: entity.entityRef,
        changes: [
          {
            kind: 'table',
            property: property.uid,
            changes: lastChange?.changes ?? {},
            comments: comment,
          },
        ],
      });
    },
    [entity, lastChange, property, onChange],
  );

  // Construct dataSource for Antd Table
  const dataSource = useMemo(
    () =>
      property.rows.map((rowHeader, rowIndex) => {
        const row: NumberTableRow = {
          key: rowIndex,
          rowHeader,
        };
        property.columns.forEach((_, colIndex) => {
          const field = property.cellField(colIndex, rowIndex);
          row[`col-${colIndex}`] = {
            field,
            value: getCellValue(colIndex, rowIndex),
            rowIndex,
            colIndex,
          };
        });
        return row;
      }),
    [getCellValue, property],
  );

  // Construct columns for Antd Table
  const columns: ColumnsType<NumberTableRow> = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'rowHeader',
        key: 'rowHeader',
        fixed: 'left',
        width: 210,
        render: (text: string, _record, rowIndex) => (
          <span
            style={
              activeCell?.rowIndex === rowIndex
                ? { color: 'rgb(55, 148, 141)', fontSize: '0.85rem' }
                : { fontSize: '0.85rem' }
            }
          >
            {text}
          </span>
        ),
      },
      ...property.columns.map((colHeader, colIndex) => ({
        title: (
          <span
            style={
              activeCell?.colIndex === colIndex
                ? { color: 'rgb(55, 148, 141)', fontSize: '0.85rem' }
                : { fontSize: '0.85rem' }
            }
          >
            {colHeader.charAt(0).toUpperCase() +
              colHeader.slice(1).toLowerCase()}
          </span>
        ),
        dataIndex: `col-${colIndex}`,
        key: `col-${colIndex}`,
        width: 70,
        render: ({ field, rowIndex, colIndex, value }: CellInfo) =>
          field ? (
            <Input
              value={localChanges[field] ?? value}
              onChange={(e) =>
                handleCellChange(colIndex, rowIndex, e.target.value)
              }
              onFocus={() =>
                setActiveCell({
                  rowIndex: rowIndex,
                  colIndex: colIndex,
                })
              }
              onBlur={() => setActiveCell(null)}
              style={{
                padding: 2,
                border: 'none',
                borderBottom: '1px solid #d9d9d9',
                borderRadius: 0,
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent',
              }}
            />
          ) : (
            <div style={{ backgroundColor: '#f9f9f9' }} />
          ),
      })),
    ],
    [
      activeCell?.colIndex,
      activeCell?.rowIndex,
      handleCellChange,
      localChanges,
      property.columns,
    ],
  );

  return (
    <div>
      <Table<NumberTableRow>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        size="small"
        footer={() => (
          <div className="comment-box-wrapper">
            <EntityPropertyChangeCommentBox
              property={property}
              current={lastChange?.comments}
              onComment={handleComment}
            />
          </div>
        )}
      />
    </div>
  );
};

export default NumbersTableComponent;
