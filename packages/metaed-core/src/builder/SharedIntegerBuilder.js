// @flow
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { SharedSimpleBuilder } from './SharedSimpleBuilder';
import { newSharedInteger } from '../model/SharedInteger';
import type { SharedInteger, SharedIntegerSourceMap } from '../model/SharedInteger';
import { sourceMapFrom } from '../model/SourceMap';
import { isErrorText } from './BuilderUtility';
import { NoSharedSimple } from '../model/SharedSimple';

export class SharedIntegerBuilder extends SharedSimpleBuilder {
  enterSharedInteger(context: MetaEdGrammar.SharedIntegerContext) {
    this.enteringSharedSimple(newSharedInteger);
    if (this.currentSharedSimple !== NoSharedSimple) {
      Object.assign(((this.currentSharedSimple.sourceMap: any): SharedIntegerSourceMap), {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentSharedSimple.namespaceInfo.sourceMap.type,
      });
    }
  }

  enterSharedShort(context: MetaEdGrammar.SharedShortContext) {
    this.enteringSharedSimple(newSharedInteger);
    if (this.currentSharedSimple !== NoSharedSimple) {
      ((this.currentSharedSimple: any): SharedInteger).isShort = true;
      Object.assign(((this.currentSharedSimple.sourceMap: any): SharedIntegerSourceMap), {
        type: sourceMapFrom(context),
        isShort: sourceMapFrom(context),
        namespaceInfo: this.currentSharedSimple.namespaceInfo.sourceMap.type,
      });
    }
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
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    ((this.currentSharedSimple.sourceMap: any): SharedIntegerSourceMap).metaEdName = sourceMapFrom(context);
  }

  enterSharedShortName(context: MetaEdGrammar.SharedShortNameContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    ((this.currentSharedSimple.sourceMap: any): SharedIntegerSourceMap).metaEdName = sourceMapFrom(context);
  }

  enterMinValue(context: MetaEdGrammar.MinValueContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.signed_int() == null || context.signed_int().exception || isErrorText(context.signed_int().getText())) return;
    ((this.currentSharedSimple: any): SharedInteger).minValue = context.signed_int().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedIntegerSourceMap).minValue = sourceMapFrom(context);
  }

  enterMaxValue(context: MetaEdGrammar.MaxValueContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.signed_int() == null || context.signed_int().exception || isErrorText(context.signed_int().getText())) return;
    ((this.currentSharedSimple: any): SharedInteger).maxValue = context.signed_int().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedIntegerSourceMap).maxValue = sourceMapFrom(context);
  }
}
