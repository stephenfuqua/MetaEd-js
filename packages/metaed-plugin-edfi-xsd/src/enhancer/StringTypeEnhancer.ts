import { MetaEdEnvironment, EnhancerResult, Namespace, SharedString, StringProperty } from 'metaed-core';
import { edfiXsdRepositoryForNamespace } from './EnhancerHelper';
import { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import { StringType } from '../model/StringType';
import { NoSimpleType } from '../model/schema/SimpleType';
import { metaEdNameWithExtension } from '../model/SimpleTypeBase';

const enhancerName = 'StringTypeEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;

    namespace.entity.sharedString.forEach((sharedString: SharedString) => {
      const stringType: StringType = {
        xsdMetaEdNameWithExtension: metaEdNameWithExtension(namespace, sharedString.metaEdName),
        xsdSimpleType: NoSimpleType,
        metaEdName: sharedString.metaEdName,
        namespace,
        generatedSimpleType: false,
        documentation: sharedString.documentation,
        documentationInherited: false,
        typeHumanizedName: 'String Type',
        minLength: sharedString.minLength,
        maxLength: sharedString.maxLength,
      };
      edFiXsdEntityRepository.stringType.push(stringType);
    });
  });

  metaEd.propertyIndex.string.forEach((property: StringProperty) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(
      metaEd,
      property.namespace,
    );
    if (edFiXsdEntityRepository == null) return;

    const stringType: StringType = {
      xsdMetaEdNameWithExtension: metaEdNameWithExtension(property.namespace, property.metaEdName),
      xsdSimpleType: NoSimpleType,
      metaEdName: property.metaEdName,
      namespace: property.namespace,
      generatedSimpleType: true,
      documentation: property.documentation,
      documentationInherited: false,
      typeHumanizedName: 'String Type',
      minLength: property.minLength == null ? '' : property.minLength,
      maxLength: property.maxLength == null ? '' : property.maxLength,
    };
    edFiXsdEntityRepository.stringType.push(stringType);
  });

  return {
    enhancerName,
    success: true,
  };
}
