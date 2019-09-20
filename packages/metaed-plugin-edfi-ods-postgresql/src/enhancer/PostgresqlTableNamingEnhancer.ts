import hash from 'hash.js';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import {
  tableEntities,
  flattenNameComponentsFromGroup,
  Table,
  TableNameGroup,
  isTableNameGroup,
  isTableNameComponent,
  TableNameComponent,
} from 'metaed-plugin-edfi-ods-relational';
import { appendOverlapCollapsing } from './AppendOverlapCollapsing';

const enhancerName = 'PostgresqlTableNamingEnhancer';

type ComponentInfo = {
  nameComponent: string;
  truncatedLength: number;
};

type TableNaming = {
  tableName: string;
  primaryKeyName: string;
  tableNameHashTruncated: string;
};

function simpleTableNameGroupCollapse(nameGroup: TableNameGroup): string {
  return flattenNameComponentsFromGroup(nameGroup)
    .map(nameComponent => nameComponent.name)
    .reduce(appendOverlapCollapsing, '');
}

export function constructCollapsedNameFrom(nameGroup: TableNameGroup): string {
  let name = '';
  if (nameGroup.sourceProperty != null) {
    // name groups from association and domain entity properties don't get table names collapsed
    if (nameGroup.sourceProperty.type === 'association' || nameGroup.sourceProperty.type === 'domainEntity') {
      nameGroup.nameElements.forEach(element => {
        if (isTableNameGroup(element)) name += constructCollapsedNameFrom(element as TableNameGroup);
        if (isTableNameComponent(element)) name += (element as TableNameComponent).name;
      });
    } else {
      // all other name groups from properties get table names collasped
      name += simpleTableNameGroupCollapse(nameGroup);
    }
  } else if (nameGroup.sourceEntity != null) {
    // all name groups from entities get table names collasped
    name += simpleTableNameGroupCollapse(nameGroup);
  } /* assume synthetic - get table names collapsed */ else {
    name += simpleTableNameGroupCollapse(nameGroup);
  }
  return name;
}

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

export function postgresqlPrimaryKeyName(tableNameComponents: string[], tableNameHashTruncated: string): string {
  const overallMaxLength = 63;
  const untruncatedName = `${tableNameComponents.join('')}_PK`;
  if (untruncatedName.length <= overallMaxLength) return untruncatedName;

  const componentInfos: ComponentInfo[] = tableNameComponents.map(nameComponent => ({ nameComponent, truncatedLength: 0 }));

  const maxLengthBeforeHash = 50;
  populateTruncatedLengths(maxLengthBeforeHash, componentInfos);
  const pkNameBeforeHash = componentInfos.reduce(
    (acc, current) => acc + current.nameComponent.substring(0, current.truncatedLength),
    '',
  );
  return `${pkNameBeforeHash.substr(0, pkNameBeforeHash.length)}_${tableNameHashTruncated}_PK`;
}

export function postgresqlTableNames(tableNameComponents: string[]): TableNaming {
  const overallMaxLength = 63;
  const untruncatedName = tableNameComponents.join('');
  const tableNameHash: string = hash
    .sha256()
    .update(untruncatedName)
    .digest('hex');
  const tableNameHashTruncated = tableNameHash.substring(0, 6);
  const primaryKeyName = postgresqlPrimaryKeyName(tableNameComponents, tableNameHashTruncated);

  if (untruncatedName.length <= overallMaxLength)
    return { tableName: untruncatedName, primaryKeyName, tableNameHashTruncated };

  const componentInfos: ComponentInfo[] = tableNameComponents.map(nameComponent => ({ nameComponent, truncatedLength: 0 }));

  const maxLengthBeforeHash = 56;
  populateTruncatedLengths(maxLengthBeforeHash, componentInfos);
  const tableNameBeforeHash = componentInfos.reduce(
    (acc, current) => acc + current.nameComponent.substring(0, current.truncatedLength),
    '',
  );

  return { tableName: `${tableNameBeforeHash}_${tableNameHash.substring(0, 6)}`, primaryKeyName, tableNameHashTruncated };
}

function constructNameFrom(nameGroup: TableNameGroup): TableNaming {
  const tableNameStrings: string[] = flattenNameComponentsFromGroup(nameGroup).map(nameComponent => nameComponent.name);
  return postgresqlTableNames(tableNameStrings);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((table: Table) => {
      if (table.data.edfiOdsPostgresql == null) table.data.edfiOdsPostgresql = {};
      Object.assign(table.data.edfiOdsPostgresql, constructNameFrom(table.nameGroup));
      table.data.edfiOdsPostgresql.collapsedNameForOrderingOnly = constructCollapsedNameFrom(table.nameGroup);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
