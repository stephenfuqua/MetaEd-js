import { ReferentialProperty, TopLevelEntity } from 'metaed-core';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreator } from './ColumnCreator';
import { ColumnCreatorFactory } from './ColumnCreatorFactory';

export function collectPrimaryKeys(
  entity: TopLevelEntity,
  strategy: BuildStrategy,
  factory: ColumnCreatorFactory,
): Array<Column> {
  if (!entity.data.edfiOds) return [];

  const columns: Array<Column> = [];

  entity.data.edfiOds.odsIdentityProperties.forEach((property: ReferentialProperty) => {
    const columnCreator: ColumnCreator = factory.columnCreatorFor(property);
    columns.push(...columnCreator.createColumns(property, strategy));
  });

  entity.data.edfiOds.odsProperties.forEach((property: ReferentialProperty) => {
    if (property.type !== 'inlineCommon') return;
    columns.push(
      ...collectPrimaryKeys(
        property.referencedEntity,
        strategy.appendParentContext(property.data.edfiOds.odsContextPrefix),
        factory,
      ),
    );
  });

  return columns;
}
