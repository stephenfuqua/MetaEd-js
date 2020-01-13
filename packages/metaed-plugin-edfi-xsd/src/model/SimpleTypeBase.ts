import { Namespace } from 'metaed-core';
import { SimpleType } from './schema/SimpleType';

export function metaEdNameWithExtension(namespace: Namespace, metaEdName: string): string {
  const { projectExtension }: { projectExtension: string } = namespace;
  return projectExtension ? `${projectExtension}-${metaEdName}` : metaEdName;
}

export interface SimpleTypeBase {
  xsdSimpleType: SimpleType;
  xsdMetaEdNameWithExtension: string;
}
