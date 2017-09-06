// @flow
import type { MetaEdEnvironment, EnhancerResult, ModelBase } from '../../../../packages/metaed-core/index';
import { getEntitiesOfType } from '../../../../packages/metaed-core/index';
import { metaEdNameWithExtension } from './shared/AddMetaEdNameWithExtension';

export type ModelBaseEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string;
};

const enhancerName: string = 'ModelBaseSetupEnhancer';

export function addModelBaseEdfiXsdTo(modelBase: ModelBase) {
  Object.assign(modelBase.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtension(modelBase),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity,
    'association',
    'associationSubclass',
    'choice',
    'common',
    'decimalType',
    'domain',
    'domainEntity',
    'domainEntitySubclass',
    'enumeration',
    'integerType',
    'interchange',
    'interchangeExtension',
    'mapTypeEnumeration',
    'schoolYearEnumeration',
    'sharedDecimal',
    'sharedInteger',
    'sharedString',
    'stringType',
  ).forEach(entity => {
    addModelBaseEdfiXsdTo(entity);
  });

  return {
    enhancerName,
    success: true,
  };
}
