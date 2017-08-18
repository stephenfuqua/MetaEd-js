// @flow
import type { EntityProperty } from './property/EntityProperty';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newNamespaceInfo } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';

export class TopLevelEntitySourceMap extends ModelBaseSourceMap {
  properties: Array<SourceMap>;
  identityProperties: Array<SourceMap>;
  queryableFields: Array<SourceMap>;
  allowPrimaryKeyUpdates: ?SourceMap;
  baseEntityName: ?SourceMap;
  baseEntity: ?SourceMap;

  constructor() {
    super();
    this.properties = [];
    this.identityProperties = [];
    this.queryableFields = [];
  }
}

export class TopLevelEntity extends ModelBase {
  properties: Array<EntityProperty>;
  identityProperties: Array<EntityProperty>;
  queryableFields: Array<EntityProperty>;
  typeHumanizedName: string;
  allowPrimaryKeyUpdates: boolean;
  baseEntityName: string;
  baseEntity: ?TopLevelEntity;
  sourceMap: TopLevelEntitySourceMap;
}

export function newTopLevelEntity(): TopLevelEntity {
  return Object.assign(new TopLevelEntity(), {
    type: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),

    properties: [],
    identityProperties: [],
    queryableFields: [],
    typeHumanizedName: '',

    allowPrimaryKeyUpdates: false,
    baseEntityName: '',
    baseEntity: null,
  });
}

export const NoTopLevelEntity: TopLevelEntity = Object.assign(newTopLevelEntity(), {
  metaEdName: 'NoTopLevelEntity',
});

export const asTopLevelEntity = (x: ModelBase): TopLevelEntity => ((x: any): TopLevelEntity);
