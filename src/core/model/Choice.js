// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class ChoiceSourceMap extends TopLevelEntitySourceMap {}

export class Choice extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | ChoiceSourceMap;
}

export function choiceFactory(): Choice {
  return Object.assign(new Choice(), defaultTopLevelEntity(), {
    type: 'choice',
    typeHumanizedName: 'Choice',
    sourceMap: new ChoiceSourceMap(),
  });
}

export const asChoice = (x: TopLevelEntity): Choice => ((x: any): Choice);
