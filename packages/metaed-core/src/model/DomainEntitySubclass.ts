import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type DomainEntitySubclassSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newDomainEntitySubclassSourceMap(): DomainEntitySubclassSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface DomainEntitySubclass extends TopLevelEntity {
  sourceMap: DomainEntitySubclassSourceMap;
}

/**
 *
 */
export function newDomainEntitySubclass(): DomainEntitySubclass {
  return {
    ...newTopLevelEntity(),
    type: 'domainEntitySubclass',
    typeHumanizedName: 'Domain Entity Subclass',
    sourceMap: newDomainEntitySubclassSourceMap(),
  };
}

/**
 *
 */
export const asDomainEntitySubclass = (x: ModelBase): DomainEntitySubclass => x as DomainEntitySubclass;
