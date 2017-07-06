// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class ChoicePropertySourceMap extends ReferentialPropertySourceMap {}

export class ChoiceProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | ChoicePropertySourceMap;
}

export function newChoiceProperty(): ChoiceProperty {
  return Object.assign(new ChoiceProperty(), newReferentialProperty(), {
    type: 'choice',
    sourceMap: new ChoicePropertySourceMap(),
  });
}

export const asChoiceProperty = (x: EntityProperty): ChoiceProperty => ((x: any): ChoiceProperty);
