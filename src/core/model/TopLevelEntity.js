// @flow
import type { EntityProperty } from './property/EntityProperty';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';

export class TopLevelEntitySourceMap extends ModelBaseSourceMap {
  properties: ?Array<SourceMap>;
  identityProperties: ?Array<SourceMap>;
  queryableFields: ?Array<SourceMap>;
  allowPrimaryKeyUpdates: ?SourceMap;
  baseEntityName: ?SourceMap;
  baseEntity: ?SourceMap;
}

export class TopLevelEntity extends ModelBase {
  properties: Array<EntityProperty>;
  identityProperties: Array<EntityProperty>;
  queryableFields: Array<EntityProperty>;
  typeGroupHumanizedName: string;
  allowPrimaryKeyUpdates: boolean;
  baseEntityName: string;
  baseEntity: ?TopLevelEntity;
}

export function defaultTopLevelEntity(): TopLevelEntity {
  return Object.assign(new TopLevelEntity(), {
    type: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),

    properties: [],
    identityProperties: [],
    queryableFields: [],
    typeGroupHumanizedName: '',

    allowPrimaryKeyUpdates: false,
    baseEntityName: '',
    baseEntity: null,
  });
}

export const NoTopLevelEntity: TopLevelEntity = Object.assign(defaultTopLevelEntity(), {
  metaEdName: 'NoTopLevelEntity',
});
