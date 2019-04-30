import {
  getAllEntitiesOfType,
  MetaEdEnvironment,
  ValidationFailure,
  TopLevelEntity,
  ReferentialProperty,
  SimpleProperty,
  ModelBase,
  MergeDirective,
} from 'metaed-core';

function allPropertiesAfterTheFirstAreIdentity(outPath: Array<ReferentialProperty | SimpleProperty>): boolean {
  // eslint-disable-next-line no-restricted-syntax
  for (const [index, propertyOnPath] of outPath.entries()) {
    // skip first property
    if (index > 0) {
      if (!propertyOnPath.isPartOfIdentity && !propertyOnPath.isIdentityRename) return false;
    }
  }

  return true;
}

function noroleNameOnFirstProperty(outPath: Array<ReferentialProperty | SimpleProperty>): boolean {
  return outPath[0].roleName === '';
}

function noMergeDirectiveTargetingEntity(entityWithOutPaths: ModelBase) {
  return (outPath: Array<ReferentialProperty | SimpleProperty>) => {
    const initialPropertyMergeDirectives: Array<MergeDirective> | null = (outPath[0] as ReferentialProperty).mergeDirectives;
    if (initialPropertyMergeDirectives == null) return true; // something is wrong, should be ReferentialProperty
    return !initialPropertyMergeDirectives.some(
      mergeDirective =>
        mergeDirective.targetProperty != null &&
        (mergeDirective.targetProperty as ReferentialProperty | SimpleProperty).referencedEntity === entityWithOutPaths,
    );
  };
}

function atLeastOneReferenceAtStartOfPathIsIdentity(
  listOfOutPaths: Array<Array<ReferentialProperty | SimpleProperty>>,
): boolean {
  // eslint-disable-next-line no-restricted-syntax
  for (const outPath of listOfOutPaths) {
    if (outPath.length === 0) return false; // something is wrong
    if (outPath[0].isIdentityRename || outPath[0].isPartOfIdentity) return true;
  }
  return false;
}

function atLeastTwoReferencesAtStartOfPathAreCollections(
  listOfOutPaths: Array<Array<ReferentialProperty | SimpleProperty>>,
): boolean {
  return listOfOutPaths && false; // TODO: *************************************************************** Not Implemented Yet ***************
}

function mergeOutReferenceEntitiesMap(
  baseMap: Map<ModelBase, Array<Array<ReferentialProperty | SimpleProperty>>>,
  targetMap: Map<ModelBase, Array<Array<ReferentialProperty | SimpleProperty>>>,
) {
  baseMap.forEach((listOfOutReferencePathsFromBase, entityAsKey) => {
    if (!targetMap.has(entityAsKey)) {
      targetMap.set(entityAsKey, []);
    }
    listOfOutReferencePathsFromBase.forEach(outReferencePathFromBase => {
      (targetMap.get(entityAsKey) as Array<Array<ReferentialProperty | SimpleProperty>>).push(outReferencePathFromBase);
    });
  });
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  // TODO: limited to direct sourcing from A/DEs and sub/extensions - doesn't look at Commons to traverse back to parent A/DE
  getAllEntitiesOfType(
    metaEd,
    'association',
    'associationExtension',
    'associationSubclass',
    'domainEntity',
    'domainEntityExtension',
    'domainEntitySubclass',
  ).forEach(entity => {
    // combine outReferenceEntitiesMap if this entity has a base
    const outReferenceEntitiesMap: Map<ModelBase, Array<Array<ReferentialProperty | SimpleProperty>>> = new Map(
      (entity as TopLevelEntity).outReferenceEntitiesMap,
    );
    const { baseEntity } = entity as TopLevelEntity;
    if (baseEntity !== null) {
      mergeOutReferenceEntitiesMap(baseEntity.outReferenceEntitiesMap, outReferenceEntitiesMap);
    }

    outReferenceEntitiesMap.forEach((listOfOutPaths, entityWithOutPaths) => {
      // only matters if entity found in multiple paths
      if (listOfOutPaths.length < 2) return;

      // only matters if for the first property in the path,
      //     A) at least one reference is identity or
      //     B) at least two references are a collection
      if (
        !atLeastOneReferenceAtStartOfPathIsIdentity(listOfOutPaths) &&
        !atLeastTwoReferencesAtStartOfPathAreCollections(listOfOutPaths)
      )
        return;

      // only matters for paths where all properties after the first are an identity, and then
      // only matters for paths where role names and/or merge directives don't resolve collision
      const problemOutPaths = [...listOfOutPaths]
        .filter(allPropertiesAfterTheFirstAreIdentity)
        .filter(noroleNameOnFirstProperty)
        .filter(noMergeDirectiveTargetingEntity(entityWithOutPaths));

      const pathStringReducer = (finalString, currentOutPath) =>
        `${finalString} [${currentOutPath.map(p => p.metaEdName).join('.')}]`;

      const problemPathsAsString = problemOutPaths.reduce(pathStringReducer, '');

      problemOutPaths.forEach(outPath => {
        failures.push({
          validatorName: 'OutPathsToSameEntityMustHaveMergeDirectiveOrroleName',
          category: 'error',
          message: `Ambiguous merge paths exist from ${outPath[0].parentEntityName}.${outPath[0].metaEdName} to ${
            entityWithOutPaths.metaEdName
          }. Paths are${problemPathsAsString}.  Either add a merge directive, use 'role name', or change the model.`,
          sourceMap: outPath[0].sourceMap.metaEdName,
          fileMap: null,
        });
      });
    });
  });

  return failures;
}
