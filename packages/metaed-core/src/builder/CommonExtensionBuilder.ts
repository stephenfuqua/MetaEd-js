import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { TopLevelEntityBuilder } from './TopLevelEntityBuilder';
import { newCommonExtension } from '../model/CommonExtension';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { sourceMapFrom } from '../model/SourceMap';
import { isErrorText } from './BuilderUtility';

/**
 * An ANTLR4 listener that creates CommonExtension entities.
 */
export class CommonExtensionBuilder extends TopLevelEntityBuilder {
  enterCommonExtension(context: MetaEdGrammar.CommonExtensionContext) {
    this.enteringEntity(newCommonExtension);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.sourceMap.type = sourceMapFrom(context);
    }
  }

  // @ts-ignore
  exitCommonExtension(context: MetaEdGrammar.CommonExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
    this.currentTopLevelEntity.baseEntityName = extendeeName;
    this.currentTopLevelEntity.sourceMap.baseEntityName = sourceMapFrom(context);
  }
}
