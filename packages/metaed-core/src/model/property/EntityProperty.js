// @flow
import deepFreeze from 'deep-freeze';
import { newNamespace } from '../Namespace';
import type { Namespace } from '../Namespace';
import { newTopLevelEntity } from '../TopLevelEntity';
import type { TopLevelEntity } from '../TopLevelEntity';
import type { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import type { PropertyType } from './PropertyType';
import type { ReferentialProperty } from './ReferentialProperty';
import type { SimpleProperty } from './SimpleProperty';

export type HasReferencedEntity = ReferentialProperty | SimpleProperty;

export type EntityPropertySourceMap = {
  type: SourceMap,
  documentation: SourceMap,
  documentationInherited: SourceMap,
  metaEdName: SourceMap,
  metaEdId: SourceMap,
  namespace: SourceMap,
  baseKeyName: SourceMap,
  shortenTo: SourceMap,
  propertyPathName: SourceMap,
  parentEntityName: SourceMap,
  parentEntity: SourceMap,
  isPartOfIdentity: SourceMap,
  isIdentityRename: SourceMap,
  isRequired: SourceMap,
  isOptional: SourceMap,
  isRequiredCollection: SourceMap,
  isOptionalCollection: SourceMap,
  isQueryableOnly: SourceMap,
  withContext: SourceMap,
  hasRestriction: SourceMap,
  referencedType: SourceMap,
};

export function newEntityPropertySourceMap(): EntityPropertySourceMap {
  return {
    type: NoSourceMap,
    documentation: NoSourceMap,
    documentationInherited: NoSourceMap,
    metaEdName: NoSourceMap,
    metaEdId: NoSourceMap,
    namespace: NoSourceMap,
    baseKeyName: NoSourceMap,
    shortenTo: NoSourceMap,
    propertyPathName: NoSourceMap,
    parentEntityName: NoSourceMap,
    parentEntity: NoSourceMap,
    isPartOfIdentity: NoSourceMap,
    isIdentityRename: NoSourceMap,
    isRequired: NoSourceMap,
    isOptional: NoSourceMap,
    isRequiredCollection: NoSourceMap,
    isOptionalCollection: NoSourceMap,
    isQueryableOnly: NoSourceMap,
    withContext: NoSourceMap,
    hasRestriction: NoSourceMap,
    referencedType: NoSourceMap,
    mergeTargetedBy: NoSourceMap,
  };
}

export type EntityProperty = {
  type: PropertyType,
  typeHumanizedName: string,
  documentation: string,
  documentationInherited: boolean,
  metaEdName: string,
  metaEdId: string,
  namespace: Namespace,
  baseKeyName: string,
  shortenTo: string,
  propertyPathName: string,
  parentEntityName: string,
  parentEntity: TopLevelEntity,
  isPartOfIdentity: boolean,
  isIdentityRename: boolean,
  isRequired: boolean,
  isOptional: boolean,
  isRequiredCollection: boolean,
  isOptionalCollection: boolean,
  isQueryableOnly: boolean,
  withContext: string,
  hasRestriction: boolean,
  referencedType: string,
  mergeTargetedBy: Array<EntityProperty>,
  sourceMap: EntityPropertySourceMap,
  data: any,
};

export function newEntityProperty(): EntityProperty {
  return {
    type: 'unknown',
    typeHumanizedName: '',
    documentation: '',
    documentationInherited: false,
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
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
    mergeTargetedBy: [],
    sourceMap: newEntityPropertySourceMap(),
    data: {},
  };
}

export const NoEntityProperty: EntityProperty = deepFreeze({
  ...newEntityProperty(),
  metaEdName: 'NoEntityProperty',
});
