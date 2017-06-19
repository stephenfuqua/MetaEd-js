// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { descriptorFactory } from '../model/Descriptor';
import type { Descriptor } from '../model/Descriptor';
import type { MapTypeEnumeration } from '../model/MapTypeEnumeration';
import { mapTypeEnumerationFactory, NoMapTypeEnumeration } from '../model/MapTypeEnumeration';
import type { EnumerationItem } from '../model/EnumerationItem';
import { NoEnumerationItem, enumerationItemFactory } from '../model/EnumerationItem';
import { extractDocumentation, extractShortDescription, squareBracketRemoval, isErrorText } from './BuilderUtility';
import { NoTopLevelEntity } from '../model/TopLevelEntity';
import type { EntityRepository } from '../model/Repository';
import type { ValidationFailure } from '../validator/ValidationFailure';
import type { PropertyType } from '../model/property/PropertyType';
import type { EntityProperty } from '../model/property/EntityProperty';

export default class DescriptorBuilder extends TopLevelEntityBuilder {
  currentMapTypeEnumeration: MapTypeEnumeration;
  currentEnumerationItem: EnumerationItem;

  constructor(entityRepository: EntityRepository,
    validationFailures: Array<ValidationFailure>,
    propertyIndex: Map<PropertyType, Array<EntityProperty>>) {
    super(entityRepository, validationFailures, propertyIndex);
    this.currentMapTypeEnumeration = NoMapTypeEnumeration;
    this.currentEnumerationItem = NoEnumerationItem;
  }

  // eslint-disable-next-line no-unused-vars
  enterDescriptor(context: MetaEdGrammar.DescriptorContext) {
    this.enteringEntity(descriptorFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitDescriptor(context: MetaEdGrammar.DescriptorContext) {
    this.exitingEntity();
  }

  enterDescriptorName(context: MetaEdGrammar.DescriptorNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception || isErrorText(context.ID().getText())) return;
    this.enteringName(context.ID().getText());
  }

  // eslint-disable-next-line no-unused-vars
  enterOptionalMapType(context: MetaEdGrammar.OptionalMapTypeContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    ((this.currentTopLevelEntity: any): Descriptor).isMapTypeOptional = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterRequiredMapType(context: MetaEdGrammar.RequiredMapTypeContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity) return;
    ((this.currentTopLevelEntity: any): Descriptor).isMapTypeRequired = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterWithMapType(context: MetaEdGrammar.WithMapTypeContext) {
    if (this.currentTopLevelEntity === NoTopLevelEntity || this.namespaceInfo == null) return;
    this.currentMapTypeEnumeration = Object.assign(mapTypeEnumerationFactory(), {
      metaEdName: `${this.currentTopLevelEntity.metaEdName}Map`,
      namespaceInfo: this.namespaceInfo,
    });
  }

  enterMapTypeDocumentation(context: MetaEdGrammar.MapTypeDocumentationContext) {
    if (this.currentMapTypeEnumeration === NoMapTypeEnumeration) return;
    this.currentMapTypeEnumeration.documentation = extractDocumentation(context);
  }

  enterEnumerationItemDocumentation(context: MetaEdGrammar.EnumerationItemDocumentationContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    this.currentEnumerationItem.documentation = extractDocumentation(context);
  }

  // eslint-disable-next-line no-unused-vars
  exitWithMapType(context: MetaEdGrammar.WithMapTypeContext) {
    if (this.currentMapTypeEnumeration === NoMapTypeEnumeration) return;
    if (this.currentTopLevelEntity !== NoTopLevelEntity) {
      ((this.currentTopLevelEntity: any): Descriptor).mapTypeEnumeration = this.currentMapTypeEnumeration;
    }
    this.entityRepository.mapTypeEnumeration.set(this.currentMapTypeEnumeration.metaEdName, this.currentMapTypeEnumeration);
    this.currentMapTypeEnumeration = NoMapTypeEnumeration;
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    this.currentEnumerationItem = enumerationItemFactory();
  }

  // eslint-disable-next-line no-unused-vars
  exitEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentEnumerationItem === NoEnumerationItem) return;
    if (this.currentMapTypeEnumeration !== NoMapTypeEnumeration) {
      this.currentMapTypeEnumeration.enumerationItems.push(this.currentEnumerationItem);
    }
    this.currentEnumerationItem = NoEnumerationItem;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.METAED_ID() == null || context.METAED_ID().exception != null || isErrorText(context.METAED_ID().getText())) return;
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
