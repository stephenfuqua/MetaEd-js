import {
  EnhancerResult,
  MetaEdEnvironment,
  getAllEntitiesOfType,
  getAllTopLevelEntitiesForNamespaces,
  EntityProperty,
  ModelBase,
  SharedSimple,
} from 'metaed-core';

const enhancerName = 'OutReferencePathEnhancer';

function buildUpPaths(inReferences: Array<EntityProperty>, pathSoFar: Array<EntityProperty>, visitList: Array<ModelBase>) {
  inReferences.forEach(inReference => {
    // avoid cycles
    if (visitList.includes(inReference.parentEntity)) return;

    // prepend to path
    const outReferencePath = [inReference, ...pathSoFar];
    inReference.parentEntity.outReferencePaths.push(outReferencePath);
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
