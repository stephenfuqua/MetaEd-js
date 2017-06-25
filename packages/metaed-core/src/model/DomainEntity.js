// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';
import type { ModelBase } from './ModelBase';

export class DomainEntitySourceMap extends TopLevelEntitySourceMap {
  isAbstract: ?SourceMap;
}

export class DomainEntity extends TopLevelEntity {
  isAbstract: boolean;
  sourceMap: TopLevelEntitySourceMap | DomainEntitySourceMap;
}

export function domainEntityFactory(): DomainEntity {
  return Object.assign(new DomainEntity(), defaultTopLevelEntity(), {
    type: 'domainEntity',
    typeHumanizedName: 'Domain Entity',
    isAbstract: false,
    sourceMap: new DomainEntitySourceMap(),
  });
}

export const NoDomainEntity: DomainEntity = Object.assign(domainEntityFactory(), {
  metaEdName: 'NoDomainEntity',
});

export const asDomainEntity = (x: ModelBase): DomainEntity => ((x: any): DomainEntity);
