// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import { EnumerationItem } from './EnumerationItem';
import type { SourceMap } from './SourceMap';

export class EnumerationSourceMap extends TopLevelEntitySourceMap {
  enumerationItems: ?Array<SourceMap>;
}

export class Enumeration extends TopLevelEntity {
  enumerationItems: Array<EnumerationItem>;
  sourceMap: EnumerationSourceMap;
}

export function enumerationFactory(): Enumeration {
  return Object.assign(new Enumeration(), defaultTopLevelEntity(), {
    type: 'enumeration',
    typeGroupHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export class SchoolYearEnumeration extends Enumeration {}

export function schoolYearEnumerationFactory(): SchoolYearEnumeration {
  return Object.assign(new SchoolYearEnumeration(), defaultTopLevelEntity(), {
    type: 'schoolYearEnumeration',
    typeGroupHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export class MapTypeEnumeration extends Enumeration {}

export function mapTypeEnumerationFactory(): MapTypeEnumeration {
  return Object.assign(new MapTypeEnumeration(), defaultTopLevelEntity(), {
    type: 'mapTypeEnumeration',
    typeGroupHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}
