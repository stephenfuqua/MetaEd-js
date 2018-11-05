// @flow
import type { EntityProperty, MetaEdEnvironment, PropertyType, ValidationFailure, ModelBase, Namespace } from 'metaed-core';
import {
  asReferentialProperty,
  asModelType,
  getPropertiesOfType,
  asTopLevelEntity,
  isReferentialProperty,
} from 'metaed-core';
import {
  findReferencedProperty,
  getReferencedEntities,
  referenceTypes,
  matchAllButFirstAsIdentityProperties,
  matchAllIdentityReferenceProperties,
} from '../ValidatorShared/FindReferencedProperty';

const validPropertyTypes: Array<PropertyType> = [
  'association',
  'choice',
  'common',
  'descriptor',
  'domainEntity',
  'enumeration',
  'inlineCommon',
  'schoolYearEnumeration',
  'sharedDecimal',
  'sharedInteger',
  'sharedShort',
  'sharedString',
];

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  getPropertiesOfType(metaEd.propertyIndex, ...validPropertyTypes).forEach(property => {
    if (!isReferentialProperty(property)) return;
    const referentialProperty = asReferentialProperty(property);
    if (referentialProperty.mergedProperties.length === 0) return;
    const namespaces: Array<Namespace> = [referentialProperty.namespace, ...referentialProperty.namespace.dependencies];
    referentialProperty.mergedProperties.forEach(mergedProperty => {
      const mergeProperty: ?EntityProperty = findReferencedProperty(
        namespaces,
        referentialProperty.parentEntity,
        mergedProperty.mergePropertyPath,
        matchAllButFirstAsIdentityProperties(),
      );
      const targetProperty: ?EntityProperty = findReferencedProperty(
        namespaces,
        referentialProperty.parentEntity,
        mergedProperty.targetPropertyPath,
        matchAllIdentityReferenceProperties(),
      );

      if (!mergeProperty || !targetProperty) return;

      if (mergeProperty && targetProperty) {
        if (mergeProperty.type === targetProperty.type) {
          if (mergeProperty.metaEdName === targetProperty.metaEdName) return;

          if (
            referenceTypes.includes(asModelType(mergeProperty.type)) &&
            referenceTypes.includes(asModelType(targetProperty.type))
          ) {
            const mergeBaseEntity: Array<ModelBase> = getReferencedEntities(
              namespaces,
              mergeProperty.metaEdName,
              mergeProperty.type,
            );
            const targetBaseEntity: Array<ModelBase> = getReferencedEntities(
              namespaces,
              targetProperty.metaEdName,
              targetProperty.type,
            );

            if (mergeBaseEntity[0] && asTopLevelEntity(mergeBaseEntity[0]).baseEntityName === targetProperty.metaEdName)
              return;
            if (targetBaseEntity[0] && asTopLevelEntity(targetBaseEntity[0]).baseEntityName === mergeProperty.metaEdName)
              return;
          }
        }
      }

      failures.push({
        validatorName: 'MergePropertyAndTargetPropertyMustMatch',
        category: 'error',
        message: `The merge paths '${mergedProperty.mergePropertyPath.join(
          '.',
        )}' and '${mergedProperty.targetPropertyPath.join('.')}' do not correspond to the same entity name and/or type.`,
        sourceMap: mergedProperty.sourceMap.mergePropertyPath[0],
        fileMap: null,
      });
    });
  });

  return failures;
}
