import { MetaEdEnvironment, EnhancerResult, DecimalType, IntegerType, StringType } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { SimpleType } from './schema/SimpleType';
import { NoSimpleType } from './schema/SimpleType';

export type SimpleTypeBaseEdfiXsd = {
  xsdSimpleType: SimpleType;
};

export type SimpleTypeBase = DecimalType | IntegerType | StringType;

const enhancerName = 'SimpleTypeBaseSetupEnhancer';

export function addSimpleTypeBaseEdfiXsdTo(simpleTypeBase: SimpleTypeBase) {
  if (simpleTypeBase.data.edfiXsd == null) simpleTypeBase.data.edfiXsd = {};

  Object.assign(simpleTypeBase.data.edfiXsd, {
    xsdSimpleType: NoSimpleType,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'decimalType', 'integerType', 'stringType') as Array<SimpleTypeBase>).forEach(
    (entity: SimpleTypeBase) => {
      addSimpleTypeBaseEdfiXsdTo(entity);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
