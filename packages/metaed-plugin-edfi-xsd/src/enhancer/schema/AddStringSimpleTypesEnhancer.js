// @flow
import type { MetaEdEnvironment, EnhancerResult, StringType } from '../../../../metaed-core/index';
import type { SimpleTypeBaseEdfiXsd } from '../../model/SimpleTypeBase';
import type { ModelBaseEdfiXsd } from '../../model/ModelBase';
import { NoSimpleType } from '../../model/schema/SimpleType';
import type { SimpleType } from '../../model/schema/SimpleType';
import { newStringSimpleType } from '../../model/schema/StringSimpleType';
import { newAnnotation } from '../../model/schema/Annotation';

const enhancerName: string = 'AddStringSimpleTypesEnhancer';

function createSchemaSimpleType(stringType: StringType): SimpleType {
  if (stringType.generatedSimpleType && stringType.minLength === '' && stringType.maxLength === '') {
    return NoSimpleType;
  }

  return Object.assign(newStringSimpleType(), {
    name: ((stringType.data.edfiXsd: any): ModelBaseEdfiXsd).xsd_MetaEdNameWithExtension(),
    annotation: Object.assign(newAnnotation(), {
      documentation: stringType.documentation,
      typeGroup: 'Simple',
    }),
    baseType: 'xs:string',
    minLength: stringType.minLength,
    maxLength: stringType.maxLength,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.stringType.forEach(stringType => {
    ((stringType.data.edfiXsd: any): SimpleTypeBaseEdfiXsd).xsd_SimpleType = createSchemaSimpleType(stringType);
  });

  return {
    enhancerName,
    success: true,
  };
}
