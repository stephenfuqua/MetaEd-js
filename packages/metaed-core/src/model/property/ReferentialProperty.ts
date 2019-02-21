import { EntityProperty, EntityPropertySourceMap } from './EntityProperty';
import { newEntityPropertySourceMap, newEntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { TopLevelEntity } from '../TopLevelEntity';
import { NoTopLevelEntity } from '../TopLevelEntity';
import { MergeDirective } from './MergeDirective';

export interface ReferentialPropertySourceMap extends EntityPropertySourceMap {
  referencedEntity: SourceMap;
  mergeDirectives: Array<SourceMap>;
}

/**
 *
 */
export function newReferentialPropertySourceMap(): ReferentialPropertySourceMap {
  return {
    ...newEntityPropertySourceMap(),
    referencedEntity: NoSourceMap,
    mergeDirectives: [],
  };
}

export interface ReferentialProperty extends EntityProperty {
  sourceMap: ReferentialPropertySourceMap;
  referencedEntity: TopLevelEntity;
  mergeDirectives: Array<MergeDirective>;
}

/**
 *
 */
export function newReferentialProperty(): ReferentialProperty {
  return {
    ...newEntityProperty(),
    referencedEntity: NoTopLevelEntity,
    mergeDirectives: [],
    sourceMap: newReferentialPropertySourceMap(),
  };
}

/**
 *
 */
export const asReferentialProperty = (x: EntityProperty): ReferentialProperty => x as ReferentialProperty;
