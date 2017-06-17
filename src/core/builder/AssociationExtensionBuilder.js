// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { associationExtensionFactory } from '../model/AssociationExtension';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import type { AssociationExtension } from '../model/AssociationExtension';

export default class AssociationExtensionBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterAssociationExtension(context: MetaEdGrammar.AssociationExtensionContext) {
    this.enteringEntity(associationExtensionFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitAssociationExtension(context: MetaEdGrammar.AssociationExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    ((this.currentTopLevelEntity: any): AssociationExtension).baseEntityName = extendeeName;
  }
}
