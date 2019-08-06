import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import {
  tableEntities,
  Table,
  TableNameGroup,
  isTableNameGroup,
  isTableNameComponent,
  TableNameComponent,
  flattenNameComponentsFromGroup,
} from 'metaed-plugin-edfi-ods-relational';
import { appendOverlapCollapsing } from './AppendOverlapCollapsing';

const enhancerName = 'PostgresqlTableNamingEnhancer';

function simpleTableNameGroupCollapse(nameGroup: TableNameGroup): string {
  return flattenNameComponentsFromGroup(nameGroup)
    .map(nameComponent => nameComponent.name)
    .reduce(appendOverlapCollapsing, '');
}

export function constructNameFrom(nameGroup: TableNameGroup): string {
  let name = '';
  if (nameGroup.sourceProperty != null) {
    // name groups from association and domain entity properties don't get table names collapsed
    if (nameGroup.sourceProperty.type === 'association' || nameGroup.sourceProperty.type === 'domainEntity') {
      nameGroup.nameElements.forEach(element => {
        if (isTableNameGroup(element)) name += constructNameFrom(element as TableNameGroup);
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

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((table: Table) => {
      table.data.edfiOdsPostgresql.tableName = constructNameFrom(table.nameGroup);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
