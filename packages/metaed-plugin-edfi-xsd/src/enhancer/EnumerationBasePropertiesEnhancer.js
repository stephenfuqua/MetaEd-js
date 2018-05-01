// @flow
import { getEntitiesOfType } from 'metaed-core';
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import type { EnumerationBaseEdfiXsd } from '../model/EnumerationBase';

const enhancerName: string = 'EnumerationBasePropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'enumeration', 'mapTypeEnumeration', 'schoolYearEnumeration').forEach(enumerationBase => {
    const enumerationName = enumerationBase.metaEdName.endsWith('Type')
      ? enumerationBase.metaEdName
      : `${enumerationBase.metaEdName}Type`;

    const enumerationBaseXsdData = ((enumerationBase.data.edfiXsd: any): EnumerationBaseEdfiXsd);
    enumerationBaseXsdData.xsd_EnumerationName = enumerationName;
    enumerationBaseXsdData.xsd_EnumerationNameWithExtension = enumerationBase.namespace.projectExtension
      ? `${enumerationBase.namespace.projectExtension}-${enumerationBaseXsdData.xsd_EnumerationName}`
      : enumerationBaseXsdData.xsd_EnumerationName;
  });

  return {
    enhancerName,
    success: true,
  };
}
