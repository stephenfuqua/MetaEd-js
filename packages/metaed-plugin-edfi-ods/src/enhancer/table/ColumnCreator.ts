import { EntityProperty } from 'metaed-core';
import { Column } from '../../model/database/Column';
import { BuildStrategy } from './BuildStrategy';

export type ColumnCreator = {
  createColumns(property: EntityProperty, strategy: BuildStrategy): Array<Column>;
};

export function nullColumnCreator() {
  return {
    // @ts-ignore - all unused parameter names
    createColumns: (property: EntityProperty, strategy: BuildStrategy): Array<Column> => [],
  };
}
