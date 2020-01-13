import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { NoSimpleType } from '../../model/schema/SimpleType';
import { SimpleType } from '../../model/schema/SimpleType';
import { newStringSimpleType } from '../../model/schema/StringSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';
import { typeGroupSimple } from './AddComplexTypesBaseEnhancer';
import { StringType } from '../../model/StringType';
import { EdFiXsdEntityRepository } from '../../model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../EnhancerHelper';

const enhancerName = 'AddStringSimpleTypesEnhancer';

function createSchemaSimpleType(stringType: StringType): SimpleType {
  if (stringType.generatedSimpleType && stringType.minLength === '' && stringType.maxLength === '') {
    return NoSimpleType;
  }

  return {
    ...newStringSimpleType(),
    name: stringType.xsdMetaEdNameWithExtension,
    annotation: { ...newAnnotation(), documentation: stringType.documentation, typeGroup: typeGroupSimple },
    baseType: 'xs:string',
    minLength: stringType.minLength,
    maxLength: stringType.maxLength,
  } as SimpleType;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;

    edFiXsdEntityRepository.stringType.forEach((stringType: StringType) => {
      stringType.xsdSimpleType = createSchemaSimpleType(stringType);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
