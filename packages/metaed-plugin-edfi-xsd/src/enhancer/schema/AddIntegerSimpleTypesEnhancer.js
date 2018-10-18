// @flow
import type { MetaEdEnvironment, EnhancerResult, IntegerType } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { SimpleTypeBaseEdfiXsd } from '../../model/SimpleTypeBase';
import type { ModelBaseEdfiXsd } from '../../model/ModelBase';
import { NoSimpleType } from '../../model/schema/SimpleType';
import type { SimpleType } from '../../model/schema/SimpleType';
import { newIntegerSimpleType } from '../../model/schema/IntegerSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';
import { typeGroupSimple } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddIntegerSimpleTypesEnhancer';

function createSchemaSimpleType(integerType: IntegerType): SimpleType {
  if (integerType.generatedSimpleType && integerType.minValue === '' && integerType.maxValue === '') {
    return NoSimpleType;
  }

  return Object.assign(newIntegerSimpleType(), {
    name: ((integerType.data.edfiXsd: any): ModelBaseEdfiXsd).xsd_MetaEdNameWithExtension(),
    annotation: Object.assign(newAnnotation(), {
      documentation: integerType.documentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: integerType.isShort ? 'xs:short' : 'xs:int',
    minValue: integerType.minValue,
    maxValue: integerType.maxValue,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'integerType'): any): Array<IntegerType>).forEach((integerType: IntegerType) => {
    ((integerType.data.edfiXsd: any): SimpleTypeBaseEdfiXsd).xsd_SimpleType = createSchemaSimpleType(integerType);
  });

  return {
    enhancerName,
    success: true,
  };
}
