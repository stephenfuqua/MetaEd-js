import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type ChoicePropertySourceMap = ReferentialPropertySourceMap;

/**
 *
 */
export function newChoicePropertySourceMap(): ChoicePropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
  };
}

export interface ChoiceProperty extends ReferentialProperty {
  sourceMap: ChoicePropertySourceMap;
}

/**
 *
 */
export function newChoiceProperty(): ChoiceProperty {
  return {
    ...newReferentialProperty(),
    type: 'choice',
    typeHumanizedName: 'Choice Property',
    sourceMap: newChoicePropertySourceMap(),
  };
}

/**
 *
 */
export const asChoiceProperty = (x: EntityProperty): ChoiceProperty => x as ChoiceProperty;
