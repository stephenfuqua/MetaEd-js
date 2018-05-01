// @flow
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { SharedSimpleBuilder } from './SharedSimpleBuilder';
import { newSharedDecimal } from '../model/SharedDecimal';
import type { SharedDecimal, SharedDecimalSourceMap } from '../model/SharedDecimal';
import { sourceMapFrom } from '../model/SourceMap';
import { isErrorText } from './BuilderUtility';
import { NoSharedSimple } from '../model/SharedSimple';

export class SharedDecimalBuilder extends SharedSimpleBuilder {
  enterSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.enteringSharedSimple(newSharedDecimal);
    if (this.currentSharedSimple !== NoSharedSimple) {
      Object.assign(((this.currentSharedSimple: any): SharedDecimal).sourceMap, {
        type: sourceMapFrom(context),
        namespace: this.currentSharedSimple.namespace.sourceMap.type,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedDecimal(context: MetaEdGrammar.SharedDecimalContext) {
    this.exitingSharedSimple();
  }

  enterSharedDecimalName(context: MetaEdGrammar.SharedDecimalNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    ((this.currentSharedSimple: any): SharedDecimal).sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterDecimalPlaces(context: MetaEdGrammar.DecimalPlacesContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (
      context.exception ||
      context.UNSIGNED_INT() == null ||
      context.UNSIGNED_INT().exception ||
      isErrorText(context.UNSIGNED_INT().getText())
    )
      return;
    ((this.currentSharedSimple: any): SharedDecimal).decimalPlaces = context.UNSIGNED_INT().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedDecimalSourceMap).decimalPlaces = sourceMapFrom(context);
  }

  enterTotalDigits(context: MetaEdGrammar.TotalDigitsContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (
      context.exception ||
      context.UNSIGNED_INT() == null ||
      context.UNSIGNED_INT().exception ||
      isErrorText(context.UNSIGNED_INT().getText())
    )
      return;
    ((this.currentSharedSimple: any): SharedDecimal).totalDigits = context.UNSIGNED_INT().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedDecimalSourceMap).totalDigits = sourceMapFrom(context);
  }

  enterMinValueDecimal(context: MetaEdGrammar.MinValueDecimalContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (
      context.exception ||
      context.decimalValue() == null ||
      context.decimalValue().exception ||
      isErrorText(context.decimalValue().getText())
    )
      return;
    ((this.currentSharedSimple: any): SharedDecimal).minValue = context.decimalValue().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedDecimalSourceMap).minValue = sourceMapFrom(context);
  }

  enterMaxValueDecimal(context: MetaEdGrammar.MaxValueDecimalContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (
      context.exception ||
      context.decimalValue() == null ||
      context.decimalValue().exception ||
      isErrorText(context.decimalValue().getText())
    )
      return;
    ((this.currentSharedSimple: any): SharedDecimal).maxValue = context.decimalValue().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedDecimalSourceMap).maxValue = sourceMapFrom(context);
  }
}
