import { MetaEdEnvironment, EnhancerResult, Namespace, SharedInteger, IntegerProperty, ShortProperty } from 'metaed-core';
import { edfiXsdRepositoryForNamespace } from './EnhancerHelper';
import { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import { IntegerType } from '../model/IntegerType';
import { NoSimpleType } from '../model/schema/SimpleType';
import { metaEdNameWithExtension } from '../model/SimpleTypeBase';

const enhancerName = 'IntegerTypeEnhancer';

function createTypeFromProperty(metaEd: MetaEdEnvironment, property: IntegerProperty | ShortProperty) {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, property.namespace);
  if (edFiXsdEntityRepository == null) return;

  const integerType: IntegerType = {
    xsdMetaEdNameWithExtension: metaEdNameWithExtension(property.namespace, property.metaEdName),
    xsdSimpleType: NoSimpleType,
    metaEdName: property.metaEdName,
    namespace: property.namespace,
    generatedSimpleType: true,
    documentation: property.documentation,
    documentationInherited: false,
    typeHumanizedName: 'Integer Type',
    isShort: property.type === 'short',
    minValue: property.minValue == null ? '' : property.minValue,
    maxValue: property.maxValue == null ? '' : property.maxValue,
  };
  edFiXsdEntityRepository.integerType.push(integerType);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;

    namespace.entity.sharedInteger.forEach((sharedInteger: SharedInteger) => {
      const integerType: IntegerType = {
        xsdMetaEdNameWithExtension: metaEdNameWithExtension(namespace, sharedInteger.metaEdName),
        xsdSimpleType: NoSimpleType,
        metaEdName: sharedInteger.metaEdName,
        namespace,
        generatedSimpleType: false,
        documentation: sharedInteger.documentation,
        documentationInherited: false,
        typeHumanizedName: 'Integer Type',
        isShort: sharedInteger.isShort,
        minValue: sharedInteger.minValue,
        maxValue: sharedInteger.maxValue,
      };
      edFiXsdEntityRepository.integerType.push(integerType);
    });
  });

  metaEd.propertyIndex.integer.forEach((property: IntegerProperty) => {
    createTypeFromProperty(metaEd, property);
  });

  metaEd.propertyIndex.short.forEach((property: IntegerProperty) => {
    createTypeFromProperty(metaEd, property);
  });

  return {
    enhancerName,
    success: true,
  };
}
