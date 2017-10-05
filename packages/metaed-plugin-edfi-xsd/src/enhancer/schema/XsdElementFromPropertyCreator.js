// @flow
import type { EntityProperty } from '../../../../../packages/metaed-core/index';
import type { ComplexTypeItem } from '../../model/schema/ComplexTypeItem';
import type { DescriptorPropertyEdfiXsd } from '../../model/property/DescriptorProperty';
import type { ElementGroup } from '../../model/schema/ElementGroup';
import { newElementGroup } from '../../model/schema/ElementGroup';
import type { Element } from '../../model/schema/Element';
import { newElement } from '../../model/schema/Element';
import { newAnnotation } from '../../model/schema/Annotation';

function calculateMinOccurs(entityProperty: EntityProperty, minOccursOverride: ?string): string {
  if (minOccursOverride != null) return minOccursOverride;
  return entityProperty.isOptional || entityProperty.isOptionalCollection ? '0' : '';
}

function calculateMaxOccursIsUnbounded(entityProperty: EntityProperty, maxOccursIsUnboundedOverride: ?boolean): boolean {
  if (maxOccursIsUnboundedOverride != null) return maxOccursIsUnboundedOverride;
  return entityProperty.isOptionalCollection || entityProperty.isRequiredCollection;
}

// Finds primary key columns for entity by traversing properties
export function createXsdElementFromProperty(property: EntityProperty, minOccursOverride: ?string, maxOccursIsUnboundedOverride: ?boolean): Element {
  return Object.assign(newElement(), {
    name: property.data.edfiXsd.xsd_Name,
    type: property.data.edfiXsd.xsd_Type,
    annotation: Object.assign(newAnnotation(), {
      documentation: property.documentation,
      descriptorName: property.type === 'descriptor' ? ((property.data.edfiXsd: any): DescriptorPropertyEdfiXsd).xsd_DescriptorNameWithExtension() : '',
    }),
    minOccurs: calculateMinOccurs(property, minOccursOverride),
    maxOccursIsUnbounded: calculateMaxOccursIsUnbounded(property, maxOccursIsUnboundedOverride),
  });
}

export function createSchemaComplexTypeItems(complexTypeItemProperties: Array<EntityProperty>, minOccursOverride: ?string, maxOccursIsUnboundedOverride: ?boolean): Array<ComplexTypeItem> {
  const complexTypeItems: Array<ComplexTypeItem> = [];
  complexTypeItemProperties.forEach(complexTypeItemProperty => {
    if (complexTypeItemProperty.type === 'choice') {
      const choiceElement: ElementGroup = Object.assign(newElementGroup(), {
        minOccurs: calculateMinOccurs(complexTypeItemProperty, minOccursOverride),
        maxOccursIsUnbounded: calculateMaxOccursIsUnbounded(complexTypeItemProperty, maxOccursIsUnboundedOverride),
        isChoice: true,
      });
      choiceElement.items.push(...createSchemaComplexTypeItems(complexTypeItemProperty.data.edfiXsd.xsd_Properties, minOccursOverride, maxOccursIsUnboundedOverride));
      complexTypeItems.push(choiceElement);
    } else {
      complexTypeItems.push(createXsdElementFromProperty(complexTypeItemProperty, minOccursOverride, maxOccursIsUnboundedOverride));
    }
  });
  return complexTypeItems;
}
