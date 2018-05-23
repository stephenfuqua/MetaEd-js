// @flow
import type { MetaEdEnvironment, EnhancerResult, Choice, EntityProperty, Namespace } from 'metaed-core';
import { getAllTopLevelEntitiesForNamespaces, getEntityForNamespaces } from 'metaed-core';
import type { ChoicePropertyEdfiXsd } from '../model/property/ChoiceProperty';

const enhancerName: string = 'AddChoicePropertiesEnhancer';

function addChoiceProperties(namespaces: Array<Namespace>, properties: Array<EntityProperty>) {
  properties.filter(p => p.type === 'choice').forEach(choiceProperty => {
    const referencedChoice: ?Choice = ((getEntityForNamespaces(
      choiceProperty.metaEdName,
      namespaces,
      'choice',
    ): any): ?Choice);

    if (referencedChoice) {
      addChoiceProperties(namespaces, referencedChoice.properties);
      ((choiceProperty.data.edfiXsd: any): ChoicePropertyEdfiXsd).xsd_Properties = referencedChoice.properties;
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
