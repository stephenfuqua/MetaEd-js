// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class DomainEntitySubclassSourceMap extends TopLevelEntitySourceMap {}

export class DomainEntitySubclass extends TopLevelEntity {
  sourceMap: DomainEntitySubclassSourceMap;
}

export function domainEntitySubclassFactory(): DomainEntitySubclass {
  return Object.assign(new DomainEntitySubclass(), defaultTopLevelEntity(), {
    type: 'domainEntitySubclass',
    typeGroupHumanizedName: 'domain entity subclass',
    sourceMap: new DomainEntitySubclassSourceMap(),
  });
}
