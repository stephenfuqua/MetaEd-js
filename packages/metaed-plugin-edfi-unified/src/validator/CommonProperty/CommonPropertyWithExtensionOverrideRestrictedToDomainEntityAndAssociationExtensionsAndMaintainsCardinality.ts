import {
  CommonPropertySourceMap,
  EntityProperty,
  TopLevelEntity,
  MetaEdEnvironment,
  ModelType,
  ValidationFailure,
  Namespace,
} from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const validEntityTypes: ModelType[] = ['domainEntityExtension', 'associationExtension'];

function cardinalitiesMatch(originalProperty: EntityProperty, overrideProperty: EntityProperty): boolean {
  return (
    (originalProperty.isRequired && overrideProperty.isRequired) ||
    (originalProperty.isOptional && overrideProperty.isOptional) ||
    (originalProperty.isRequiredCollection && overrideProperty.isRequiredCollection) ||
    (originalProperty.isOptionalCollection && overrideProperty.isOptionalCollection)
  );
}

function parentEntityProperty(namespaces: Array<Namespace>, overrideProperty: EntityProperty): EntityProperty | undefined {
  if (!validEntityTypes.includes(overrideProperty.parentEntity.type)) return undefined;
  // parent type is base type being extended - sketchy string manipulation here
  const parentType: ModelType = overrideProperty.parentEntity.type.replace('Extension', '') as ModelType;
  const parentTypeSubclassOption: ModelType = `${parentType}Subclass` as ModelType;
  let parentEntity: TopLevelEntity | null = getEntityForNamespaces(
    overrideProperty.parentEntityName,
    namespaces,
    parentTypeSubclassOption,
  ) as TopLevelEntity | null;

  if (parentEntity == null) {
    parentEntity = getEntityForNamespaces(
      overrideProperty.parentEntityName,
      namespaces,
      parentType,
    ) as TopLevelEntity | null;
    if (parentEntity == null) return undefined;
  }

  return parentEntity.properties.find(
    property => property.metaEdName === overrideProperty.metaEdName && property.type === overrideProperty.type,
  );
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.common.forEach(common => {
    if (!common.isExtensionOverride) return;
    const parentProperty: EntityProperty | undefined = parentEntityProperty(
      [common.namespace, ...common.namespace.dependencies],
      common,
    );
    if (parentProperty == null) {
      failures.push({
        validatorName:
          'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
        category: 'error',
        message: `'common extension' is invalid for property ${common.metaEdName} on ${
          common.parentEntity.typeHumanizedName
        } ${common.parentEntity.metaEdName}. 'common extension' is only valid for referencing Common extensions.`,
        sourceMap: (common.sourceMap as CommonPropertySourceMap).isExtensionOverride,
        fileMap: null,
      });
    } else if (!cardinalitiesMatch(parentProperty, common)) {
      failures.push({
        validatorName:
          'CommonPropertyWithExtensionOverrideRestrictedToDomainEntityAndAssociationExtensionsAndMaintainsCardinality',
        category: 'error',
        message: `'common extension' is invalid for property ${common.metaEdName} on ${
          common.parentEntity.typeHumanizedName
        } ${common.parentEntity.metaEdName}. 'common extension' must maintain original cardinality.`,
        sourceMap: (common.sourceMap as CommonPropertySourceMap).isExtensionOverride,
        fileMap: null,
      });
    }
  });
  return failures;
}
