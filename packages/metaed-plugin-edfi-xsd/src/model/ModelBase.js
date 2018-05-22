// @flow
import type { MetaEdEnvironment, EnhancerResult, ModelBase } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { metaEdNameWithExtension } from './shared/AddMetaEdNameWithExtension';

export type ModelBaseEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string,
};

const enhancerName: string = 'ModelBaseSetupEnhancer';

export function addModelBaseEdfiXsdTo(modelBase: ModelBase) {
  if (modelBase.data.edfiXsd == null) modelBase.data.edfiXsd = {};

  Object.assign(modelBase.data.edfiXsd, {
    xsd_MetaEdNameWithExtension: metaEdNameWithExtension(modelBase),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(
    metaEd,
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
