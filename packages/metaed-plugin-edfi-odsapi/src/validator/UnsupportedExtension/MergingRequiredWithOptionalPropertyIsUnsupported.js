// @flow

// 2.x - METAED-695 - ODS-1177
import { asTopLevelEntity, EntityProperty, getAllTopLevelEntities, versionSatisfies } from 'metaed-core';
import type {
  MetaEdEnvironment,
  ModelBase,
  PluginEnvironment,
  SemVer,
  TopLevelEntity,
  ValidationFailure,
} from 'metaed-core';
import { collectSingleEntity, propertyCollector } from '../ValidatorShared/PropertyCollector';

const validatorName: string = 'MergingRequiredWithOptionalPropertyIsUnsupported';
const targetTechnologyVersion: SemVer = '2.x';

function isTargetTechnologyVersion(metaEd: MetaEdEnvironment): boolean {
  return versionSatisfies(
    ((metaEd.plugin.get('edfiOdsApi'): any): PluginEnvironment).targetTechnologyVersion,
    targetTechnologyVersion,
  );
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  if (!isTargetTechnologyVersion(metaEd)) return failures;

  getAllTopLevelEntities(metaEd.entity)
    .map((entity: ModelBase) => asTopLevelEntity(entity))
    .forEach((entity: TopLevelEntity) => {
      const result: {
        referencedEntities: Array<{
          withContext: string,
          isOptional: boolean,
          entity: TopLevelEntity,
        }>,
        properties: Array<{
          withContext: string,
          isOptional: boolean,
          property: EntityProperty,
        }>,
      } = collectSingleEntity(
        entity,
        true,
        (referencedEntity, property) => ({
          withContext: property.withContext,
          isOptional: property.isOptional,
          entity: asTopLevelEntity(referencedEntity),
        }),
        (referencedEntity, property) => ({
          withContext: property.withContext,
          isOptional: property.isOptional,
          property,
        }),
      );

      const optionalProperties: Array<{ withContext: string, isOptional: boolean, property: EntityProperty }> = [];
      const requiredProperties: Array<{ withContext: string, isOptional: boolean, property: EntityProperty }> = [];

      requiredProperties.push(...result.properties.filter(property => !property.isOptional));
      optionalProperties.push(...result.properties.filter(property => property.isOptional));
      result.referencedEntities.forEach(referencedEntity => {
        if (referencedEntity.isOptional)
          optionalProperties.push(
            ...propertyCollector(referencedEntity.entity).map(property => ({
              withContext: referencedEntity.withContext,
              isOptional: referencedEntity.isOptional,
              property,
            })),
          );
        else {
          requiredProperties.push(
            ...propertyCollector(referencedEntity.entity).map(property => ({
              withContext: referencedEntity.withContext,
              isOptional: referencedEntity.isOptional,
              property,
            })),
          );
        }
      });

      const requiredPropertiesNames: Array<string> = requiredProperties.map(
        x => x.withContext + x.property.withContext + x.property.metaEdName,
      );
      const duplicateProperties: Array<{
        withContext: string,
        isOptional: boolean,
        property: EntityProperty,
      }> = optionalProperties.filter(x =>
        requiredPropertiesNames.includes(x.withContext + x.property.withContext + x.property.metaEdName),
      );

      duplicateProperties.forEach((duplicate: { withContext: string, isOptional: boolean, property: EntityProperty }) => {
        failures.push({
          validatorName,
          category: 'warning',
          message: `[ODS-1177] ${entity.typeHumanizedName} ${
            entity.metaEdName
          } has both a required and optional property path to property ${duplicate.withContext +
            duplicate.property
              .metaEdName}. Merging required properties with optional properties of the same name is currently unsupported by the ODS/API.`,
          sourceMap: duplicate.property.sourceMap.type,
          fileMap: null,
        });
      });
    });

  return failures;
}
