import { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { groupByMetaEdName } from '../shared/GroupByMetaEdName';

const enhancerName = 'DeleteExtraneousImplicitExtensionSimpleTypesEnhancer';

/* Delete implicit simple types created by the builder in the extension namespace
 * when the implicit simple type already exists in core.
 */
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const simpleTypes = getAllEntitiesOfType(metaEd, 'decimalType', 'integerType', 'stringType');

  // @ts-ignore
  groupByMetaEdName(simpleTypes).forEach((entities, metaEdName) => {
    if (entities.length > 1) {
      entities.forEach(entity => {
        const repositoryId = `${entity.namespace.projectExtension}-${entity.metaEdName}`;
        // $FlowIgnore - we reference the entity repository by entity.type
        if (entity.namespace.isExtension) entity.namespace.entity[entity.type].delete(repositoryId);
      });
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
