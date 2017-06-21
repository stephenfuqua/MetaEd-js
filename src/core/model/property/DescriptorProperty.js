// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class DescriptorPropertySourceMap extends ReferentialPropertySourceMap {}

export class DescriptorProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | DescriptorPropertySourceMap;
}

export function descriptorPropertyFactory(): DescriptorProperty {
  return Object.assign(new DescriptorProperty(), defaultReferentialProperty(), {
    type: 'descriptor',
    sourceMap: new DescriptorPropertySourceMap(),
  });
}
