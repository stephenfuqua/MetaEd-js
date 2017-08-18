// @flow
import { NamespaceInfo, newNamespaceInfo } from '../NamespaceInfo';
import { TopLevelEntity, newTopLevelEntity } from '../TopLevelEntity';
import type { SourceMap } from '../SourceMap';
import type { PropertyType } from './PropertyType';
import type { ReferentialProperty } from './ReferentialProperty';
import type { SimpleProperty } from './SimpleProperty';

export type HasReferencedEntity = ReferentialProperty | SimpleProperty;

export class EntityPropertySourceMap {
  type: ?SourceMap;
  documentation: ?SourceMap;
  documentationInherited: ?SourceMap;
  metaEdName: ?SourceMap;
  metaEdId: ?SourceMap;
  namespaceInfo: ?SourceMap;
  baseKeyName: ?SourceMap;
  shortenTo: ?SourceMap;
  propertyPathName: ?SourceMap;
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
  typeHumanizedName: string;
  documentation: string;
  documentationInherited: boolean;
  metaEdName: string;
  metaEdId: string;
  namespaceInfo: NamespaceInfo;
  baseKeyName: string;
  shortenTo: string;
  propertyPathName: string;
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
  data: any;
}

export function newEntityPropertyFields() {
  return {
    type: 'unknown',
    typeHumanizedName: '',
    documentation: '',
    documentationInherited: false,
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),
    baseKeyName: '',
    shortenTo: '',
    propertyPathName: '',
    parentEntityName: '',
    parentEntity: newTopLevelEntity(),
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
    data: {},
  };
}

export function newEntityProperty(): EntityProperty {
  return Object.assign(new EntityProperty(), newEntityPropertyFields());
}

export const NoEntityProperty: EntityProperty = Object.assign(newEntityProperty(), {
  metaEdName: 'NoEntityProperty',
});
