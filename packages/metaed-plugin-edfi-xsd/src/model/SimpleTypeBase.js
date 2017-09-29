// @flow
import type { MetaEdEnvironment, EnhancerResult, DecimalType, IntegerType, StringType } from '../../../../packages/metaed-core/index';
import { getEntitiesOfType } from '../../../../packages/metaed-core/index';
import type { SimpleType } from './schema/SimpleType';
import { NoSimpleType } from './schema/SimpleType';

export type SimpleTypeBaseEdfiXsd = {
  xsd_SimpleType: SimpleType;
};

export type SimpleTypeBase = DecimalType | IntegerType | StringType;

const enhancerName: string = 'SimpleTypeBaseSetupEnhancer';

export function addSimpleTypeBaseEdfiXsdTo(simpleTypeBase: SimpleTypeBase) {
  if (simpleTypeBase.data.edfiXsd == null) simpleTypeBase.data.edfiXsd = {};

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
    const simpleTypeBase = ((entity: any): SimpleTypeBase);
    addSimpleTypeBaseEdfiXsdTo(simpleTypeBase);
  });

  return {
    enhancerName,
    success: true,
  };
}
