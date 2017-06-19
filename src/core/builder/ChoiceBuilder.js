// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { choiceFactory } from '../model/Choice';
import { isErrorText } from './BuilderUtility';

export default class ChoiceBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterChoice(context: MetaEdGrammar.ChoiceContext) {
    this.enteringEntity(choiceFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitChoice(context: MetaEdGrammar.ChoiceContext) {
    this.exitingEntity();
  }

  enterChoiceName(context: MetaEdGrammar.ChoiceNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
  }
}
