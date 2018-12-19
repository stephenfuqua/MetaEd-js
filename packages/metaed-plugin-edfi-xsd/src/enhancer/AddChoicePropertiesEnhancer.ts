import { MetaEdEnvironment, EnhancerResult, Choice, EntityProperty, Namespace } from 'metaed-core';
import { getAllTopLevelEntitiesForNamespaces, getEntityForNamespaces } from 'metaed-core';
import { ChoicePropertyEdfiXsd } from '../model/property/ChoiceProperty';

const enhancerName = 'AddChoicePropertiesEnhancer';

function addChoiceProperties(namespaces: Array<Namespace>, properties: Array<EntityProperty>) {
  properties
    .filter(p => p.type === 'choice')
    .forEach(choiceProperty => {
      const referencedChoice: Choice | null = getEntityForNamespaces(
        choiceProperty.metaEdName,
        namespaces,
        'choice',
      ) as Choice | null;

      if (referencedChoice) {
        addChoiceProperties(namespaces, referencedChoice.properties);
        (choiceProperty.data.edfiXsd as ChoicePropertyEdfiXsd).xsdProperties = referencedChoice.properties;
      }
    });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces(Array.from(metaEd.namespace.values())).forEach(entity => {
    const namespaces: Array<Namespace> = [entity.namespace, ...entity.namespace.dependencies];
    addChoiceProperties(namespaces, entity.properties);
  });

  return {
    enhancerName,
    success: true,
  };
}
