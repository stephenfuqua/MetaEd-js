// @flow
import { getEntitiesOfType } from '../../../../packages/metaed-core/index';
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';
import type { EnumerationBaseEdfiXsd } from '../model/EnumerationBase';

const enhancerName: string = 'EnumerationBasePropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'enumeration', 'mapTypeEnumeration', 'schoolYearEnumeration').forEach(enumerationBase => {
    const enumerationName = enumerationBase.metaEdName.endsWith('Type') ? enumerationBase.metaEdName : `${enumerationBase.metaEdName}Type`;

    const enumerationBaseXsdData = ((enumerationBase.data.edfiXsd: any): EnumerationBaseEdfiXsd);
    enumerationBaseXsdData.xsd_EnumerationName = enumerationName;
    enumerationBaseXsdData.xsd_EnumerationNameWithExtension =
      enumerationBase.namespaceInfo.projectExtension ?
        `${enumerationBase.namespaceInfo.projectExtension}-${enumerationBaseXsdData.xsd_EnumerationName}` :
        enumerationBaseXsdData.xsd_EnumerationName;
  });


  return {
    enhancerName,
    success: true,
  };
}
