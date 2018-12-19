import deepFreeze from 'deep-freeze';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { ModelBase } from './ModelBase';

export interface DomainEntitySourceMap extends TopLevelEntitySourceMap {
  isAbstract: SourceMap;
}

/**
 *
 */
export function newDomainEntitySourceMap(): DomainEntitySourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    isAbstract: NoSourceMap,
  };
}

export interface DomainEntity extends TopLevelEntity {
  sourceMap: DomainEntitySourceMap;
  isAbstract: boolean;
}

/**
 *
 */
export function newDomainEntity(): DomainEntity {
  return {
    ...newTopLevelEntity(),
    type: 'domainEntity',
    typeHumanizedName: 'Domain Entity',
    isAbstract: false,
    sourceMap: newDomainEntitySourceMap(),
  };
}

/**
 *
 */
export function newAbstractEntity(): DomainEntity {
  return {
    ...newDomainEntity(),
    typeHumanizedName: 'Abstract Entity',
    isAbstract: true,
  };
}

/**
 *
 */
export const NoDomainEntity: DomainEntity = deepFreeze({
  ...newDomainEntity(),
  metaEdName: 'NoDomainEntity',
});

/**
 *
 */
export const asDomainEntity = (x: ModelBase): DomainEntity => x as DomainEntity;
