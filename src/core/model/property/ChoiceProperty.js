// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';

export class ChoicePropertySourceMap extends ReferentialPropertySourceMap {}

export class ChoiceProperty extends ReferentialProperty {
  sourceMap: ChoicePropertySourceMap;
}

export function choicePropertyFactory(): ChoiceProperty {
  return Object.assign(new ChoiceProperty(), defaultReferentialProperty(), {
    type: 'choice',
    sourceMap: new ChoicePropertySourceMap(),
  });
}
