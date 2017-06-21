// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { domainEntityExtensionFactory } from '../model/DomainEntityExtension';
import { sourceMapFrom } from '../model/SourceMap';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { isErrorText } from './BuilderUtility';

export default class DomainEntityExtensionBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterDomainEntityExtension(context: MetaEdGrammar.DomainEntityExtensionContext) {
    this.enteringEntity(domainEntityExtensionFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      Object.assign(this.currentTopLevelEntity.sourceMap, {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitDomainEntityExtension(context: MetaEdGrammar.DomainEntityExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    this.currentTopLevelEntity.baseEntityName = extendeeName;
    Object.assign(this.currentTopLevelEntity.sourceMap, {
      metaEdName: sourceMapFrom(context),
      baseEntityName: sourceMapFrom(context),
    });
  }
}
