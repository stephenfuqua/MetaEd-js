// @flow
import R from 'ramda';
import { getEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity, Namespace } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds, DomainEntityExtensionEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';

const enhancerName: string = 'DomainEntityExtensionAggregateEnhancer';

function orderedAndUniqueTablesFor(entity: TopLevelEntity, namespace: Namespace): Array<Table> {
  const tablesForNamespace = ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_Tables.filter(
    (t: Table) =>
      t.schema === namespace.namespaceName &&
      t.name !== ((entity.data.edfiOds: any): DomainEntityExtensionEdfiOds).ods_ExtensionName,
  );
  // TODO: why is unique necessary?
  const uniquedTables = R.uniqBy(R.prop('name'), tablesForNamespace);
  return R.sortBy(R.prop('name'), uniquedTables);
}

const isAggregateExtension = () => true;

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'domainEntityExtension').forEach((modelBase: ModelBase) => {
    // $FlowIgnore - Flow issue #183 - Add support for destructuring parameters + default values
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.entity.namespace, {
      isAggregateExtension,
      orderedAndUniqueTablesFor,
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
