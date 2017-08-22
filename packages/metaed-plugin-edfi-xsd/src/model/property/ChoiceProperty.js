// @flow
import type { MetaEdEnvironment, EnhancerResult, EntityProperty, ChoiceProperty } from '../../../../../packages/metaed-core/index';
import type { EntityPropertyEdfiXsd } from './EntityProperty';

export type ChoicePropertyEdfiXsd = EntityPropertyEdfiXsd & {
  xsd_Properties: Array<EntityProperty>,
  xsd_IsChoice: boolean,
}

// Enhancer for object setup
const enhancerName: string = 'ChoicePropertySetupEnhancer';

export function addChoicePropertyEdfiXsdTo(property: ChoiceProperty) {
  Object.assign(property.data.edfiXsd, {
    xsd_Properties: [],
    xsd_IsChoice: true,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.choice.forEach((property: ChoiceProperty) => {
    addChoicePropertyEdfiXsdTo(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
