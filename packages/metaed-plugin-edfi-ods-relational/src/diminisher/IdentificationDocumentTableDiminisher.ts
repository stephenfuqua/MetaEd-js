import R from 'ramda';
import { getEntitiesOfTypeForNamespaces, versionSatisfies } from 'metaed-core';
import { ModelBase, EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// METAED-118
// Adjusting name for any tables with an IdentificationDocument suffix
// to remove anything between the domain entity name and the IdentificationDocument fragment
const enhancerName = 'IdentificationDocumentTableDiminisher';
const targetVersions = '2.x';

const identificationDocument = 'IdentificationDocument';

function renameIdentificationDocumentTables(coreNamespace: Namespace, tablesForCoreNamespace: Map<string, Table>): void {
  getEntitiesOfTypeForNamespaces([coreNamespace], 'domainEntity').forEach((entity: ModelBase) => {
    const identificationDocumentTableNames: string[] = entity.data.edfiOds.odsTables.reduce(
      (names: string[], table: Table) => {
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
    const table: Table | undefined = tablesForCoreNamespace.get(R.head(identificationDocumentTableNames));
    if (table == null) return;
    table.name = entity.metaEdName + identificationDocument;
    tablesForCoreNamespace.set(table.name, table);

    table.foreignKeys.forEach((fk: ForeignKey) => {
      fk.parentTableName = table.name;
    });

    // remove from domain entity table list and repository
    identificationDocumentTableNames.forEach((identificationDocumentTableName: string) => {
      entity.data.edfiOds.odsTables = R.reject((x: Table) => x.name === identificationDocumentTableName)(
        entity.data.edfiOds.odsTables,
      );

      tablesForCoreNamespace.delete(identificationDocumentTableName);
    });
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameIdentificationDocumentTables(coreNamespace, tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
