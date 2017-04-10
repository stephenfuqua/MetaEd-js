// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntitySubclassFactory } from '../model/DomainEntitySubclass';
import type { DomainEntitySubclass } from '../model/DomainEntitySubclass';

export default class DomainEntitySubclassBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterDomainEntitySubclass(context: MetaEdGrammar.DomainEntitySubclassContext) {
    this.enteringEntity(domainEntitySubclassFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainEntitySubclass(context: MetaEdGrammar.DomainEntitySubclassContext) {
    this.exitingEntity();
  }

  enterEntityName(context: MetaEdGrammar.DomainEntityNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
  }

  enterBaseName(context: MetaEdGrammar.BaseNameContext) {
    if (this.currentTopLevelEntity == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;

    ((this.currentTopLevelEntity: any): DomainEntitySubclass).baseEntityName = context.ID().getText();
  }
}
