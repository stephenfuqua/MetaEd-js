// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityExtensionFactory } from '../model/DomainEntityExtension';
import type { DomainEntityExtension } from '../model/DomainEntityExtension';
import { NoTopLevelEntity } from '../model/TopLevelEntity';

export default class DomainEntityExtensionBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterDomainEntityExtension(context: MetaEdGrammar.DomainEntityExtensionContext) {
    this.enteringEntity(domainEntityExtensionFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainEntityExtension(context: MetaEdGrammar.DomainEntityExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    ((this.currentTopLevelEntity: any): DomainEntityExtension).baseEntityName = extendeeName;
  }
}
