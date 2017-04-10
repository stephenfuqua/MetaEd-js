// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityFactory } from '../model/DomainEntity';
import type { DomainEntity } from '../model/DomainEntity';
import { sourceMapFrom } from '../model/ModelBase';

export default class DomainEntityBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterAbstractEntity(context: MetaEdGrammar.AbstractEntityContext) {
    this.enteringEntity(domainEntityFactory);
    if (this.currentTopLevelEntity != null) {
      ((this.currentTopLevelEntity: any): DomainEntity).isAbstract = true;
      ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.type = sourceMapFrom(context);
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterDomainEntity(context: MetaEdGrammar.DomainEntityContext) {
    this.enteringEntity(domainEntityFactory);
    if (this.currentTopLevelEntity != null) {
      ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.type = sourceMapFrom(context);
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitAbstractEntity(context: MetaEdGrammar.AbstractEntityContext) {
    this.exitingEntity();
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainEntity(context: MetaEdGrammar.DomainEntityContext) {
    this.exitingEntity();
  }

  enterAbstractEntityName(context: MetaEdGrammar.AbstractEntityNameContext) {
    if (this.currentTopLevelEntity == null || context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
    ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterEntityName(context: MetaEdGrammar.EntityNameContext) {
    if (this.currentTopLevelEntity == null || context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
    ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.metaEdName = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  enterCascadeUpdate(context: MetaEdGrammar.CascadeUpdateContext) {
    if (this.currentTopLevelEntity != null) {
      this.currentTopLevelEntity.allowPrimaryKeyUpdates = true;
      ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.allowPrimaryKeyUpdates = sourceMapFrom(context);
    }
  }
}
