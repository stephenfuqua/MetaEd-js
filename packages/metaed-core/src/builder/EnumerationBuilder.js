// @flow
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { TopLevelEntityBuilder } from './TopLevelEntityBuilder';
import { newEnumeration, asEnumeration } from '../model/Enumeration';
import { newSchoolYearEnumeration } from '../model/SchoolYearEnumeration';
import type { EnumerationSourceMap } from '../model/Enumeration';
import type { EnumerationItem } from '../model/EnumerationItem';
import { newEnumerationItem, NoEnumerationItem } from '../model/EnumerationItem';
import { extractDocumentation, extractShortDescription, squareBracketRemoval, isErrorText } from './BuilderUtility';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { ValidationFailure } from '../validator/ValidationFailure';
import { sourceMapFrom } from '../model/SourceMap';

export class EnumerationBuilder extends TopLevelEntityBuilder {
  currentEnumerationItem: EnumerationItem;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super(metaEd, validationFailures);
    this.currentEnumerationItem = NoEnumerationItem;
  }

  enterEnumeration(context: MetaEdGrammar.EnumerationContext) {
    this.enteringEntity(newEnumeration);
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      Object.assign(this.currentTopLevelEntity.sourceMap, {
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
      this.enteringEntity(newSchoolYearEnumeration);
      Object.assign(this.currentTopLevelEntity.sourceMap, {
        type: sourceMapFrom(context),
        namespaceInfo: this.currentTopLevelEntity.namespaceInfo.sourceMap.type,
      });
    }

    this.enteringName(enumerationName);
    Object.assign(this.currentTopLevelEntity.sourceMap, {
      metaEdName: sourceMapFrom(context),
    });
  }

  enterEnumerationItemDocumentation(context: MetaEdGrammar.EnumerationItemDocumentationContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    this.currentEnumerationItem.documentation = extractDocumentation(context);
    this.currentEnumerationItem.sourceMap.documentation = sourceMapFrom(context);
  }

  enterEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    this.currentEnumerationItem = newEnumerationItem();
    this.currentEnumerationItem.namespaceInfo.sourceMap = this.currentTopLevelEntity.namespaceInfo.sourceMap;
    this.currentEnumerationItem.sourceMap.type = sourceMapFrom(context);
  }

  exitEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || this.currentEnumerationItem === NoEnumerationItem) return;
    asEnumeration(this.currentTopLevelEntity).enumerationItems.push(this.currentEnumerationItem);
    ((this.currentTopLevelEntity.sourceMap: any): EnumerationSourceMap).enumerationItems.push(sourceMapFrom(context));
    this.currentEnumerationItem = NoEnumerationItem;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.exception || context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;
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
