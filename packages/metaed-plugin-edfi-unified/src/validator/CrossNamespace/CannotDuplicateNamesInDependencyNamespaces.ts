import { ModelType, MetaEdEnvironment, Namespace, ValidationFailure, ModelBase, TopLevelEntity } from 'metaed-core';
import { allEntityModelTypesNoSimpleTypes, asTopLevelEntity } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.dependencies.forEach((dependency: Namespace) => {
      allEntityModelTypesNoSimpleTypes.forEach((modelType: ModelType) => {
        const entitiesInModelType: Array<ModelBase> = Array.from(namespace.entity[modelType].values());
        entitiesInModelType.forEach((entityInModelType: ModelBase) => {
          if (dependency.entity[modelType].has(entityInModelType.metaEdName)) {
            const entityWithDuplicateName: TopLevelEntity = asTopLevelEntity(entityInModelType);
            failures.push({
              validatorName: 'CannotDuplicateNamesInDependencyNamespace',
              category: 'error',
              message: `${entityWithDuplicateName.typeHumanizedName} named ${
                entityWithDuplicateName.metaEdName
              } is a duplicate declaration of that name.  Name with that type already exists in project ${
                dependency.projectName
              }.`,
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
