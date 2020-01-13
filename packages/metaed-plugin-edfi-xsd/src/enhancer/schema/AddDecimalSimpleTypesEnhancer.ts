import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { NoSimpleType } from '../../model/schema/SimpleType';
import { SimpleType } from '../../model/schema/SimpleType';
import { newDecimalSimpleType } from '../../model/schema/DecimalSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';
import { typeGroupSimple } from './AddComplexTypesBaseEnhancer';
import { DecimalType } from '../../model/DecimalType';
import { edfiXsdRepositoryForNamespace } from '../EnhancerHelper';
import { EdFiXsdEntityRepository } from '../../model/EdFiXsdEntityRepository';

const enhancerName = 'AddDecimalSimpleTypesEnhancer';

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

  return {
    ...newDecimalSimpleType(),
    name: decimalType.xsdMetaEdNameWithExtension,
    annotation: { ...newAnnotation(), documentation: decimalType.documentation, typeGroup: typeGroupSimple },
    baseType: 'xs:decimal',
    minValue: decimalType.minValue,
    maxValue: decimalType.maxValue,
    decimalPlaces: decimalType.decimalPlaces,
    totalDigits: decimalType.totalDigits,
  } as SimpleType;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;

    edFiXsdEntityRepository.decimalType.forEach((decimalType: DecimalType) => {
      decimalType.xsdSimpleType = createSchemaSimpleType(decimalType);
    });
  });
  return {
    enhancerName,
    success: true,
  };
}
