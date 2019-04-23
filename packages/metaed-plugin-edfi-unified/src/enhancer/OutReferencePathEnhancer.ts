import {
  EnhancerResult,
  MetaEdEnvironment,
  getAllEntitiesOfType,
  getAllTopLevelEntitiesForNamespaces,
  ReferentialProperty,
  SimpleProperty,
  ModelBase,
  SharedSimple,
} from 'metaed-core';

const enhancerName = 'OutReferencePathEnhancer';

function addToOutReferenceEntitiesMap(
  outReferenceEntitiesMap: Map<ModelBase, Array<Array<ReferentialProperty | SimpleProperty>>>,
  outReferencePath: Array<ReferentialProperty | SimpleProperty>,
) {
  outReferencePath.forEach(property => {
    if (!outReferenceEntitiesMap.has(property.referencedEntity)) {
      outReferenceEntitiesMap.set(property.referencedEntity, []);
    }
    (outReferenceEntitiesMap.get(property.referencedEntity) as Array<Array<ReferentialProperty | SimpleProperty>>).push(
      outReferencePath,
    );
  });
}

function buildUpPaths(
  inReferences: Array<ReferentialProperty | SimpleProperty>,
  pathSoFar: Array<ReferentialProperty | SimpleProperty>,
  visitList: Array<ModelBase>,
) {
  inReferences.forEach(inReference => {
    // avoid cycles
    if (visitList.includes(inReference.parentEntity)) return;

    // prepend to path
    const outReferencePath = [inReference, ...pathSoFar];
    inReference.parentEntity.outReferencePaths.push(outReferencePath);
    addToOutReferenceEntitiesMap(inReference.parentEntity.outReferenceEntitiesMap, outReferencePath);
    buildUpPaths(inReference.parentEntity.inReferences, outReferencePath, [...visitList, inReference.parentEntity]);
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces([...metaEd.namespace.values()]).forEach(entity => {
    // only leaf entities
    if (entity.outReferences.length > 0) return;
    buildUpPaths(entity.inReferences, [], []);
  });

  getAllEntitiesOfType(metaEd, 'sharedInteger', 'sharedDecimal', 'sharedString').forEach(entity => {
    const sharedSimpleEntity = entity as SharedSimple;
    buildUpPaths(sharedSimpleEntity.inReferences, [], []);
  });

  return {
    enhancerName,
    success: true,
  };
}
