// @flow
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import TopLevelEntityBuilder from './TopLevelEntityBuilder';
import { descriptorFactory } from '../model/Descriptor';
import type { Descriptor } from '../model/Descriptor';
import type { MapTypeEnumeration } from '../model/Enumeration';
import { mapTypeEnumerationFactory } from '../model/Enumeration';
import type { EnumerationItem } from '../model/EnumerationItem';
import { enumerationItemFactory } from '../model/EnumerationItem';
import { extractDocumentation, extractShortDescription, squareBracketRemoval } from './BuilderUtility';

export default class DescriptorBuilder extends TopLevelEntityBuilder {
  currentMapTypeEnumeration: ?MapTypeEnumeration;
  currentEnumerationItem: ?EnumerationItem;

  // eslint-disable-next-line no-unused-vars
  enterDescriptor(context: MetaEdGrammar.DescriptorContext) {
    this.enteringEntity(descriptorFactory);
  }

  // eslint-disable-next-line no-unused-vars
  exitDescriptor(context: MetaEdGrammar.DescriptorContext) {
    this.exitingEntity();
  }

  enterDescriptorName(context: MetaEdGrammar.DescriptorNameContext) {
    if (context.exception || context.ID() == null || context.ID().exception) return;
    this.enteringName(context.ID().getText());
  }

  // eslint-disable-next-line no-unused-vars
  enterOptionalMapType(context: MetaEdGrammar.OptionalMapTypeContext) {
    if (this.currentTopLevelEntity == null) return;
    ((this.currentTopLevelEntity: any): Descriptor).isMapTypeOptional = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterRequiredMapType(context: MetaEdGrammar.RequiredMapTypeContext) {
    if (this.currentTopLevelEntity == null) return;
    ((this.currentTopLevelEntity: any): Descriptor).isMapTypeRequired = true;
  }

  // eslint-disable-next-line no-unused-vars
  enterWithMapType(context: MetaEdGrammar.WithMapTypeContext) {
    if (this.currentTopLevelEntity == null || this.namespaceInfo == null) return;
    this.currentMapTypeEnumeration = Object.assign(mapTypeEnumerationFactory(), {
      // $FlowIgnore - already null guarded
      metaEdName: `${this.currentTopLevelEntity.metaEdName}Map`,
      // $FlowIgnore - already null guarded
      namespaceInfo: this.namespaceInfo,
    });
  }

  enterMapTypeDocumentation(context: MetaEdGrammar.MapTypeDocumentationContext) {
    if (this.currentMapTypeEnumeration == null) return;
    // $FlowIgnore - already null guarded
    this.currentMapTypeEnumeration.documentation = extractDocumentation(context);
  }

  enterEnumerationItemDocumentation(context: MetaEdGrammar.EnumerationItemDocumentationContext) {
    if (this.currentEnumerationItem == null) return;
    // $FlowIgnore - already null guarded
    this.currentEnumerationItem.documentation = extractDocumentation(context);
  }

  // eslint-disable-next-line no-unused-vars
  exitWithMapType(context: MetaEdGrammar.WithMapTypeContext) {
    if (this.currentMapTypeEnumeration == null) return;
    if (this.currentTopLevelEntity != null) {
      ((this.currentTopLevelEntity: any): Descriptor).mapTypeEnumeration = this.currentMapTypeEnumeration;
    }
    this.repository.mapTypeEnumeration.set(this.currentMapTypeEnumeration.metaEdName, this.currentMapTypeEnumeration);
    this.currentMapTypeEnumeration = null;
  }

  // eslint-disable-next-line no-unused-vars
  enterEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    this.currentEnumerationItem = enumerationItemFactory();
  }

  // eslint-disable-next-line no-unused-vars
  exitEnumerationItem(context: MetaEdGrammar.EnumerationItemContext) {
    if (this.currentEnumerationItem == null) return;
    if (this.currentMapTypeEnumeration != null) {
      this.currentMapTypeEnumeration.enumerationItems.push(this.currentEnumerationItem);
    }
    this.currentEnumerationItem = null;
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (context.METAED_ID() == null || context.METAED_ID().exception != null) return;
    if (this.currentEnumerationItem != null) {
      // $FlowIgnore - already null guarded
      this.currentEnumerationItem.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
    } else {
      super.enterMetaEdId(context);
    }
  }

  enterShortDescription(context: MetaEdGrammar.ShortDescriptionContext) {
    if (this.currentEnumerationItem == null) return;
    // $FlowIgnore - already null guarded
    this.currentEnumerationItem.shortDescription = extractShortDescription(context);
  }
}
