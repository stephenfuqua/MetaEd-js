import deepFreeze from 'deep-freeze';
import { EntityProperty } from './property/EntityProperty';
import { ReferentialProperty } from './property/ReferentialProperty';
import { SimpleProperty } from './property/SimpleProperty';
import { ModelBase, ModelBaseSourceMap, newModelBaseSourceMap, newModelBase } from './ModelBase';
import { NoNamespace } from './Namespace';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export interface TopLevelEntitySourceMap extends ModelBaseSourceMap {
  properties: SourceMap[];
  identityProperties: SourceMap[];
  queryableFields: SourceMap[];
  allowPrimaryKeyUpdates: SourceMap;
  baseEntityName: SourceMap;
  baseEntityNamespaceName: SourceMap;
  baseEntity: SourceMap;
}

/**
 *
 */
export function newTopLevelEntitySourceMap() {
  return {
    ...newModelBaseSourceMap(),
    properties: [],
    identityProperties: [],
    queryableFields: [],
    allowPrimaryKeyUpdates: NoSourceMap,
    baseEntityName: NoSourceMap,
    baseEntityNamespaceName: NoSourceMap,
    baseEntity: NoSourceMap,
  };
}

export interface TopLevelEntity extends ModelBase {
  properties: EntityProperty[];
  identityProperties: EntityProperty[];
  queryableFields: EntityProperty[];
  typeHumanizedName: string;
  allowPrimaryKeyUpdates: boolean;
  baseEntityName: string;
  baseEntityNamespaceName: string;
  baseEntity: TopLevelEntity | null;
  extendedBy: TopLevelEntity[];
  subclassedBy: TopLevelEntity[];
  outReferences: (ReferentialProperty | SimpleProperty)[];
  inReferences: (ReferentialProperty | SimpleProperty)[];
  outReferencePaths: (ReferentialProperty | SimpleProperty)[][];
  // Map of entities to a list of the out reference paths the entity is in
  outReferenceEntitiesMap: Map<ModelBase, (ReferentialProperty | SimpleProperty)[][]>;
  // Map of entities to a list of the out reference paths the entity is the endpoint of
  outReferenceEntityEndpointsMap: Map<ModelBase, (ReferentialProperty | SimpleProperty)[][]>;
  sourceMap: TopLevelEntitySourceMap;
}

/**
 *
 */
export function newTopLevelEntity(): TopLevelEntity {
  return {
    ...newModelBase(),
    namespace: NoNamespace,

    properties: [],
    identityProperties: [],
    queryableFields: [],
    typeHumanizedName: '',

    allowPrimaryKeyUpdates: false,
    baseEntityName: '',
    baseEntityNamespaceName: '',
    baseEntity: null,
    extendedBy: [],
    subclassedBy: [],
    outReferences: [],
    inReferences: [],
    outReferencePaths: [],
    outReferenceEntitiesMap: new Map(),
    outReferenceEntityEndpointsMap: new Map(),
    sourceMap: newTopLevelEntitySourceMap(),
  };
}

/**
 *
 */
export const NoTopLevelEntity: TopLevelEntity = deepFreeze({
  ...newTopLevelEntity(),
  metaEdName: 'NoTopLevelEntity',
});

/**
 *
 */
export const asTopLevelEntity = (x: ModelBase): TopLevelEntity => x as TopLevelEntity;
