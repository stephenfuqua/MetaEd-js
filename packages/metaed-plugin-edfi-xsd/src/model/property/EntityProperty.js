// @flow
import type { MetaEdEnvironment, EnhancerResult, EntityProperty } from '../../../../../packages/metaed-core/index';
import { getAllProperties } from '../../../../../packages/metaed-core/index';

export type EntityPropertyEdfiXsd = {
  xsd_Name: string,
  xsd_Type: string,
  xsd_IsDescriptor: boolean,
  xsd_IsChoice: boolean,
}

// Enhancer for object setup
const enhancerName: string = 'EntityPropertySetupEnhancer';

export function addEntityPropertyEdfiXsd(property: EntityProperty) {
  Object.assign(property.data.edfiXsd, {
    xsd_IsDescriptor: false,
    xsd_IsChoice: false,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllProperties(metaEd.propertyIndex).forEach((property: EntityProperty) => {
    addEntityPropertyEdfiXsd(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
