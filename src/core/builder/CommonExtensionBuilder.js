// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { commonExtensionFactory } from '../model/CommonExtension';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { sourceMapFrom } from '../model/SourceMap';

export default class CommonExtensionBuilder extends TopLevelEntityBuilder {
  enterCommonExtension(context: MetaEdGrammar.CommonExtensionContext) {
    this.enteringEntity(commonExtensionFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.sourceMap.type = sourceMapFrom(context);
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitCommonExtension(context: MetaEdGrammar.CommonExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
    this.currentTopLevelEntity.baseEntityName = extendeeName;
    this.currentTopLevelEntity.sourceMap.baseEntityName = sourceMapFrom(context);
  }
}
