// @flow

// 2.x - METAED-711 - ODS-1732
import { asReferentialProperty, asTopLevelEntity, EntityProperty, getEntitiesOfType, versionSatisfies } from 'metaed-core';
import type {
  MetaEdEnvironment,
  ModelBase,
  PluginEnvironment,
  SemVer,
  TopLevelEntity,
  ValidationFailure,
} from 'metaed-core';

const validatorName: string = 'MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported';
const targetTechnologyVersion: SemVer = '2.x';

function propertyCollector(entity: TopLevelEntity, isExtensionEntity: boolean): Array<EntityProperty> {
  if (entity == null) return [];
  const properties: Array<EntityProperty> = [];
  const entities: Array<TopLevelEntity> = [entity];

  while (entities.length > 0) {
    const currentEntity: TopLevelEntity = entities.shift();
    // eslint-disable-next-line no-loop-func
    currentEntity.properties.forEach((property: EntityProperty) => {
      if (
        (asReferentialProperty(property).referencedEntity != null &&
          ['choice', 'inlineCommon'].includes(currentEntity.type)) ||
        ((isExtensionEntity || property.isPartOfIdentity || property.isIdentityRename) &&
          ['association', 'descriptor', 'domainEntity', 'enumeration'].includes(property.type))
      ) {
        entities.push(asReferentialProperty(property).referencedEntity);
        // if were looking at the extension entity we want to bring in all of its properties, not just identities
      } else if (isExtensionEntity || property.isPartOfIdentity) {
        properties.push(property);
      }
    });
    // eslint-disable-next-line no-param-reassign
    isExtensionEntity = false;
  }

  return properties;
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  if (
    !versionSatisfies(
      ((metaEd.plugin.get('edfiOdsApi'): any): PluginEnvironment).targetTechnologyVersion,
      targetTechnologyVersion,
    )
  )
    return [];

  const failures: Array<ValidationFailure> = [];
  getEntitiesOfType(
    metaEd.entity,
    'associationExtension',
    'associationSubclass',
    'domainEntityExtension',
    'domainEntitySubclass',
  )
    .map((entity: ModelBase) => asTopLevelEntity(entity))
    .forEach((entity: TopLevelEntity) => {
      if (!entity.namespaceInfo.isExtension || !entity.baseEntity) return;
      if (entity.baseEntity.namespaceInfo.isExtension) return;

      const baseProperties: Array<EntityProperty> = propertyCollector(entity.baseEntity, false);
      const extensionProperties: Array<EntityProperty> = propertyCollector(entity, true);
      const extensionPropertyNames: Array<string> = extensionProperties.map(x => x.metaEdName);
      const duplicateProperties: Array<EntityProperty> = baseProperties.filter(x =>
        extensionPropertyNames.includes(x.metaEdName),
      );

      duplicateProperties.forEach((property: EntityProperty) => {
        if (!entity.baseEntity) return;
        failures.push({
          validatorName,
          category: 'warning',
          message: `[ODS-1732] ${entity.typeHumanizedName} ${
            entity.metaEdName
          } has a property path that conflicts with property ${property.metaEdName} on core ${
            entity.baseEntity.typeHumanizedName
          } ${
            entity.baseEntity.metaEdName
          }. Merging properties of an extension entity with a core property of the same name is currently unsupported by the ODS/API.`,
          sourceMap: property.sourceMap.type,
          fileMap: null,
        });
      });
    });
  return failures;
}
