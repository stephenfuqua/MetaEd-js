// @flow
import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import SharedSimpleBuilder from './SharedSimpleBuilder';
import { newSharedString } from '../model/SharedString';
import type { SharedString, SharedStringSourceMap } from '../model/SharedString';
import { sourceMapFrom } from '../model/SourceMap';
import { isErrorText } from './BuilderUtility';
import { NoSharedSimple } from '../model/SharedSimple';

export default class SharedStringBuilder extends SharedSimpleBuilder {
  enterSharedString(context: MetaEdGrammar.SharedStringContext) {
    this.enteringSharedSimple(newSharedString);
    if (this.currentSharedSimple !== NoSharedSimple) {
      Object.assign(((this.currentSharedSimple.sourceMap: any): SharedStringSourceMap), {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentSharedSimple.namespaceInfo.sourceMap.type,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitSharedString(context: MetaEdGrammar.SharedStringContext) {
    this.exitingSharedSimple();
  }

  enterSharedStringName(context: MetaEdGrammar.SharedStringNameContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    ((this.currentSharedSimple.sourceMap: any): SharedStringSourceMap).metaEdName = sourceMapFrom(context);
  }

  enterMaxLength(context: MetaEdGrammar.MaxLengthContext) {
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentSharedSimple: any): SharedString).maxLength = context.UNSIGNED_INT().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedStringSourceMap).maxLength = sourceMapFrom(context);
  }

  enterMinLength(context: MetaEdGrammar.MinLengthContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    if (context.exception || context.UNSIGNED_INT() == null || context.UNSIGNED_INT().exception || isErrorText(context.UNSIGNED_INT().getText())) return;
    ((this.currentSharedSimple: any): SharedString).minLength = context.UNSIGNED_INT().getText();
    ((this.currentSharedSimple.sourceMap: any): SharedStringSourceMap).minLength = sourceMapFrom(context);
  }
}
