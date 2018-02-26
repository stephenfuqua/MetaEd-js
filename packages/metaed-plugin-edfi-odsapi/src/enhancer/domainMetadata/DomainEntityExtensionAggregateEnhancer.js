// @flow
import R from 'ramda';
import { getEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity, NamespaceInfo } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds, DomainEntityExtensionEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';

const enhancerName: string = 'DomainEntityExtensionAggregateEnhancer';

function orderedAndUniqueTablesFor(entity: TopLevelEntity, namespaceInfo: NamespaceInfo): Array<Table> {
  const tablesForNamespace = ((entity.data.edfiOds: any): TopLevelEntityEdfiOds).ods_Tables.filter(
    (t: Table) =>
      t.schema === namespaceInfo.namespace &&
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
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.entity.namespaceInfo, {
      isAggregateExtension,
      orderedAndUniqueTablesFor,
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
