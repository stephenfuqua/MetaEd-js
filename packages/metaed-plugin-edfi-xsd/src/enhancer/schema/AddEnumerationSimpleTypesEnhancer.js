// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getEntitiesOfType } from 'metaed-core';
import type { EnumerationBase, EnumerationBaseEdfiXsd } from '../../model/EnumerationBase';
import { newEnumerationToken } from '../../model/schema/EnumerationToken';
import { newEnumerationSimpleType } from '../../model/schema/EnumerationSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';

const enhancerName: string = 'AddEnumerationSimpleTypesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'enumeration', 'mapTypeEnumeration', 'schoolYearEnumeration').forEach(enumeration => {
    const enumerationBase = ((enumeration: any): EnumerationBase);
    const enumerationBaseEdfiXsd = ((enumerationBase.data.edfiXsd: any): EnumerationBaseEdfiXsd);
    enumerationBaseEdfiXsd.xsd_EnumerationSimpleType = Object.assign(newEnumerationSimpleType(), {
      name: enumerationBaseEdfiXsd.xsd_EnumerationNameWithExtension,
      annotation: Object.assign(newAnnotation(), {
        documentation: enumerationBase.documentation,
        typeGroup: 'Enumeration',
      }),
      baseType: 'xs:token',
      enumerationTokens: enumerationBase.enumerationItems.map(item =>
        Object.assign(newEnumerationToken(), {
          annotation: Object.assign(newAnnotation(), {
            documentation: item.documentation,
          }),
          value: item.shortDescription,
        }),
      ),
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
