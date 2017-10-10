// @flow
import type { MetaEdEnvironment, EnhancerResult, EntityProperty, HasReferencedEntity } from '../../../metaed-core/index';
import { getAllProperties } from '../../../metaed-core/index';

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
