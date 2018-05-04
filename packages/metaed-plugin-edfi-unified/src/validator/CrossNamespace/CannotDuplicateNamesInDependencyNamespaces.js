// @flow
import type { ModelType, MetaEdEnvironment, Namespace, ValidationFailure } from 'metaed-core';
import { allEntityModelTypesNoSimpleTypes } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.dependencies.forEach((dependency: Namespace) => {
      allEntityModelTypesNoSimpleTypes.forEach((modelType: ModelType) => {
        const entitiesInModelType: Array<ModelBase> = Array.from(namespace.entity[modelType].values());
        entitiesInModelType.forEach((entityInModelType: ModelBase) => {
          if (dependency.entity[modelType].has(entityInModelType.metaEdName)) {
            failures.push({
              validatorName: 'CannotDuplicateNamesInDependencyNamespace',
              category: 'error',
              message: `${entityInModelType.typeHumanizedName} named ${
                entityInModelType.metaEdName
              } is a duplicate declaration of that name.  Name with that type already exists in project ${
                dependency.projectName
              }.`,
              sourceMap: entityInModelType.sourceMap.type,
              fileMap: null,
            });
          }
        });
      });
    });
  });

  return failures;
}
