// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class ChoiceSourceMap extends TopLevelEntitySourceMap {}

export class Choice extends TopLevelEntity {
  sourceMap: ChoiceSourceMap;
}

export function choiceFactory(): Choice {
  return Object.assign(new Choice(), defaultTopLevelEntity(), {
    type: 'choice',
    typeGroupHumanizedName: 'choice',
    sourceMap: new ChoiceSourceMap(),
  });
}
