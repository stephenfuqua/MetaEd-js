// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import SharedSimpleBuilder from './SharedSimpleBuilder';
import { sharedStringFactory } from '../model/SharedString';
import type { SharedString } from '../model/SharedString';
import { isErrorText } from './BuilderUtility';
import { NoSharedSimple } from '../model/SharedSimple';

export default class SharedStringBuilder extends SharedSimpleBuilder {
  // eslint-disable-next-line no-unused-vars
  enterSharedString(context: MetaEdGrammar.SharedStringContext) {
    this.enteringSharedSimple(sharedStringFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedString(context: MetaEdGrammar.SharedStringContext) {
    this.exitingSharedSimple();
  }

  enterSharedStringName(context: MetaEdGrammar.SharedStringNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
  }

  enterMaxLength(context: MetaEdGrammar.MaxLengthContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentSharedSimple: any): SharedString).maxLength = context.UNSIGNED_INT().getText();
  }

  enterMinLength(context: MetaEdGrammar.MinLengthContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentSharedSimple: any): SharedString).minLength = context.UNSIGNED_INT().getText();
  }
}
