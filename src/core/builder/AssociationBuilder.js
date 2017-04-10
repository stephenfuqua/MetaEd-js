// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityPropertyFactory } from '../model/property/DomainEntityProperty';
import { associationFactory } from '../model/Association';
import type { Association } from '../model/Association';

export default class AssociationBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterAssociation(context: MetaEdGrammar.AssociationContext) {
    this.enteringEntity(associationFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitAssociation(context: MetaEdGrammar.AssociationContext) {
    this.exitingEntity();
  }

  enterAssociationName(context: MetaEdGrammar.AssociationNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
  }

  // eslint-disable-next-line no-unused-vars
  enterCascadeUpdate(context: MetaEdGrammar.CascadeUpdateContext) {
    if (this.currentTopLevelEntity != null) {
      ((this.currentTopLevelEntity: any): Association).allowPrimaryKeyUpdates = true;
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterFirstDomainEntity(context: MetaEdGrammar.FirstDomainEntityContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = Object.assign(domainEntityPropertyFactory(), { isPartOfIdentity: true });
  }

  // eslint-disable-next-line no-unused-vars
  enterSecondDomainEntity(context: MetaEdGrammar.SecondDomainEntityContext) {
    if (this.currentTopLevelEntity == null) return;
    this.currentProperty = Object.assign(domainEntityPropertyFactory(), { isPartOfIdentity: true });
  }

  // eslint-disable-next-line no-unused-vars
  exitFirstDomainEntity(context: MetaEdGrammar.FirstDomainEntityContext) {
    this.exitingProperty();
  }

  // eslint-disable-next-line no-unused-vars
  exitSecondDomainEntity(context: MetaEdGrammar.SecondDomainEntityContext) {
    this.exitingProperty();
  }
}
