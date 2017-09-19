// @flow
import type { MetaEdEnvironment, EnhancerResult, ModelBase } from '../../../../packages/metaed-core/index';
import { getEntitiesOfType } from '../../../../packages/metaed-core/index';
import type { SimpleType } from './schema/SimpleType';
import { NoSimpleType } from './schema/SimpleType';

export type SimpleTypeBaseEdfiXsd = {
  xsd_SimpleType: SimpleType;
};

const enhancerName: string = 'SimpleTypeBaseSetupEnhancer';

export function addSimpleTypeBaseEdfiXsdTo(simpleTypeBase: ModelBase) {
  Object.assign(simpleTypeBase.data.edfiXsd, {
    xsd_SimpleType: NoSimpleType,
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
