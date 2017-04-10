// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { commonExtensionFactory } from '../model/CommonExtension';
import type { CommonExtension } from '../model/CommonExtension';

export default class CommonExtensionBuilder extends TopLevelEntityBuilder {
  // eslint-disable-next-line no-unused-vars
  enterCommonExtension(context: MetaEdGrammar.CommonExtensionContext) {
    this.enteringEntity(commonExtensionFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitCommonExtension(context: MetaEdGrammar.CommonExtensionContext) {
    this.exitingEntity();
  }

  enterExtendeeName(context: MetaEdGrammar.ExtendeeNameContext) {
    if (this.currentTopLevelEntity == null) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;

    const extendeeName = context.ID().getText();
    this.enteringName(extendeeName);
    ((this.currentTopLevelEntity: any): CommonExtension).baseEntityName = extendeeName;
  }
}
