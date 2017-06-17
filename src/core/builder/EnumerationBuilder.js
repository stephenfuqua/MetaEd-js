// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { enumerationFactory } from '../model/Enumeration';
import { schoolYearEnumerationFactory } from '../model/SchoolYearEnumeration';
import type { Enumeration } from '../model/Enumeration';
import type { EnumerationItem } from '../model/EnumerationItem';
import { enumerationItemFactory, NoEnumerationItem } from '../model/EnumerationItem';
import { extractDocumentation, extractShortDescription, squareBracketRemoval } from './BuilderUtility';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import { EntityRepository } from '../model/Repository';

export default class EnumerationBuilder extends TopLevelEntityBuilder {
  currentEnumerationItem: EnumerationItem;

  constructor(repository: EntityRepository) {
    super(repository);
    this.currentEnumerationItem = NoEnumerationItem;
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumeration(context: MetaEdGrammar.EnumerationContext) {
    this.enteringEntity(enumerationFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitEnumeration(context: MetaEdGrammar.EnumerationContext) {
    this.exitingEntity();
  }

  enterEnumerationName(context: MetaEdGrammar.EnumerationNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception) return;
    const enumerationName = context.ID().getText();

    // need to differentiate SchoolYear from other enumerations - overwrite with new type
    if (enumerationName === 'SchoolYear') {
      this.enteringEntity(schoolYearEnumerationFactory);
    }

    this.enteringName(enumerationName);
  }

  enterEnumerationItemDocumentation(context: MetaEdGrammar.EnumerationItemDocumentationContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    this.currentEnumerationItem.documentation = extractDocumentation(context);
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    this.currentEnumerationItem = enumerationItemFactory();
  }

  // eslint-disable-next-line no-unused-vars
  exitEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || this.currentEnumerationItem === NoEnumerationItem) return;
    ((this.currentTopLevelEntity: any): Enumeration).enumerationItems.push(this.currentEnumerationItem);
    this.currentEnumerationItem = NoEnumerationItem;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;
    if (this.currentEnumerationItem !== NoEnumerationItem) {
      this.currentEnumerationItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else {
      super.enterMetaEdId(context);
    }
  }

  enterShortDescription(context: MetaEdGrammar.ShortDescriptionContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    this.currentEnumerationItem.shortDescription = extractShortDescription(context);
  }
}
