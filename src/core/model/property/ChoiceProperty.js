// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import { EntityPropertySourceMap } from './EntityProperty';

export class ChoicePropertySourceMap extends ReferentialPropertySourceMap {}

export class ChoiceProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | ChoicePropertySourceMap;
}

export function choicePropertyFactory(): ChoiceProperty {
  return Object.assign(new ChoiceProperty(), defaultReferentialProperty(), {
    type: 'choice',
    sourceMap: new ChoicePropertySourceMap(),
  });
}
