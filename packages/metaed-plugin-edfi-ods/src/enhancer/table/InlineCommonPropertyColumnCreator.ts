import { EntityProperty } from 'metaed-core';
import { collectColumns } from './CommonPropertyColumnCreatorBase';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreator } from './ColumnCreator';
import { ColumnCreatorFactory } from './ColumnCreatorFactory';

export function inlineCommonPropertyColumnCreator(factory: ColumnCreatorFactory): ColumnCreator {
  return {
    createColumns: (property: EntityProperty, strategy: BuildStrategy): Array<Column> =>
      collectColumns(property, strategy.appendInlineContext(property.data.edfiOds.odsContextPrefix), factory),
  };
}
