// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';

export class DescriptorPropertySourceMap extends ReferentialPropertySourceMap {}

export class DescriptorProperty extends ReferentialProperty {
  sourceMap: DescriptorPropertySourceMap;
}

export function descriptorPropertyFactory(): DescriptorProperty {
  return Object.assign(new DescriptorProperty(), defaultReferentialProperty(), {
    type: 'descriptor',
    sourceMap: new DescriptorPropertySourceMap(),
  });
}
