// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class DomainEntityPropertySourceMap extends ReferentialPropertySourceMap {
  isWeak: ?SourceMap;
}

export class DomainEntityProperty extends ReferentialProperty {
  isWeak: boolean;
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | DomainEntityPropertySourceMap;
}

export function domainEntityPropertyFactory(): DomainEntityProperty {
  return Object.assign(new DomainEntityProperty(), defaultReferentialProperty(), {
    type: 'domainEntity',
    isWeak: false,
    sourceMap: new DomainEntityPropertySourceMap(),
  });
}

export const asDomainEntityProperty = (x: EntityProperty): DomainEntityProperty => ((x: any): DomainEntityProperty);
