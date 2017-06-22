// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { associationExtensionFactory } from '../model/AssociationExtension';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';
import { sourceMapFrom } from '../model/SourceMap';

export default class AssociationExtensionBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterAssociationExtension(context: MetaEdGrammar.AssociationExtensionContext) {
    this.enteringEntity(associationExtensionFactory);
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
