// @flow
import { EntityProperty, EntityPropertySourceMap, defaultEntityPropertyFields } from './EntityProperty';
import type { SourceMap } from './../SourceMap';
import { defaultTopLevelEntity, TopLevelEntity } from './../TopLevelEntity';
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

export function defaultReferentialPropertyFields() {
  return Object.assign({}, defaultEntityPropertyFields(), {
    referencedEntity: defaultTopLevelEntity(),
    mergedProperties: [],
    sourceMap: new ReferentialPropertySourceMap(),
  });
}

export function defaultReferentialProperty(): ReferentialProperty {
  return Object.assign(new ReferentialProperty(), defaultReferentialPropertyFields());
}
