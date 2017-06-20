// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { enumerationFactory } from '../model/Enumeration';
import { schoolYearEnumerationFactory } from '../model/SchoolYearEnumeration';
import type { Enumeration } from '../model/Enumeration';
import type { EnumerationItem } from '../model/EnumerationItem';
import { enumerationItemFactory, NoEnumerationItem } from '../model/EnumerationItem';
import { extractDocumentation, extractShortDescription, squareBracketRemoval, isErrorText } from './BuilderUtility';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import type { EntityRepository } from '../model/Repository';
import type { ValidationFailure } from '../validator/ValidationFailure';
import type { PropertyType } from '../model/property/PropertyType';
import type { EntityProperty } from '../model/property/EntityProperty';
import { sourceMapFrom } from '../model/SourceMap';

export default class EnumerationBuilder extends TopLevelEntityBuilder {
  currentEnumerationItem: EnumerationItem;

  constructor(entityRepository: EntityRepository,
    validationFailures: Array<ValidationFailure>,
    propertyIndex: Map<PropertyType, Array<EntityProperty>>) {
    super(entityRepository, validationFailures, propertyIndex);
    this.currentEnumerationItem = NoEnumerationItem;
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumeration(context: MetaEdGrammar.EnumerationContext) {
    this.enteringEntity(enumerationFactory);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      Object.assign(((this.currentTopLevelEntity: any): Enumeration).sourceMap, {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  exitEnumeration(context: MetaEdGrammar.EnumerationContext) {
    this.exitingEntity();
  }

  enterEnumerationName(context: MetaEdGrammar.EnumerationNameContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    const enumerationName = context.ID().getText();

    // need to differentiate SchoolYear from other enumerations - overwrite with new type
    if (enumerationName === 'SchoolYear') {
      this.enteringEntity(schoolYearEnumerationFactory);
      Object.assign(((this.currentTopLevelEntity: any): Enumeration).sourceMap, {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
    }

    this.enteringName(enumerationName);
    Object.assign(((this.currentTopLevelEntity: any): Enumeration).sourceMap, {
      metaEdName: sourceMapFrom(context),
    });
  }

  enterEnumerationItemDocumentation(context: MetaEdGrammar.EnumerationItemDocumentationContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    this.currentEnumerationItem.documentation = extractDocumentation(context);
    this.currentEnumerationItem.sourceMap.documentation = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentEnumerationItem = enumerationItemFactory();
    this.currentEnumerationItem.namespaceInfo.sourceMap = ((this.currentTopLevelEntity: any): Enumeration).namespaceInfo.sourceMap;
    this.currentEnumerationItem.sourceMap.type = sourceMapFrom(context);
  }

  // eslint-disable-next-line no-unused-vars
  exitEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || this.currentEnumerationItem === NoEnumerationItem) return;
    ((this.currentTopLevelEntity: any): Enumeration).enumerationItems.push(this.currentEnumerationItem);
    this.currentEnumerationItem = NoEnumerationItem;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;
    if (this.currentEnumerationItem !== NoEnumerationItem) {
      this.currentEnumerationItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
      this.currentEnumerationItem.sourceMap.metaEdId = sourceMapFrom(context);
    } else {
      super.enterMetaEdId(context);
    }
  }

  enterShortDescription(context: MetaEdGrammar.ShortDescriptionContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    this.currentEnumerationItem.shortDescription = extractShortDescription(context);
    this.currentEnumerationItem.sourceMap.shortDescription = sourceMapFrom(context);
  }
}
