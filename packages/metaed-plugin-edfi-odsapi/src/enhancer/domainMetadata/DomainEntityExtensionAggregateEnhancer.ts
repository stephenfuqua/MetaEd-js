import R from 'ramda';
import { getAllEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import { MetaEdEnvironment, ModelBase, EnhancerResult, TopLevelEntity, Namespace } from 'metaed-core';
import { Table, TopLevelEntityEdfiOds, DomainEntityExtensionEdfiOds } from 'metaed-plugin-edfi-ods';
import { enhanceSingleEntity } from './AggregateEnhancerBase';

const enhancerName = 'DomainEntityExtensionAggregateEnhancer';

function orderedAndUniqueTablesFor(entity: TopLevelEntity, namespace: Namespace): Array<Table> {
  const tablesForNamespace = (entity.data.edfiOds as TopLevelEntityEdfiOds).odsTables.filter(
    (t: Table) =>
      t.schema === namespace.namespaceName &&
      t.name !== (entity.data.edfiOds as DomainEntityExtensionEdfiOds).odsExtensionName,
  );
  // TODO: why is unique necessary?
  const uniquedTables = R.uniqBy(R.prop('name'), tablesForNamespace);
  return R.sortBy(R.prop('name'), uniquedTables);
}

const isAggregateExtension = () => true;

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'domainEntityExtension').forEach((modelBase: ModelBase) => {
    // $FlowIgnore - Flow issue #183 - Add support for destructuring parameters + default values
    enhanceSingleEntity(
      asTopLevelEntity(modelBase),
      metaEd.namespace,
      undefined,
      isAggregateExtension,
      orderedAndUniqueTablesFor,
    );
  });

  return {
    enhancerName,
    success: true,
  };
}
