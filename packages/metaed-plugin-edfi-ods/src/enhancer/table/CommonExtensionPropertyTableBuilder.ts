import { asCommonProperty, getEntityForNamespaces } from 'metaed-core';
import { ModelBase, EntityProperty, MergedProperty, ReferentialProperty } from 'metaed-core';
import { addColumns, addForeignKey, newTable, createForeignKeyUsingSourceReference } from '../../model/database/Table';
import { appendOverlapping } from '../../shared/Utility';
import { BuildStrategyDefault } from './BuildStrategy';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { ColumnTransform } from '../../model/database/ColumnTransform';
import { ForeignKeyStrategy } from '../../model/database/ForeignKeyStrategy';
import { TableStrategy } from '../../model/database/TableStrategy';
import { BuildStrategy } from './BuildStrategy';
import { Column } from '../../model/database/Column';
import { ColumnCreatorFactory } from './ColumnCreatorFactory';
import { foreignKeySourceReferenceFrom } from '../../model/database/ForeignKey';
import { ForeignKey } from '../../model/database/ForeignKey';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';
import { TableBuilderFactory } from './TableBuilderFactory';

function overlapCollapsingJoinTableName(parentEntityName: string, odsName: string) {
  return appendOverlapping(parentEntityName, odsName);
}

function buildExtensionTables(
  property: ReferentialProperty,
  parentTableStrategy: TableStrategy,
  primaryKeys: Array<Column>,
  _buildStrategy: BuildStrategy,
  joinTableName: string,
  joinTableSchema: string,
  tables: Array<Table>,
  tableFactory: TableBuilderFactory,
): void {
  const commonExtension: ModelBase | null = getEntityForNamespaces(
    property.metaEdName,
    [property.namespace],
    'commonExtension',
  );
  if (commonExtension == null) return;

  const extensionTable: Table = Object.assign(newTable(), {
    schema: commonExtension.namespace.namespaceName,
    name: overlapCollapsingJoinTableName(
      parentTableStrategy.name,
      property.data.edfiOds.odsName + commonExtension.namespace.extensionEntitySuffix,
    ),
    description: property.documentation,
    parentEntity: property.parentEntity,
    includeCreateDateColumn: true,
    hideFromApiMetadata: true,
  });

  // don't add table unless the extension table will have columns that are not just the fk to the base table
  if (
    commonExtension.data.edfiOds.odsProperties.some(
      (propertyOnCommonExtension: EntityProperty) =>
        !propertyOnCommonExtension.data.edfiOds.odsIsCollection && propertyOnCommonExtension.type !== 'common',
    )
  ) {
    tables.push(extensionTable);
  }

  const foreignKey: ForeignKey = createForeignKeyUsingSourceReference(
    {
      ...foreignKeySourceReferenceFrom(property),
      isExtensionRelationship: true,
    },
    primaryKeys,
    joinTableSchema,
    joinTableName,
    ForeignKeyStrategy.foreignColumnCascade(true, property.parentEntity.data.edfiOds.odsCascadePrimaryKeyUpdates),
  );

  addForeignKey(extensionTable, foreignKey);
  addColumns(extensionTable, primaryKeys, ColumnTransform.primaryKeyWithNewReferenceContext(joinTableName));

  commonExtension.data.edfiOds.odsProperties.forEach((odsProperty: EntityProperty) => {
    const tableBuilder: TableBuilder = tableFactory.tableBuilderFor(odsProperty);
    tableBuilder.buildTables(
      odsProperty,
      TableStrategy.extension(extensionTable, joinTableSchema, joinTableName),
      primaryKeys,
      BuildStrategyDefault,
      tables,
      null,
    );
  });
}

export function commonExtensionPropertyTableBuilder(
  tableFactory: TableBuilderFactory,
  columnFactory: ColumnCreatorFactory,
): TableBuilder {
  return {
    buildTables(
      property: EntityProperty,
      parentTableStrategy: TableStrategy,
      parentPrimaryKeys: Array<Column>,
      buildStrategy: BuildStrategy,
      tables: Array<Table>,
    ): void {
      const commonProperty = asCommonProperty(property);
      let strategy: BuildStrategy = buildStrategy;

      if (commonProperty.mergedProperties.length > 0) {
        strategy = strategy.skipPath(
          commonProperty.mergedProperties.map((x: MergedProperty) => x.mergePropertyPath.slice(1)),
        );
      }

      const primaryKeys: Array<Column> = [];
      if (!commonProperty.isOptional) {
        primaryKeys.push(...collectPrimaryKeys(commonProperty.referencedEntity, strategy, columnFactory));
      }
      primaryKeys.push(...parentPrimaryKeys);

      const joinTableName: string = overlapCollapsingJoinTableName(
        parentTableStrategy.name,
        commonProperty.data.edfiOds.odsName,
      );

      const joinTableSchema: string = commonProperty.referencedEntity.namespace.namespaceName;
      buildExtensionTables(
        commonProperty,
        parentTableStrategy,
        primaryKeys,
        buildStrategy,
        joinTableName,
        joinTableSchema,
        tables,
        tableFactory,
      );
    },
  };
}
