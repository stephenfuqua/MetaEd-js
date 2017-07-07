// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';
import { asCommon } from '../../../../packages/metaed-core/src/model/Common';
import { groupByMetaEdName } from '../shared/GroupByMetaEdName';

const enhancerName: string = 'DeleteExtraneousImplicitExtensionSimpleTypesEnhancer';

/* Delete implicit simple types created by the builder in the extension namespace
 * when the implicit simple type already exists in core.
 */
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const simpleTypes = [];
  simpleTypes.push(...metaEd.entity.decimalType.values(), ...metaEd.entity.integerType.values(), ...metaEd.entity.stringType.values());
  // eslint-disable-next-line no-unused-vars
  groupByMetaEdName(simpleTypes).forEach((entities, metaEdName) => {
    if (entities.length > 1) {
      entities.forEach(entity => {
        const repositoryId = `${entity.namespaceInfo.projectExtension}-${entity.metaEdName}`;
        // $FlowIgnore - we reference the entity repository by entity.type
        if (entity.namespaceInfo.isExtension) metaEd.entity[entity.type].delete(repositoryId);
      });
    }
  });

  metaEd.entity.commonExtension.forEach(extensionEntity => {
    if (extensionEntity.baseEntity) {
      asCommon(extensionEntity.baseEntity).extender = extensionEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
