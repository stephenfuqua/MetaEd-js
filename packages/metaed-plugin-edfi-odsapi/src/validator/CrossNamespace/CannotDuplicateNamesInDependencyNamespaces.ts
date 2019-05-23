import {
  ModelType,
  MetaEdEnvironment,
  Namespace,
  ValidationFailure,
  ModelBase,
  PluginEnvironment,
  TopLevelEntity,
  SemVer,
  V2Only,
  versionSatisfies,
  allEntityModelTypesNoSimpleTypes,
  asTopLevelEntity,
} from 'metaed-core';

const targetTechnologyVersion: SemVer = V2Only;

function isTargetTechnologyVersion(metaEd: MetaEdEnvironment): boolean {
  return versionSatisfies(
    (metaEd.plugin.get('edfiOdsApi') as PluginEnvironment).targetTechnologyVersion,
    targetTechnologyVersion,
  );
}

export function validate(metaEd: MetaEdEnvironment): ValidationFailure[] {
  const failures: ValidationFailure[] = [];
  if (!isTargetTechnologyVersion(metaEd)) return failures;

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.dependencies.forEach((dependency: Namespace) => {
      allEntityModelTypesNoSimpleTypes.forEach((modelType: ModelType) => {
        const entitiesInModelType: ModelBase[] = Array.from(namespace.entity[modelType].values());
        entitiesInModelType.forEach((entityInModelType: ModelBase) => {
          if (dependency.entity[modelType].has(entityInModelType.metaEdName)) {
            const entityWithDuplicateName: TopLevelEntity = asTopLevelEntity(entityInModelType);
            failures.push({
              validatorName: 'CannotDuplicateNamesInDependencyNamespaces',
              category: 'error',
              message: `${entityWithDuplicateName.typeHumanizedName} named ${
                entityWithDuplicateName.metaEdName
              } is a duplicate declaration of that name. Name already exists in project ${
                dependency.projectName
              }. ODS/API 2.x does not support duplicate names.`,
              sourceMap: entityWithDuplicateName.sourceMap.metaEdName,
              fileMap: null,
            });
          }
        });
      });
    });
  });

  return failures;
}
