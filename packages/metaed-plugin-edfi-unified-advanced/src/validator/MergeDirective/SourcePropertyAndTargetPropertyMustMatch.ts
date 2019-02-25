import { EntityProperty, MetaEdEnvironment, PropertyType, ValidationFailure, ModelBase } from 'metaed-core';
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
} from './FindReferencedProperty';

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
    if (referentialProperty.mergeDirectives.length === 0) return;
    const { namespace } = referentialProperty;
    referentialProperty.mergeDirectives.forEach(mergeDirective => {
      const sourceProperty: EntityProperty | null = findReferencedProperty(
        namespace,
        referentialProperty.parentEntity,
        mergeDirective.sourcePropertyPathStrings,
        matchAllButFirstAsIdentityProperties(),
      );
      const targetProperty: EntityProperty | null = findReferencedProperty(
        namespace,
        referentialProperty.parentEntity,
        mergeDirective.targetPropertyPathStrings,
        matchAllIdentityReferenceProperties(),
      );

      if (!sourceProperty || !targetProperty) return;

      if (sourceProperty && targetProperty) {
        if (sourceProperty.type === targetProperty.type) {
          if (sourceProperty.metaEdName === targetProperty.metaEdName) return;

          if (
            referenceTypes.includes(asModelType(sourceProperty.type)) &&
            referenceTypes.includes(asModelType(targetProperty.type))
          ) {
            const mergeBaseEntity: Array<ModelBase> = getReferencedEntities(
              namespace,
              sourceProperty.metaEdName,
              sourceProperty.referencedNamespaceName,
              sourceProperty.type,
            );
            const targetBaseEntity: Array<ModelBase> = getReferencedEntities(
              namespace,
              targetProperty.metaEdName,
              targetProperty.referencedNamespaceName,
              targetProperty.type,
            );

            if (mergeBaseEntity[0] && asTopLevelEntity(mergeBaseEntity[0]).baseEntityName === targetProperty.metaEdName)
              return;
            if (targetBaseEntity[0] && asTopLevelEntity(targetBaseEntity[0]).baseEntityName === sourceProperty.metaEdName)
              return;
          }
        }
      }

      failures.push({
        validatorName: 'SourcePropertyAndTargetPropertyMustMatch',
        category: 'error',
        message: `The merge paths '${mergeDirective.sourcePropertyPathStrings.join(
          '.',
        )}' and '${mergeDirective.targetPropertyPathStrings.join(
          '.',
        )}' do not correspond to the same entity name and/or type.`,
        sourceMap: mergeDirective.sourceMap.sourcePropertyPathStrings,
        fileMap: null,
      });
    });
  });

  return failures;
}
