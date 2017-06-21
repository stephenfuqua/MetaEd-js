// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityPropertyFactory } from '../model/property/DomainEntityProperty';
import { associationFactory } from '../model/Association';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';
import { sourceMapFrom } from '../model/SourceMap';

export default class AssociationBuilder extends TopLevelEntityBuilder {
  enterAssociation(context: MetaEdGrammar.AssociationContext) {
    this.enteringEntity(associationFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.sourceMap.type = sourceMapFrom(context);
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitAssociation(context: MetaEdGrammar.AssociationContext) {
    this.exitingEntity();
  }

  enterAssociationName(context: MetaEdGrammar.AssociationNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterCascadeUpdate(context: MetaEdGrammar.CascadeUpdateContext) {
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.allowPrimaryKeyUpdates = true;
      this.currentTopLevelEntity.sourceMap.allowPrimaryKeyUpdates = sourceMapFrom(context);
    }
  }

  enterFirstDomainEntity(context: MetaEdGrammar.FirstDomainEntityContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = domainEntityPropertyFactory();
    this.enteringIdentity(context);
  }

  enterSecondDomainEntity(context: MetaEdGrammar.SecondDomainEntityContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentProperty = domainEntityPropertyFactory();
    this.enteringIdentity(context);
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
