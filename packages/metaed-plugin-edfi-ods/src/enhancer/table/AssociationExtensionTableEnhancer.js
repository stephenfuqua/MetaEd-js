// @flow
import { asReferentialProperty, asTopLevelEntity, getEntitiesOfTypeForNamespaces, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, EntityProperty, MetaEdEnvironment, ModelBase, TopLevelEntity } from 'metaed-core';
import { addTables } from './TableCreatingEntityEnhancerBase';
import { BuildStrategyDefault } from './BuildStrategy';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { columnCreatorFactory } from './ColumnCreatorFactory';
import { newTable } from '../../model/database/Table';
import { tableBuilderFactory } from './TableBuilderFactory';
import { TableStrategy } from '../../model/database/TableStrategy';
import { isOdsReferenceProperty } from '../../model/property/ReferenceProperty';
import type { Column } from '../../model/database/Column';
import type { Table } from '../../model/database/Table';
import type { TableBuilder } from './TableBuilder';

const enhancerName: string = 'AssociationExtensionTableEnhancer';
const targetVersions: string = '>=3.x';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'associationExtension')
    .map((x: ModelBase) => asTopLevelEntity(x))
    .forEach((entity: TopLevelEntity) => {
      const tables: Array<Table> = [];
      const mainTable: Table = Object.assign(newTable(), {
        schema: entity.namespace.namespaceName,
        name: entity.data.edfiOds.ods_ExtensionName,
        description: entity.documentation,
        parentEntity: entity,
        // METAED-764: API requires extension tables to have CreateDate column
        includeCreateDateColumn: true,
      });

      // don't add table unless the extension table will have columns that are not just the fk to the base table
      if (
        entity.data.edfiOds.ods_Properties.some(
          (property: EntityProperty) =>
            !property.data.edfiOds.ods_IsCollection &&
            property.type !== 'common' &&
            (!isOdsReferenceProperty(property) || asReferentialProperty(property).referencedEntity !== entity.baseEntity),
        )
      ) {
        tables.push(mainTable);
      }

      const primaryKeys: Array<Column> = collectPrimaryKeys(entity, BuildStrategyDefault, columnCreatorFactory);

      entity.data.edfiOds.ods_Properties.forEach((property: EntityProperty) => {
        const tableStrategy: TableStrategy = TableStrategy.extension(
          mainTable,
          entity.baseEntity != null ? entity.baseEntity.namespace.namespaceName : '',
          entity.baseEntity != null ? entity.baseEntity.data.edfiOds.ods_TableName : '',
        );
        const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(property);
        tableBuilder.buildTables(property, tableStrategy, primaryKeys, BuildStrategyDefault, tables);
      });

      entity.data.edfiOds.ods_Tables = tables;
      addTables(metaEd, tables);
    });

  return {
    enhancerName,
    success: true,
  };
}
