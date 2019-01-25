import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { TopLevelEntityBuilder } from './TopLevelEntityBuilder';
import { newDomainEntityProperty } from '../model/property/DomainEntityProperty';
import { newAssociation } from '../model/Association';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';
import { sourceMapFrom } from '../model/SourceMap';

/**
 * An ANTLR4 listener that creates Association entities.
 */
export class AssociationBuilder extends TopLevelEntityBuilder {
  enterAssociation(context: MetaEdGrammar.AssociationContext) {
    this.enteringEntity(newAssociation);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.sourceMap.type = sourceMapFrom(context);
    }
  }

  // @ts-ignore
  exitAssociation(context: MetaEdGrammar.AssociationContext) {
    this.exitingEntity();
  }

  enterAssociationName(context: MetaEdGrammar.AssociationNameContext) {
    if (
      this.currentTopLevelEntity === NoTopLevelEntity ||
      context.exception ||
      context.ID() == null ||
      context.ID().exception ||
      isErrorText(context.ID().getText())
    )
      return;
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
    if (context.exception) return;
    this.currentProperty = newDomainEntityProperty();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
    this.enteringIdentity(context);
  }

  enterSecondDomainEntity(context: MetaEdGrammar.SecondDomainEntityContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception) return;
    this.currentProperty = newDomainEntityProperty();
    this.currentProperty.sourceMap.type = sourceMapFrom(context);
    this.enteringIdentity(context);
  }

  // @ts-ignore
  exitFirstDomainEntity(context: MetaEdGrammar.FirstDomainEntityContext) {
    this.exitingProperty();
  }

  // @ts-ignore
  exitSecondDomainEntity(context: MetaEdGrammar.SecondDomainEntityContext) {
    this.exitingProperty();
  }
}
