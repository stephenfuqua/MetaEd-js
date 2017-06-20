// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityFactory } from '../model/DomainEntity';
import type { DomainEntity } from '../model/DomainEntity';
import { sourceMapFrom } from '../model/SourceMap';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';

export default class DomainEntityBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterAbstractEntity(context: MetaEdGrammar.AbstractEntityContext) {
    this.enteringEntity(domainEntityFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      ((this.currentTopLevelEntity: any): DomainEntity).isAbstract = true;
      Object.assign(((this.currentTopLevelEntity: any): DomainEntity).sourceMap, {
        type: sourceMapFrom(context),
        isAbstract: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  enterDomainEntity(context: MetaEdGrammar.DomainEntityContext) {
    this.enteringEntity(domainEntityFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      Object.assign(((this.currentTopLevelEntity: any): DomainEntity).sourceMap, {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
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
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterEntityName(context: MetaEdGrammar.EntityNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.metaEdName = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  enterCascadeUpdate(context: MetaEdGrammar.CascadeUpdateContext) {
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      ((this.currentTopLevelEntity: any): DomainEntity).allowPrimaryKeyUpdates = true;
      ((this.currentTopLevelEntity: any): DomainEntity).sourceMap.allowPrimaryKeyUpdates = sourceMapFrom(context);
    }
  }
}
