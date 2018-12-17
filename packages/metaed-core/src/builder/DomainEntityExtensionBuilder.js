// @flow
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { TopLevelEntityBuilder } from './TopLevelEntityBuilder';
import { newDomainEntityExtension } from '../model/DomainEntityExtension';
import { sourceMapFrom } from '../model/SourceMap';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';

/**
 * An ANTLR4 listener that creates DomainEntityExtension entities.
 */
export class DomainEntityExtensionBuilder extends TopLevelEntityBuilder {
  enterDomainEntityExtension(context: MetaEdGrammar.DomainEntityExtensionContext) {
    this.enteringEntity(newDomainEntityExtension);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      Object.assign(this.currentTopLevelEntity.sourceMap, {
        type: sourceMapFrom(context),
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainEntityExtension(context: MetaEdGrammar.DomainEntityExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (
      this.currentTopLevelEntity === NoTopLevelEntity ||
      context.exception ||
      context.ID() == null ||
      context.ID().exception ||
      isErrorText(context.ID().getText())
    )
      return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    this.currentTopLevelEntity.baseEntityName = extendeeName;
    Object.assign(this.currentTopLevelEntity.sourceMap, {
      metaEdName: sourceMapFrom(context),
      baseEntityName: sourceMapFrom(context),
    });
  }
}
