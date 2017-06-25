// @flow
import { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityFactory, asDomainEntity } from '../model/DomainEntity';
import { abstractEntityFactory } from '../model/AbstractEntity';
import type { AbstractEntitySourceMap } from '../model/AbstractEntity';
import { sourceMapFrom } from '../model/SourceMap';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';

export default class DomainEntityBuilder extends TopLevelEntityBuilder {
  enterAbstractEntity(context: MetaEdGrammar.AbstractEntityContext) {
    this.enteringEntity(abstractEntityFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      asDomainEntity(this.currentTopLevelEntity).isAbstract = true;
      Object.assign(((this.currentTopLevelEntity.sourceMap: any): AbstractEntitySourceMap), {
        type: sourceMapFrom(context),
        isAbstract: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
    }
  }

  enterDomainEntity(context: MetaEdGrammar.DomainEntityContext) {
    this.enteringEntity(domainEntityFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      Object.assign(this.currentTopLevelEntity.sourceMap, {
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
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterEntityName(context: MetaEdGrammar.EntityNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
    this.currentTopLevelEntity.sourceMap.metaEdName = sourceMapFrom(context);
  }

  enterCascadeUpdate(context: MetaEdGrammar.CascadeUpdateContext) {
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      this.currentTopLevelEntity.allowPrimaryKeyUpdates = true;
      this.currentTopLevelEntity.sourceMap.allowPrimaryKeyUpdates = sourceMapFrom(context);
    }
  }
}
