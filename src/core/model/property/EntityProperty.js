// @flow
import { NamespaceInfo, namespaceInfoFactory } from '../NamespaceInfo';
import { TopLevelEntity, defaultTopLevelEntity } from '../TopLevelEntity';
import type { SourceMap } from '../SourceMap';
import type { PropertyType } from './PropertyType';

export class EntityPropertySourceMap {
  type: ?SourceMap;
  documentation: ?SourceMap;
  documentationInherited: ?SourceMap;
  metaEdName: ?SourceMap;
  metaEdId: ?SourceMap;
  namespaceInfo: ?SourceMap;
  baseKeyName: ?SourceMap;
  shortenTo: ?SourceMap;
  propertyNamePath: ?SourceMap;
  parentEntityName: ?SourceMap;
  parentEntity: ?SourceMap;
  isPartOfIdentity: ?SourceMap;
  isIdentityRename: ?SourceMap;
  isRequired: ?SourceMap;
  isOptional: ?SourceMap;
  isRequiredCollection: ?SourceMap;
  isOptionalCollection: ?SourceMap;
  isQueryableOnly: ?SourceMap;
  withContext: ?SourceMap;
  hasRestriction: ?SourceMap;
  referencedType: ?SourceMap;
}

export class EntityProperty {
  type: PropertyType;
  documentation: string;
  documentationInherited: boolean;
  metaEdName: string;
  metaEdId: string;
  namespaceInfo: NamespaceInfo;
  baseKeyName: string;
  shortenTo: string;
  propertyNamePath: string;
  parentEntityName: string;
  parentEntity: TopLevelEntity;
  isPartOfIdentity: boolean;
  isIdentityRename: boolean;
  isRequired: boolean;
  isOptional: boolean;
  isRequiredCollection: boolean;
  isOptionalCollection: boolean;
  isQueryableOnly: boolean;
  withContext: string;
  hasRestriction: boolean;
  referencedType: string;
  sourceMap: EntityPropertySourceMap;
}

export function defaultEntityPropertyFields() {
  return {
    type: 'unknown',
    documentation: '',
    documentationInherited: false,
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    baseKeyName: '',
    shortenTo: '',
    propertyNamePath: '',
    parentEntityName: '',
    parentEntity: defaultTopLevelEntity(),
    isPartOfIdentity: false,
    isIdentityRename: false,
    isRequired: false,
    isOptional: false,
    isRequiredCollection: false,
    isOptionalCollection: false,
    isQueryableOnly: false,
    withContext: '',
    hasRestriction: false,
    referencedType: '',
    sourceMap: new EntityPropertySourceMap(),
  };
}

export function defaultEntityProperty(): EntityProperty {
  return Object.assign(new EntityProperty(), defaultEntityPropertyFields());
}

export const NoEntityProperty: EntityProperty = Object.assign(defaultEntityProperty(), {
  metaEdName: 'NoEntityProperty',
});
