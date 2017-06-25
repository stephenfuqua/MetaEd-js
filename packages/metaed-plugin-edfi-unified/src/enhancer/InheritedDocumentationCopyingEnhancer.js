// @flow
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../packages/metaed-core/src/enhancer/EnhancerResult';
import type { EntityProperty, HasReferencedEntity } from '../../../../packages/metaed-core/src/model/property/EntityProperty';
import { getAllProperties } from '../../../../packages/metaed-core/src/model/property/PropertyRepository';

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
