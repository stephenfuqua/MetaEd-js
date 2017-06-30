// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

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

export const asDescriptorProperty = (x: EntityProperty): DescriptorProperty => ((x: any): DescriptorProperty);
