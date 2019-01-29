import {
  asReferentialProperty,
  asTopLevelEntity,
  getEntitiesOfTypeForNamespaces,
  versionSatisfies,
  NoNamespace,
} from 'metaed-core';
import { EnhancerResult, EntityProperty, MetaEdEnvironment, ModelBase, TopLevelEntity } from 'metaed-core';
import { addTables } from './TableCreatingEntityEnhancerBase';
import { BuildStrategyDefault } from './BuildStrategy';
import { collectPrimaryKeys } from './PrimaryKeyCollector';
import { columnCreatorFactory } from './ColumnCreatorFactory';
import { newTable } from '../../model/database/Table';
import { tableBuilderFactory } from './TableBuilderFactory';
import { TableStrategy } from '../../model/database/TableStrategy';
import { isOdsReferenceProperty } from '../../model/property/ReferenceProperty';
import { Column } from '../../model/database/Column';
import { Table } from '../../model/database/Table';
import { TableBuilder } from './TableBuilder';

const enhancerName = 'AssociationExtensionTableEnhancer';
const targetVersions = '>=3.x';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  getEntitiesOfTypeForNamespaces(Array.from(metaEd.namespace.values()), 'associationExtension')
    .map((x: ModelBase) => asTopLevelEntity(x))
    .forEach((entity: TopLevelEntity) => {
      const tables: Array<Table> = [];
      const mainTable: Table = Object.assign(newTable(), {
        namespace: entity.namespace,
        schema: entity.namespace.namespaceName.toLowerCase(),
        name: entity.data.edfiOds.odsExtensionName,
        description: entity.documentation,
        parentEntity: entity,
        // METAED-764: API requires extension tables to have CreateDate column
        includeCreateDateColumn: true,
        hideFromApiMetadata: true,
      });

      // don't add table unless the extension table will have columns that are not just the fk to the base table
      if (
        entity.data.edfiOds.odsProperties.some(
          (property: EntityProperty) =>
            !property.data.edfiOds.odsIsCollection &&
            property.type !== 'common' &&
            (!isOdsReferenceProperty(property) || asReferentialProperty(property).referencedEntity !== entity.baseEntity),
        )
      ) {
        tables.push(mainTable);
      }

      const primaryKeys: Array<Column> = collectPrimaryKeys(entity, BuildStrategyDefault, columnCreatorFactory);

      entity.data.edfiOds.odsProperties.forEach((property: EntityProperty) => {
        const tableStrategy: TableStrategy = TableStrategy.extension(
          mainTable,
          entity.baseEntity != null ? entity.baseEntity.namespace.namespaceName.toLowerCase() : '',
          entity.baseEntity != null ? entity.baseEntity.namespace : NoNamespace,
          entity.baseEntity != null ? entity.baseEntity.data.edfiOds.odsTableName : '',
        );
        const tableBuilder: TableBuilder = tableBuilderFactory.tableBuilderFor(property);
        tableBuilder.buildTables(property, tableStrategy, primaryKeys, BuildStrategyDefault, tables, null);
      });

      entity.data.edfiOds.odsTables = tables;
      addTables(metaEd, tables);
    });

  return {
    enhancerName,
    success: true,
  };
}
