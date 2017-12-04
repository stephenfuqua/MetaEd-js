// @flow
import { EntityProperty, EntityPropertySourceMap, newEntityPropertyFields } from './EntityProperty';
import type { SourceMap } from './../SourceMap';
import { TopLevelEntity, NoTopLevelEntity } from './../TopLevelEntity';
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


export function isReferentialProperty(property: EntityProperty) {
  return Object.keys(property).includes('mergedProperties');
}

export function newReferentialPropertyFields() {
  return Object.assign({}, newEntityPropertyFields(), {
    referencedEntity: NoTopLevelEntity,
    mergedProperties: [],
    sourceMap: new ReferentialPropertySourceMap(),
  });
}

export function newReferentialProperty(): ReferentialProperty {
  return Object.assign(new ReferentialProperty(), newReferentialPropertyFields());
}

export const asReferentialProperty = (x: EntityProperty): ReferentialProperty => ((x: any): ReferentialProperty);
