// @flow
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import type { ComplexType, SimpleType, Element, ElementGroup } from 'metaed-plugin-edfi-xsd';
import {
  baseTypeDescriptorReference,
  descriptorReferenceTypeSuffix,
  identityTypeSuffix,
  lookupTypeSuffix,
  mapTypeSuffix,
  referenceTypeSuffix,
  typeGroupEnumeration,
  typeGroupSimple,
} from 'metaed-plugin-edfi-xsd';
import {
  pluginAssociationsForNamespace,
  pluginBasesForNamespace,
  pluginCommonsForNamespace,
  pluginDescriptorsForNamespace,
  pluginDomainEntitiesForNamespace,
  pluginExtendedReferencesForNamespace,
  pluginIdentitiesForNamespace,
  pluginSimplesForNamespace,
} from './EnhancerHelper';

export const asElement = (x: any): Element => ((x: any): Element);
export const asElementGroup = (x: any): ElementGroup => ((x: any): ElementGroup);
export const asComplexType = (x: any): ComplexType => ((x: any): ComplexType);

export const hasItems = (item: ComplexType | SimpleType | Element | ElementGroup): boolean =>
  item.items != null && asElementGroup(item).items.length > 0;

export const isChoice = (item: Element | ElementGroup): boolean => item.isChoice != null && asElementGroup(item).isChoice;

export const isElementGroup = (item: Element | ElementGroup): boolean =>
  item.isChoice != null && asElementGroup(item).items.length > 0;

export const isDescriptorReferenceType = (item: Element | ElementGroup): boolean =>
  item.type != null &&
  item.type !== baseTypeDescriptorReference &&
  asElement(item).type.endsWith(descriptorReferenceTypeSuffix);

export const isIdentityReferenceType = (item: Element | ElementGroup): boolean =>
  item.type != null && asElement(item).type.endsWith(identityTypeSuffix);

export const isReferenceType = (item: Element | ElementGroup): boolean =>
  item.type != null && item.type !== descriptorReferenceTypeSuffix && asElement(item).type.endsWith(referenceTypeSuffix);

export const isMapReferenceType = (item: SimpleType | Element | ElementGroup): boolean =>
  item.type != null && asElement(item).type.endsWith(mapTypeSuffix);

export const isLookupReferenceType = (item: Element | ElementGroup): boolean =>
  item.type != null && asElement(item).type.endsWith(lookupTypeSuffix);

export const isSimpleType = (simple: SimpleType | Element | ElementGroup): boolean =>
  simple.annotation != null && simple.annotation.typeGroup != null && simple.annotation.typeGroup === typeGroupSimple;

export const isEnumeration = (enumeration: SimpleType | Element | ElementGroup): boolean =>
  enumeration.annotation != null &&
  enumeration.annotation.typeGroup != null &&
  enumeration.annotation.typeGroup === typeGroupEnumeration;

export const referenceFor = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  referenceElement: Element | ElementGroup,
): ?ComplexType | ?SimpleType => {
  if (isDescriptorReferenceType(referenceElement))
    return pluginDescriptorsForNamespace(metaEd, namespace).get(asElement(referenceElement).annotation.descriptorName);

  if (isIdentityReferenceType(referenceElement))
    return pluginIdentitiesForNamespace(metaEd, namespace).get(asElement(referenceElement).type);

  if (isReferenceType(referenceElement))
    return pluginExtendedReferencesForNamespace(metaEd, namespace).get(asElement(referenceElement).type);

  const common: ?ComplexType = pluginCommonsForNamespace(metaEd, namespace).get(asElement(referenceElement).type);
  if (common != null) return common;

  const simple: ?SimpleType = pluginSimplesForNamespace(metaEd, namespace).get(asElement(referenceElement).type);
  if (simple != null) return simple;

  return pluginBasesForNamespace(metaEd, namespace).get(asElement(referenceElement).type);
};

export const baseTypeFor = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  referenceElement: ComplexType,
): ?ComplexType => {
  const Descriptors: ?ComplexType = pluginDescriptorsForNamespace(metaEd, namespace).get(referenceElement.baseType);
  if (Descriptors != null) return Descriptors;

  const domainEntity: ?ComplexType = pluginDomainEntitiesForNamespace(metaEd, namespace).get(referenceElement.baseType);
  if (domainEntity != null) return domainEntity;

  const association: ?ComplexType = pluginAssociationsForNamespace(metaEd, namespace).get(referenceElement.baseType);
  if (association != null) return association;

  return pluginBasesForNamespace(metaEd, namespace).get(referenceElement.baseType);
};
