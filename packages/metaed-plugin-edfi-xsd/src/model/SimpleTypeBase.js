// @flow
import type { MetaEdEnvironment, EnhancerResult, DecimalType, IntegerType, StringType } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { SimpleType } from './schema/SimpleType';
import { NoSimpleType } from './schema/SimpleType';

export type SimpleTypeBaseEdfiXsd = {
  xsd_SimpleType: SimpleType,
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
  ((getAllEntitiesOfType(metaEd, 'decimalType', 'integerType', 'stringType'): any): Array<SimpleTypeBase>).forEach(
    (entity: SimpleTypeBase) => {
      addSimpleTypeBaseEdfiXsdTo(entity);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
