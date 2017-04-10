// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';

export class EnumerationPropertySourceMap extends ReferentialPropertySourceMap {}

export class EnumerationProperty extends ReferentialProperty {
  sourceMap: EnumerationPropertySourceMap;
}

export function enumerationPropertyFactory(): EnumerationProperty {
  return Object.assign(new EnumerationProperty(), defaultReferentialProperty(), {
    type: 'enumeration',
    sourceMap: new EnumerationPropertySourceMap(),
  });
}
