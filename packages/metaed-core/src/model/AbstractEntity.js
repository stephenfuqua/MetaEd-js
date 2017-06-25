// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';
import type { ModelBase } from './ModelBase';

export class AbstractEntitySourceMap extends TopLevelEntitySourceMap {
  isAbstract: ?SourceMap;
}

export class AbstractEntity extends TopLevelEntity {
  isAbstract: boolean;
  sourceMap: TopLevelEntitySourceMap | AbstractEntitySourceMap;
}

export function abstractEntityFactory(): AbstractEntity {
  return Object.assign(new AbstractEntity(), defaultTopLevelEntity(), {
    type: 'domainEntity',
    typeHumanizedName: 'Abstract Entity',
    isAbstract: true,
    sourceMap: new AbstractEntitySourceMap(),
  });
}

export const NoAbstractEntity: AbstractEntity = Object.assign(abstractEntityFactory(), {
  metaEdName: 'NoAbstractEntity',
});

export const asAbstractEntity = (x: ModelBase): AbstractEntity => ((x: any): AbstractEntity);
