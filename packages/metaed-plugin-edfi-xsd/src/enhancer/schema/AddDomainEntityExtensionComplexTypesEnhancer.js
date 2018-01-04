// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../../model/TopLevelEntity';
import {
  typeGroupDomainEntity,
  createDefaultComplexType,
  createCoreRestrictionForExtensionParent,
  restrictionName,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDomainEntityExtensionComplexTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntityExtension.forEach(domainEntityExtension => {
    if (domainEntityExtension.data.edfiXsd.xsd_HasExtensionOverrideProperties()) {
      const domainEntityExtensionEdfiXsd: TopLevelEntityEdfiXsd = domainEntityExtension.data.edfiXsd;
      domainEntityExtensionEdfiXsd.xsd_ComplexTypes = [createCoreRestrictionForExtensionParent(domainEntityExtension)];
      domainEntityExtensionEdfiXsd.xsd_ComplexTypes.push(
        ...createDefaultComplexType(domainEntityExtension, typeGroupDomainEntity, restrictionName(domainEntityExtension)),
      );
    } else {
      if (domainEntityExtension.baseEntity == null) return;
      domainEntityExtension.data.edfiXsd.xsd_ComplexTypes = createDefaultComplexType(
        domainEntityExtension,
        typeGroupDomainEntity,
        domainEntityExtension.baseEntity.data.edfiXsd.xsd_MetaEdNameWithExtension(),
      );
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
