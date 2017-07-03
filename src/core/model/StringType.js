// @flow
import type { SourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import type { EntityProperty } from './property/EntityProperty';
import { namespaceInfoFactory } from './NamespaceInfo';

export class StringTypeSourceMap extends ModelBaseSourceMap {
  documentationInherited: ?SourceMap;
  minLength: ?SourceMap;
  maxLength: ?SourceMap;
}

export class StringType extends ModelBase {
  generatedSimpleType: boolean;
  documentationInherited: boolean;
  typeHumanizedName: string;
  minLength: string;
  maxLength: string;
  referringSimpleProperties: Array<EntityProperty>;
  sourceMap: StringTypeSourceMap;
}

export function stringTypeFactory(): StringType {
  return Object.assign(new StringType(), {
    type: 'stringType',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    typeHumanizedName: 'String Type',
    minLength: '',
    maxLength: '',
    referringSimpleProperties: [],
    sourceMap: new StringTypeSourceMap(),
  });
}

export const NoStringType: StringType = Object.assign(stringTypeFactory(), {
  metaEdName: 'NoStringType',
});
