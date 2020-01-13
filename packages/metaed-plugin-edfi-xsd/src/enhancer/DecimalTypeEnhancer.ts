import { MetaEdEnvironment, EnhancerResult, Namespace, SharedDecimal, DecimalProperty } from 'metaed-core';
import { edfiXsdRepositoryForNamespace } from './EnhancerHelper';
import { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import { DecimalType } from '../model/DecimalType';
import { NoSimpleType } from '../model/schema/SimpleType';
import { metaEdNameWithExtension } from '../model/SimpleTypeBase';

const enhancerName = 'DecimalTypeEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) return;

    namespace.entity.sharedDecimal.forEach((sharedDecimal: SharedDecimal) => {
      const decimalType: DecimalType = {
        xsdMetaEdNameWithExtension: metaEdNameWithExtension(namespace, sharedDecimal.metaEdName),
        xsdSimpleType: NoSimpleType,
        metaEdName: sharedDecimal.metaEdName,
        namespace,
        generatedSimpleType: false,
        documentation: sharedDecimal.documentation,
        documentationInherited: false,
        typeHumanizedName: 'Decimal Type',
        totalDigits: sharedDecimal.totalDigits,
        decimalPlaces: sharedDecimal.decimalPlaces,
        minValue: sharedDecimal.minValue,
        maxValue: sharedDecimal.maxValue,
      };
      edFiXsdEntityRepository.decimalType.push(decimalType);
    });
  });

  metaEd.propertyIndex.decimal.forEach((property: DecimalProperty) => {
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(
      metaEd,
      property.namespace,
    );
    if (edFiXsdEntityRepository == null) return;

    const decimalType: DecimalType = {
      xsdMetaEdNameWithExtension: metaEdNameWithExtension(property.namespace, property.metaEdName),
      xsdSimpleType: NoSimpleType,
      metaEdName: property.metaEdName,
      namespace: property.namespace,
      generatedSimpleType: true,
      documentation: property.documentation,
      documentationInherited: false,
      typeHumanizedName: 'Decimal Type',
      totalDigits: property.totalDigits,
      decimalPlaces: property.decimalPlaces,
      minValue: property.minValue == null ? '' : property.minValue,
      maxValue: property.maxValue == null ? '' : property.maxValue,
    };
    edFiXsdEntityRepository.decimalType.push(decimalType);
  });

  return {
    enhancerName,
    success: true,
  };
}
