// @flow
import deepFreeze from 'deep-freeze';
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';
import type { ModelBase } from './ModelBase';

export class DomainEntitySourceMap extends TopLevelEntitySourceMap {
  isAbstract: ?SourceMap;
}

export class DomainEntity extends TopLevelEntity {
  isAbstract: boolean;
  sourceMap: TopLevelEntitySourceMap | DomainEntitySourceMap;
}

export function newDomainEntity(): DomainEntity {
  return Object.assign(new DomainEntity(), newTopLevelEntity(), {
    type: 'domainEntity',
    typeHumanizedName: 'Domain Entity',
    isAbstract: false,
    sourceMap: new DomainEntitySourceMap(),
  });
}

export const NoDomainEntity: DomainEntity = deepFreeze(
  Object.assign(newDomainEntity(), {
    metaEdName: 'NoDomainEntity',
  }),
);

export const asDomainEntity = (x: ModelBase): DomainEntity => ((x: any): DomainEntity);
