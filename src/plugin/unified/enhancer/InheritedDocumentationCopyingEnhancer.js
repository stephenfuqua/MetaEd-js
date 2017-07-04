// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import type { EntityProperty, HasReferencedEntity } from '../../../core/model/property/EntityProperty';
import { getAllProperties } from '../../../core/model/property/PropertyRepository';

const enhancerName: string = 'InheritedDocumentationCopyingEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllProperties(metaEd.propertyIndex).forEach((property: EntityProperty) => {
    if (!property.documentationInherited) return;
    if (property.referencedEntity) {
      property.documentation = ((property.referencedEntity: any): HasReferencedEntity).documentation;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
