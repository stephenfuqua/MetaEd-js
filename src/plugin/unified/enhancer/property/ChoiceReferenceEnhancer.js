// @flow
import type { EntityRepository } from '../../../../core/model/Repository';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import type { EnhancerResult } from '../../../../core/enhancer/EnhancerResult';

const enhancerName: string = 'ChoiceReferenceEnhancer';

export function enhance(repository: EntityRepository, propertyRepository: PropertyRepository): EnhancerResult {
  propertyRepository.choice.forEach(property => {
    const referencedEntity = repository.choice.get(property.metaEdName);
    if (referencedEntity) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
