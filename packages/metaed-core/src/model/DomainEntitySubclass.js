// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class DomainEntitySubclassSourceMap extends TopLevelEntitySourceMap {}

export class DomainEntitySubclass extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | DomainEntitySubclassSourceMap;
}

export function newDomainEntitySubclass(): DomainEntitySubclass {
  return Object.assign(new DomainEntitySubclass(), newTopLevelEntity(), {
    type: 'domainEntitySubclass',
    typeHumanizedName: 'Domain Entity Subclass',
    sourceMap: new DomainEntitySubclassSourceMap(),
  });
}

export const asDomainEntitySubclass = (x: ModelBase): DomainEntitySubclass => ((x: any): DomainEntitySubclass);
