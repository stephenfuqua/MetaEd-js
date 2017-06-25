// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { ModelType } from '../../../../../packages/metaed-core/src/model/ModelType';
import type { EntityRepository } from '../../../../../packages/metaed-core/src/model/EntityRepository';
import type { EntityProperty } from '../../../../../packages/metaed-core/src/model/property/EntityProperty';
import { CommonPropertySourceMap } from '../../../../../packages/metaed-core/src/model/property/CommonProperty';

const validEntityTypes: ModelType[] = [
  'domainEntityExtension',
  'associationExtension',
];

function cardinalitiesMatch(originalProperty: EntityProperty, overrideProperty: EntityProperty): boolean {
  return ((originalProperty.isRequired && overrideProperty.isRequired)
    || (originalProperty.isOptional && overrideProperty.isOptional)
    || (originalProperty.isRequiredCollection && overrideProperty.isRequiredCollection)
    || (originalProperty.isOptionalCollection && overrideProperty.isOptionalCollection));
}

function parentEntityProperty(entity: EntityRepository, overrideProperty: EntityProperty): EntityProperty | void {
  if (!validEntityTypes.includes(overrideProperty.parentEntity.type)) return undefined;
  const parentType = overrideProperty.parentEntity.type.replace('Extension', '');
  // $FlowIgnore - allowing parentType to specify the entityRepository Map property
  const parentEntity = entity[parentType].get(overrideProperty.parentEntityName);
  return parentEntity.properties.find(property =>
      property.metaEdName === overrideProperty.metaEdName
      && property.type === overrideProperty.type);
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.common.forEach(common => {
    if (!common.isExtensionOverride) return;
    const parentProperty = parentEntityProperty(metaEd.entity, common);
    if (parentProperty && cardinalitiesMatch(parentProperty, common)) return;
    failures.push({
      validatorName: 'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
      category: 'error',
      message: `'common extension' is invalid for property ${common.metaEdName} on ${common.parentEntity.typeHumanizedName} ${common.parentEntity.metaEdName}. 'common extension' is only valid for referencing Common extensions.`,
      sourceMap: ((common.sourceMap: any): CommonPropertySourceMap).isExtensionOverride,
      fileMap: null,
    });
  });
  return failures;
}
