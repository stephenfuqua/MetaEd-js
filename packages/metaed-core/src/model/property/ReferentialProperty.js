// @flow
import { EntityProperty, EntityPropertySourceMap, newEntityPropertyFields } from './EntityProperty';
import type { SourceMap } from './../SourceMap';
import { newTopLevelEntity, TopLevelEntity } from './../TopLevelEntity';
import { MergedProperty } from './MergedProperty';

export class ReferentialPropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: ?SourceMap;
  mergedProperties: Array<SourceMap>;

  constructor() {
    super();
    this.mergedProperties = [];
  }
}

export class ReferentialProperty extends EntityProperty {
  referencedEntity: TopLevelEntity;
  mergedProperties: Array<MergedProperty>;
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap;
}

export function newReferentialPropertyFields() {
  return Object.assign({}, newEntityPropertyFields(), {
    referencedEntity: newTopLevelEntity(),
    mergedProperties: [],
    sourceMap: new ReferentialPropertySourceMap(),
  });
}

export function newReferentialProperty(): ReferentialProperty {
  return Object.assign(new ReferentialProperty(), newReferentialPropertyFields());
}
