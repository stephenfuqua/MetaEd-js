import hash from 'hash.js';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities, flattenNameComponentsFromGroup, Table, TableNameGroup } from 'metaed-plugin-edfi-ods-relational';

const enhancerName = 'PostgresqlTableNamingEnhancer';

// *********** Start of code lifted from PostgreSQL table naming spike ***********

type ComponentInfo = {
  nameComponent: string;
  truncatedLength: number;
};

function populateTruncatedLengths(availableLength: number, components: ComponentInfo[]) {
  // ignore if already allocated
  const uncalculatedComponents: ComponentInfo[] = components.filter(component => component.truncatedLength === 0);
  if (uncalculatedComponents.length === 0) return;

  const evenLength = Math.floor(availableLength / uncalculatedComponents.length);
  let contributedLengthFromShorterComponents = 0;
  let countOfLongerComponents = 0;

  // gather statistics
  uncalculatedComponents.forEach(component => {
    if (component.nameComponent.length <= evenLength) {
      contributedLengthFromShorterComponents += evenLength - component.nameComponent.length;
    } else {
      countOfLongerComponents += 1;
    }
  });

  if (contributedLengthFromShorterComponents === 0) {
    // no more help from shorter components, need to truncate everything
    uncalculatedComponents.forEach(component => {
      component.truncatedLength = Math.floor(evenLength);
    });
  } else {
    // can take smaller ones as is, larger ones wait for next round
    uncalculatedComponents.forEach(component => {
      if (component.nameComponent.length <= evenLength) {
        component.truncatedLength = component.nameComponent.length;
      }
    });
  }

  populateTruncatedLengths(
    countOfLongerComponents * evenLength + contributedLengthFromShorterComponents,
    uncalculatedComponents,
  );
}

export function postgresqlTableName(tableNameComponents: string[]): string {
  const overallMaxLength = 63;
  const untruncatedName = tableNameComponents.join('');
  if (untruncatedName.length <= overallMaxLength) return untruncatedName;

  const componentInfos: ComponentInfo[] = tableNameComponents.map(nameComponent => ({ nameComponent, truncatedLength: 0 }));

  const maxLengthBeforeHash = 56;
  populateTruncatedLengths(maxLengthBeforeHash, componentInfos);
  const tableNameBeforeHash = componentInfos.reduce(
    (acc, current) => acc + current.nameComponent.substring(0, current.truncatedLength),
    '',
  );
  return `${tableNameBeforeHash}-${hash
    .sha256()
    .update(tableNameComponents.join(''))
    .digest('hex')
    .substring(0, 6)}`;
}

// *********** End of code lifted from PostgreSQL table naming spike ***********

function constructNameFrom(nameGroup: TableNameGroup): string {
  const tableNameStrings: string[] = flattenNameComponentsFromGroup(nameGroup).map(nameComponent => nameComponent.name);
  return postgresqlTableName(tableNameStrings);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((table: Table) => {
      if (table.data.edfiOdsPostgresql == null) table.data.edfiOdsPostgresql = {};
      table.data.edfiOdsPostgresql.tableName = constructNameFrom(table.nameGroup);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
