// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

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

export const asDomainEntitySubclass = (x: TopLevelEntity): DomainEntitySubclass => ((x: any): DomainEntitySubclass);
