// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import SharedSimpleBuilder from './SharedSimpleBuilder';
import { sharedDecimalFactory } from '../model/SharedDecimal';
import type { SharedDecimal } from '../model/SharedDecimal';
import { isErrorText } from './BuilderUtility';
import { NoSharedSimple } from '../model/SharedSimple';

export default class SharedDecimalBuilder extends SharedSimpleBuilder {
  // eslint-disable-next-line no-unused-vars
  enterSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.enteringSharedSimple(sharedDecimalFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.exitingSharedSimple();
  }

  enterSharedDecimalName(context: MetaEdGrammar.SharedDecimalNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
  }

  enterDecimalPlaces(context: MetaEdGrammar.DecimalPlacesContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentSharedSimple: any): SharedDecimal).decimalPlaces = context.UNSIGNED_INT().getText();
  }

  enterTotalDigits(context: MetaEdGrammar.TotalDigitsContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentSharedSimple: any): SharedDecimal).totalDigits = context.UNSIGNED_INT().getText();
  }

  enterMinValueDecimal(context: MetaEdGrammar.MinValueDecimalContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.decimalValue() == null || context.decimalValue().exception || isErrorText(context.decimalValue().getText())) return;
    ((this.currentSharedSimple: any): SharedDecimal).minValue = context.decimalValue().getText();
  }

  enterMaxValueDecimal(context: MetaEdGrammar.MaxValueDecimalContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.decimalValue() == null || context.decimalValue().exception || isErrorText(context.decimalValue().getText())) return;
    ((this.currentSharedSimple: any): SharedDecimal).maxValue = context.decimalValue().getText();
  }
}
