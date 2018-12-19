import { EntityProperty, EntityPropertySourceMap } from './EntityProperty';
import { newEntityPropertySourceMap, newEntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { TopLevelEntity } from '../TopLevelEntity';
import { NoTopLevelEntity } from '../TopLevelEntity';
import { MergedProperty } from './MergedProperty';

export interface ReferentialPropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: SourceMap;
  mergedProperties: Array<SourceMap>;
}

/**
 *
 */
export function newReferentialPropertySourceMap(): ReferentialPropertySourceMap {
  return {
    ...newEntityPropertySourceMap(),
    referencedEntity: NoSourceMap,
    mergedProperties: [],
  };
}

export interface ReferentialProperty extends EntityProperty {
  sourceMap: ReferentialPropertySourceMap;
  referencedEntity: TopLevelEntity;
  mergedProperties: Array<MergedProperty>;
}

/**
 *
 */
export function newReferentialProperty(): ReferentialProperty {
  return {
    ...newEntityProperty(),
    referencedEntity: NoTopLevelEntity,
    mergedProperties: [],
    sourceMap: newReferentialPropertySourceMap(),
  };
}

/**
 *
 */
export const asReferentialProperty = (x: EntityProperty): ReferentialProperty => x as ReferentialProperty;
