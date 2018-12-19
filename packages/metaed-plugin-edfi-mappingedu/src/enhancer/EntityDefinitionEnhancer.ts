import { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { ComplexType, SimpleType, Element, ElementGroup, ComplexTypeItem } from 'metaed-plugin-edfi-xsd';
import { baseTypeDescriptorReference, baseTypeReference, baseTypeTopLevelEntity } from 'metaed-plugin-edfi-xsd';
import { newEntityDefinition } from '../model/EntityDefinition';
import {
  elementGroupNameFor,
  pluginAssociationsForNamespace,
  pluginDescriptorsForNamespace,
  pluginDomainEntitiesForNamespace,
  pluginEntityDefinitionsForNamespace,
} from './EnhancerHelper';
import {
  baseTypeFor,
  hasItems,
  isElementGroup,
  isEnumeration,
  isLookupReferenceType,
  isMapReferenceType,
  isSimpleType,
  referenceFor,
} from './ReferenceDefintionHelper';

const enhancerName: string = 'EntityDefinitionEnhancer';

const collectElementsFor = (
  element: ComplexType | ElementGroup,
  entityPath: Array<string>,
  elements: Array<{ value: Element | ElementGroup; entityPath: Array<string> }>,
): void => {
  element.items.forEach((value: ComplexTypeItem) =>
    elements.push({
      value: value as any,
      entityPath,
    }),
  );
};

const createEntityDefinitionsFor = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  complexType: ComplexType,
  entityPath: Array<string> = [complexType.name],
) => {
  /* eslint-disable no-continue */
  const elements: Array<{ value: Element | ElementGroup; entityPath: Array<string> }> = [];
  collectElementsFor(complexType, entityPath, elements);

  while (elements.length > 0) {
    const elementOrElementGroup: { value: Element | ElementGroup; entityPath: Array<string> } = elements.pop() as {
      value: Element | ElementGroup;
      entityPath: Array<string>;
    };
    if (isElementGroup(elementOrElementGroup.value)) {
      const elementGroup: { value: ElementGroup; entityPath: Array<string> } = {
        value: elementOrElementGroup.value as ElementGroup,
        entityPath: elementOrElementGroup.entityPath,
      };

      collectElementsFor(elementGroup.value, [...elementOrElementGroup.entityPath], elements);
      continue;
    }

    const element: { value: Element; entityPath: Array<string> } = {
      value: elementOrElementGroup.value as Element,
      entityPath: elementOrElementGroup.entityPath,
    };

    if (
      isSimpleType(element.value) ||
      isMapReferenceType(element.value) ||
      isLookupReferenceType(element.value) ||
      isEnumeration(element.value)
    )
      continue;

    const reference: ComplexType | SimpleType | undefined = referenceFor(metaEd, namespace, element.value);
    if (reference == null || isSimpleType(reference) || isEnumeration(reference)) continue;

    const referencedComplexType: ComplexType = reference as ComplexType;
    const referencedEntityPath: Array<string> = [...element.entityPath, element.value.name];
    pluginEntityDefinitionsForNamespace(metaEd, namespace).push({
      ...newEntityDefinition(),
      elementGroup: elementGroupNameFor(namespace),
      entityPath: referencedEntityPath,
      definition: element.value.annotation.documentation,
    });

    if (hasItems(referencedComplexType)) collectElementsFor(referencedComplexType, referencedEntityPath, elements);
  }
  /* eslint-enable no-continue */
};

const createEntityDefinitionForBaseType = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  complexType: ComplexType,
  entityPath: Array<string> = [complexType.name],
) => {
  if (
    complexType.baseType == null ||
    complexType.baseType === baseTypeDescriptorReference ||
    complexType.baseType === baseTypeReference ||
    complexType.baseType === baseTypeTopLevelEntity
  )
    return;

  const baseType: ComplexType | undefined = baseTypeFor(metaEd, namespace, complexType);
  if (baseType == null) return;
  createEntityDefinitionsFor(metaEd, namespace, baseType, [...entityPath]);
};

export const enhance = (metaEd: MetaEdEnvironment): EnhancerResult => {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const xsdElements: Array<ComplexType> = [
      ...pluginDescriptorsForNamespace(metaEd, namespace).values(),
      ...pluginDomainEntitiesForNamespace(metaEd, namespace).values(),
      ...pluginAssociationsForNamespace(metaEd, namespace).values(),
    ];

    xsdElements.forEach((xsdElement: ComplexType) => {
      pluginEntityDefinitionsForNamespace(metaEd, namespace).push({
        ...newEntityDefinition(),
        elementGroup: elementGroupNameFor(namespace),
        entityPath: [xsdElement.name],
        definition: xsdElement.annotation.documentation,
      });

      createEntityDefinitionsFor(metaEd, namespace, xsdElement);
      createEntityDefinitionForBaseType(metaEd, namespace, xsdElement);
    });
  });

  return {
    enhancerName,
    success: true,
  };
};
