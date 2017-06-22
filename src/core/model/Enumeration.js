// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import { EnumerationItem } from './EnumerationItem';
import type { SourceMap } from './SourceMap';

export class EnumerationSourceMap extends TopLevelEntitySourceMap {
  enumerationItems: Array<SourceMap>;

  constructor() {
    super();
    this.enumerationItems = [];
  }
}

export class Enumeration extends TopLevelEntity {
  enumerationItems: Array<EnumerationItem>;
  sourceMap: TopLevelEntitySourceMap | EnumerationSourceMap;
}

export function enumerationFactory(): Enumeration {
  return Object.assign(new Enumeration(), defaultTopLevelEntity(), {
    type: 'enumeration',
    typeGroupHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}
