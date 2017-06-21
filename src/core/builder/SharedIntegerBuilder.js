// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import SharedSimpleBuilder from './SharedSimpleBuilder';
import { sharedIntegerFactory } from '../model/SharedInteger';
import type { SharedInteger } from '../model/SharedInteger';
import { isErrorText } from './BuilderUtility';
import { NoSharedSimple } from '../model/SharedSimple';

export default class SharedIntegerBuilder extends SharedSimpleBuilder {
  // eslint-disable-next-line no-unused-vars
  enterSharedInteger(context: MetaEdGrammar.SharedIntegerContext) {
    this.enteringSharedSimple(sharedIntegerFactory);
  }

  // eslint-disable-next-line no-unused-vars
  enterSharedShort(context: MetaEdGrammar.SharedShortContext) {
    this.enteringSharedSimple(sharedIntegerFactory);
    ((this.currentSharedSimple: any): SharedInteger).isShort = true;
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedInteger(context: MetaEdGrammar.SharedIntegerContext) {
    this.exitingSharedSimple();
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedShort(context: MetaEdGrammar.SharedShortContext) {
    this.exitingSharedSimple();
  }

  enterSharedIntegerName(context: MetaEdGrammar.SharedIntegerNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
  }

  enterSharedShortName(context: MetaEdGrammar.SharedShortNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
  }

  enterMinValue(context: MetaEdGrammar.MinValueContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.signed_int() == null || context.signed_int().exception || isErrorText(context.signed_int().getText())) return;
    ((this.currentSharedSimple: any): SharedInteger).minValue = context.signed_int().getText();
  }

  enterMaxValue(context: MetaEdGrammar.MaxValueContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.signed_int() == null || context.signed_int().exception || isErrorText(context.signed_int().getText())) return;
    ((this.currentSharedSimple: any): SharedInteger).maxValue = context.signed_int().getText();
  }
}
