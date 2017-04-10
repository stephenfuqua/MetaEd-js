// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { commonFactory, inlineCommonFactory } from '../model/Common';

export default class CommonBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterCommon(context: MetaEdGrammar.CommonContext) {
    this.enteringEntity(commonFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitCommon(context: MetaEdGrammar.CommonContext) {
    this.exitingEntity();
  }

  enterCommonName(context: MetaEdGrammar.CommonNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
  }

  // eslint-disable-next-line no-unused-vars
  enterInlineCommon(context: MetaEdGrammar.InlineCommonContext) {
    this.enteringEntity(inlineCommonFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitInlineCommon(context: MetaEdGrammar.InlineCommonContext) {
    this.exitingEntity();
  }

  enterInlineCommonName(context: MetaEdGrammar.InlineCommonNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
  }
}
