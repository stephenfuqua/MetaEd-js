// @flow
import R from 'ramda';
import { getEntitiesOfTypeForNamespaces, versionSatisfies } from 'metaed-core';
import type { ModelBase, EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { ForeignKey } from '../model/database/ForeignKey';
import type { Table } from '../model/database/Table';

// METAED-118
// Adjusting name for any tables with an IdentificationDocument suffix
// to remove anything between the domain entity name and the IdentificationDocument fragment
const enhancerName: string = 'IdentificationDocumentTableDiminisher';
const targetVersions: string = '2.x';

const identificationDocument: string = 'IdentificationDocument';

function renameIdentificationDocumentTables(coreNamespace: Namespace, tablesForCoreNamespace: Map<string, Table>): void {
  getEntitiesOfTypeForNamespaces([coreNamespace], 'domainEntity').forEach((entity: ModelBase) => {
    const identificationDocumentTableNames: Array<string> = entity.data.edfiOds.ods_Tables.reduce(
      (names: Array<string>, table: Table) => {
        if (
          table.name.startsWith(entity.metaEdName) &&
          table.name.endsWith(identificationDocument) &&
          table.name !== entity.metaEdName + identificationDocument
        )
          return names.concat(table.name);
        return names;
      },
      [],
    );
    if (identificationDocumentTableNames.length === 0) return;

    // only the first table survives, with a shortened name
    // note: this may not be stable as it relies on ordering when there are multiple identification document tables
    const table: ?Table = tablesForCoreNamespace.get(R.head(identificationDocumentTableNames));
    if (table == null) return;
    table.name = entity.metaEdName + identificationDocument;
    tablesForCoreNamespace.set(table.name, table);

    table.foreignKeys.forEach((fk: ForeignKey) => {
      fk.parentTableName = table.name;
    });

    // remove from domain entity table list and repository
    identificationDocumentTableNames.forEach((identificationDocumentTableName: string) => {
      entity.data.edfiOds.ods_Tables = R.reject((x: Table) => x.name === identificationDocumentTableName)(
        entity.data.edfiOds.ods_Tables,
      );

      tablesForCoreNamespace.delete(identificationDocumentTableName);
    });
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameIdentificationDocumentTables(coreNamespace, tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
