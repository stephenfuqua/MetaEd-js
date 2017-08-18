// @flow
import type { MetaEdEnvironment, EnhancerResult, ModelBase } from '../../../../packages/metaed-core/index';
import { getEntitiesOfType } from '../../../../packages/metaed-core/index';
import { newSimpleType } from './schema/SimpleType';

export type SimpleTypeBaseEdfiXsd = {
  xsd_MetaEdNameWithExtension: () => string;
};

const enhancerName: string = 'SimpleTypeBaseSetupEnhancer';

export function addSimpleTypeBaseEdfiXsdTo(simpleTypeBase: ModelBase) {
  Object.assign(simpleTypeBase.data.edfiXsd, {
    xsd_SimpleType: newSimpleType(),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity,
    'decimalType',
    'integerType',
    'stringType',
  ).forEach(entity => {
    addSimpleTypeBaseEdfiXsdTo(entity);
  });

  return {
    enhancerName,
    success: true,
  };
}
