import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { NoSimpleType } from '../../model/schema/SimpleType';
import { SimpleType } from '../../model/schema/SimpleType';
import { newIntegerSimpleType } from '../../model/schema/IntegerSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';
import { typeGroupSimple } from './AddComplexTypesBaseEnhancer';
import { IntegerType } from '../../model/IntegerType';
import { EdFiXsdEntityRepository } from '../../model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../EnhancerHelper';

const enhancerName = 'AddIntegerSimpleTypesEnhancer';

function createSchemaSimpleType(integerType: IntegerType): SimpleType {
  if (integerType.generatedSimpleType && integerType.minValue === '' && integerType.maxValue === '') {
    return NoSimpleType;
  }

  return {
    ...newIntegerSimpleType(),
    name: integerType.xsdMetaEdNameWithExtension,
    annotation: { ...newAnnotation(), documentation: integerType.documentation, typeGroup: typeGroupSimple },
    baseType: integerType.isShort ? 'xs:short' : 'xs:int',
    minValue: integerType.minValue,
    maxValue: integerType.maxValue,
  } as SimpleType;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;

    edFiXsdEntityRepository.integerType.forEach((integerType: IntegerType) => {
      integerType.xsdSimpleType = createSchemaSimpleType(integerType);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
