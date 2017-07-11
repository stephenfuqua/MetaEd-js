// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class DescriptorPropertySourceMap extends ReferentialPropertySourceMap {}

export class DescriptorProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | DescriptorPropertySourceMap;
}

export function newDescriptorProperty(): DescriptorProperty {
  return Object.assign(new DescriptorProperty(), newReferentialProperty(), {
    type: 'descriptor',
    typeHumanizedName: 'Descriptor Property',
    sourceMap: new DescriptorPropertySourceMap(),
  });
}

export const asDescriptorProperty = (x: EntityProperty): DescriptorProperty => ((x: any): DescriptorProperty);
