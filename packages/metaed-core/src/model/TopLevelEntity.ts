import deepFreeze from 'deep-freeze';
import { EntityProperty } from './property/EntityProperty';
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
  outReferences: Array<EntityProperty>;
  inReferences: Array<EntityProperty>;
  outReferencePaths: Array<Array<EntityProperty>>;
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
