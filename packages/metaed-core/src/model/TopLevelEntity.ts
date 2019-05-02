import deepFreeze from 'deep-freeze';
import { EntityProperty } from './property/EntityProperty';
import { ReferentialProperty } from './property/ReferentialProperty';
import { SimpleProperty } from './property/SimpleProperty';
import { ModelBase, ModelBaseSourceMap, newModelBaseSourceMap } from './ModelBase';
import { NoNamespace } from './Namespace';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export interface TopLevelEntitySourceMap extends ModelBaseSourceMap {
  properties: Array<SourceMap>;
  identityProperties: Array<SourceMap>;
  queryableFields: Array<SourceMap>;
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
  properties: Array<EntityProperty>;
  identityProperties: Array<EntityProperty>;
  queryableFields: Array<EntityProperty>;
  typeHumanizedName: string;
  allowPrimaryKeyUpdates: boolean;
  baseEntityName: string;
  baseEntityNamespaceName: string;
  baseEntity: TopLevelEntity | null;
  extendedBy: Array<TopLevelEntity>;
  subclassedBy: Array<TopLevelEntity>;
  outReferences: Array<ReferentialProperty | SimpleProperty>;
  inReferences: Array<ReferentialProperty | SimpleProperty>;
  outReferencePaths: Array<Array<ReferentialProperty | SimpleProperty>>;
  // Map of entities to a list of the out reference paths the entity is in
  outReferenceEntitiesMap: Map<ModelBase, Array<Array<ReferentialProperty | SimpleProperty>>>;
  // Map of entities to a list of the out reference paths the entity is the endpoint of
  outReferenceEntityEndpointsMap: Map<ModelBase, Array<Array<ReferentialProperty | SimpleProperty>>>;
  sourceMap: TopLevelEntitySourceMap;
}

/**
 *
 */
export function newTopLevelEntity(): TopLevelEntity {
  return {
    type: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
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

    data: {},
    config: {},
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
