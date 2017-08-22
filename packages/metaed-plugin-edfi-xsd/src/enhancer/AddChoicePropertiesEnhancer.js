// @flow
import type { MetaEdEnvironment, EnhancerResult, Choice, EntityProperty } from '../../../../packages/metaed-core/index';
import { getAllTopLevelEntities } from '../../../../packages/metaed-core/index';
import type { ChoicePropertyEdfiXsd } from '../model/property/ChoiceProperty';

const enhancerName: string = 'AddChoicePropertiesEnhancer';

function addChoiceProperties(choiceRepository: Map<string, Choice>, properties: Array<EntityProperty>) {
  properties.filter(p => p.type === 'choice').forEach(choiceProperty => {
    const referencedChoice = choiceRepository.get(choiceProperty.metaEdName);
    if (referencedChoice) {
      addChoiceProperties(choiceRepository, referencedChoice.properties);
      ((choiceProperty.data.edfiXsd: any): ChoicePropertyEdfiXsd).xsd_Properties = referencedChoice.properties;
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntities(metaEd.entity).forEach(entity => {
    addChoiceProperties(metaEd.entity.choice, entity.properties);
  });

  return {
    enhancerName,
    success: true,
  };
}
