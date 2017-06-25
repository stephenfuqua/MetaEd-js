// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class DomainEntitySubclassSourceMap extends TopLevelEntitySourceMap {}

export class DomainEntitySubclass extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | DomainEntitySubclassSourceMap;
}

export function domainEntitySubclassFactory(): DomainEntitySubclass {
  return Object.assign(new DomainEntitySubclass(), defaultTopLevelEntity(), {
    type: 'domainEntitySubclass',
    typeHumanizedName: 'Domain Entity Subclass',
    sourceMap: new DomainEntitySubclassSourceMap(),
  });
}

export const asDomainEntitySubclass = (x: ModelBase): DomainEntitySubclass => ((x: any): DomainEntitySubclass);
