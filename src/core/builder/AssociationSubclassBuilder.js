// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { associationSubclassFactory } from '../model/AssociationSubclass';
import type { AssociationSubclass } from '../model/AssociationSubclass';

export default class AssociationSubclassBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterAssociationSubclass(context: MetaEdGrammar.AssociationSubclassContext) {
    this.enteringEntity(associationSubclassFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitAssociationSubclass(context: MetaEdGrammar.AssociationSubclassContext) {
    this.exitingEntity();
  }

  enterAssociationName(context: MetaEdGrammar.AssociationNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
  }

  enterBaseName(context: MetaEdGrammar.BaseNameContext) {
    if (this.currentTopLevelEntity == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;

    ((this.currentTopLevelEntity: any): AssociationSubclass).baseEntityName = context.ID().getText();
  }
}
