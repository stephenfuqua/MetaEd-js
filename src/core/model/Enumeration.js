// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import { EnumerationItem } from './EnumerationItem';
import type { SourceMap } from './ModelBase';

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
    typeGroupHumanizedName: 'enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export class SchoolYearEnumeration extends Enumeration {}

export function schoolYearEnumerationFactory(): SchoolYearEnumeration {
  return Object.assign(new SchoolYearEnumeration(), defaultTopLevelEntity(), {
    type: 'schoolYearEnumeration',
    typeGroupHumanizedName: 'school year enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export class MapTypeEnumeration extends Enumeration {}

export function mapTypeEnumerationFactory(): MapTypeEnumeration {
  return Object.assign(new MapTypeEnumeration(), defaultTopLevelEntity(), {
    type: 'mapTypeEnumeration',
    typeGroupHumanizedName: 'enumeration map type',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}
