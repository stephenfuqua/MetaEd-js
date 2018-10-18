// @flow
import type { MetaEdEnvironment, EnhancerResult, DecimalType } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { SimpleTypeBaseEdfiXsd } from '../../model/SimpleTypeBase';
import type { ModelBaseEdfiXsd } from '../../model/ModelBase';
import { NoSimpleType } from '../../model/schema/SimpleType';
import type { SimpleType } from '../../model/schema/SimpleType';
import { newDecimalSimpleType } from '../../model/schema/DecimalSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';
import { typeGroupSimple } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDecimalSimpleTypesEnhancer';

function createSchemaSimpleType(decimalType: DecimalType): SimpleType {
  if (
    decimalType.generatedSimpleType &&
    decimalType.minValue === '' &&
    decimalType.maxValue === '' &&
    decimalType.decimalPlaces === '' &&
    decimalType.totalDigits === ''
  ) {
    return NoSimpleType;
  }

  return Object.assign(newDecimalSimpleType(), {
    name: ((decimalType.data.edfiXsd: any): ModelBaseEdfiXsd).xsd_MetaEdNameWithExtension(),
    annotation: Object.assign(newAnnotation(), {
      documentation: decimalType.documentation,
      typeGroup: typeGroupSimple,
    }),
    baseType: 'xs:decimal',
    minValue: decimalType.minValue,
    maxValue: decimalType.maxValue,
    decimalPlaces: decimalType.decimalPlaces,
    totalDigits: decimalType.totalDigits,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'decimalType'): any): Array<DecimalType>).forEach((decimalType: DecimalType) => {
    ((decimalType.data.edfiXsd: any): SimpleTypeBaseEdfiXsd).xsd_SimpleType = createSchemaSimpleType(decimalType);
  });

  return {
    enhancerName,
    success: true,
  };
}
