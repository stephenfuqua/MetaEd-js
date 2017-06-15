// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';

export class DomainEntityPropertySourceMap extends ReferentialPropertySourceMap {
  isWeak: ?SourceMap;
}

export class DomainEntityProperty extends ReferentialProperty {
  isWeak: boolean;
  sourceMap: DomainEntityPropertySourceMap;
}

export function domainEntityPropertyFactory(): DomainEntityProperty {
  return Object.assign(new DomainEntityProperty(), defaultReferentialProperty(), {
    type: 'domainEntity',
    isWeak: false,
    sourceMap: new DomainEntityPropertySourceMap(),
  });
}
