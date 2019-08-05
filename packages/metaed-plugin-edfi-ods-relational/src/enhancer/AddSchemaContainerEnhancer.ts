import R from 'ramda';
import { orderByProp } from 'metaed-core';
import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { tableEntities, rowEntities } from './EnhancerHelper';
import { EnumerationRowBase } from '../model/database/EnumerationRowBase';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

const enhancerName = 'AddSchemaContainerEnhancer';

export const orderRows = R.sortBy(
  R.compose(
    R.toLower,
    R.join(''),
    R.props(['name', 'description']),
  ),
);

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const rows: EnumerationRowBase[] = Array.from(rowEntities(metaEd, namespace).values()).filter(
      (row: EnumerationRowBase) => row.namespace === namespace.namespaceName,
    );
    const tables: Table[] = orderByProp('name')(
      Array.from(tableEntities(metaEd, namespace).values()).filter(
        (table: Table) => table.schema === namespace.namespaceName.toLowerCase(),
      ),
    );
    const foreignKeys: ForeignKey[] = R.chain(table => table.foreignKeys)(tables);
    const enumerationRows: EnumerationRowBase[] = orderRows(
      rows.filter((row: EnumerationRowBase) => row.type === 'enumerationRow'),
    );
    const schoolYearEnumerationRows: EnumerationRowBase[] = orderByProp('name')(
      rows.filter((row: EnumerationRowBase) => row.type === 'schoolYearEnumerationRow'),
    );

    Object.assign(namespace.data.edfiOds.odsSchema, {
      tables,
      foreignKeys,
      enumerationRows,
      schoolYearEnumerationRows,
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
