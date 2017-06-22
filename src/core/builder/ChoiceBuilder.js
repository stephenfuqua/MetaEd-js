// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { choiceFactory } from '../model/Choice';
import { isErrorText } from './BuilderUtility';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { sourceMapFrom } from '../model/SourceMap';

export default class ChoiceBuilder extends TopLevelEntityBuilder {
  enterChoice(context: MetaEdGrammar.ChoiceContext) {
    this.enteringEntity(choiceFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.sourceMap.type = sourceMapFrom(context);
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitChoice(context: MetaEdGrammar.ChoiceContext) {
    this.exitingEntity();
  }

  enterChoiceName(context: MetaEdGrammar.ChoiceNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
  }
}
