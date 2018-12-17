// @flow
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { TopLevelEntityBuilder } from './TopLevelEntityBuilder';
import { newAssociationExtension } from '../model/AssociationExtension';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';
import { sourceMapFrom } from '../model/SourceMap';

/**
 * An ANTLR4 listener that creates AssociationExtension entities.
 */
export class AssociationExtensionBuilder extends TopLevelEntityBuilder {
  enterAssociationExtension(context: MetaEdGrammar.AssociationExtensionContext) {
    this.enteringEntity(newAssociationExtension);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.sourceMap.type = sourceMapFrom(context);
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitAssociationExtension(context: MetaEdGrammar.AssociationExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    this.currentTopLevelEntity.baseEntityName = extendeeName;
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
  }
}
