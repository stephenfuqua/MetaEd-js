import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type DescriptorPropertySourceMap = ReferentialPropertySourceMap;

/**
 *
 */
export function newDescriptorPropertySourceMap(): DescriptorPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
  };
}

export interface DescriptorProperty extends ReferentialProperty {
  sourceMap: DescriptorPropertySourceMap;
}

/**
 *
 */
export function newDescriptorProperty(): DescriptorProperty {
  return {
    ...newReferentialProperty(),
    type: 'descriptor',
    typeHumanizedName: 'Descriptor Property',
    sourceMap: newDescriptorPropertySourceMap(),
  };
}

/**
 *
 */
export const asDescriptorProperty = (x: EntityProperty): DescriptorProperty => x as DescriptorProperty;
