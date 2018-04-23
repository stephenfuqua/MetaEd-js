// @flow
import deepFreeze from 'deep-freeze';
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';
import type { ModelBase } from './ModelBase';

export class AbstractEntitySourceMap extends TopLevelEntitySourceMap {
  isAbstract: ?SourceMap;
}

export class AbstractEntity extends TopLevelEntity {
  isAbstract: boolean;
  sourceMap: TopLevelEntitySourceMap | AbstractEntitySourceMap;
}

export function newAbstractEntity(): AbstractEntity {
  return Object.assign(new AbstractEntity(), newTopLevelEntity(), {
    type: 'domainEntity',
    typeHumanizedName: 'Abstract Entity',
    isAbstract: true,
    sourceMap: new AbstractEntitySourceMap(),
  });
}

export const NoAbstractEntity: AbstractEntity = deepFreeze(
  Object.assign(newAbstractEntity(), {
    metaEdName: 'NoAbstractEntity',
  }),
);

export const asAbstractEntity = (x: ModelBase): AbstractEntity => ((x: any): AbstractEntity);
