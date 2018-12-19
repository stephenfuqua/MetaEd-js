import deepFreeze from 'deep-freeze';
import { newNamespace } from '../Namespace';
import { Namespace } from '../Namespace';
import { newTopLevelEntity } from '../TopLevelEntity';
import { TopLevelEntity } from '../TopLevelEntity';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { PropertyType } from './PropertyType';
import { ReferentialProperty } from './ReferentialProperty';
import { SimpleProperty } from './SimpleProperty';

/**
 *
 */
export type HasReferencedEntity = ReferentialProperty | SimpleProperty;

/**
 *
 */
export type EntityPropertySourceMap = {
  type: SourceMap;
  documentation: SourceMap;
  documentationInherited: SourceMap;
  metaEdName: SourceMap;
  metaEdId: SourceMap;
  namespace: SourceMap;
  baseKeyName: SourceMap;
  shortenTo: SourceMap;
  propertyPathName: SourceMap;
  parentEntityName: SourceMap;
  parentEntity: SourceMap;
  isPartOfIdentity: SourceMap;
  isIdentityRename: SourceMap;
  isRequired: SourceMap;
  isOptional: SourceMap;
  isRequiredCollection: SourceMap;
  isOptionalCollection: SourceMap;
  isQueryableOnly: SourceMap;
  withContext: SourceMap;
  hasRestriction: SourceMap;
  referencedType: SourceMap;
  mergeTargetedBy: SourceMap;
};

/**
 *
 */
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

/**
 * EntityProperty is the base type for all properties.
 *
 * **type** is the property type as a string enumeration.  Examples are "domainEntity", "descriptor", "sharedString".
 *
 * **typeHumanizedName** is the property type as a displayable string for end user messages.
 *
 * **documentation** is the property documentation corresponding to the "documentation" keyword.
 *
 * **documentationInherited** is true if the "documentation inherited" keyword was used.
 *
 * **metaEdName** is the property name as defined by the identifier.  The metaEdName uniquely identifies a property on an entity.
 *
 * **metaEdId** is the optional MetaEdId as a string.
 *
 * **namespace** is a reference to the namespace this property (and its parent entity) is in.
 *
 * **baseKeyName** is the optional metaEdName for a given identity property rename.
 *
 * **shortenTo** is the optional shortenTo name for a with context -> shorten to directive.
 *
 * **propertyPathName** is the property name, prepended with the optional withContext name.
 *
 * **parentEntityName** is the metaEdName of the parent entity
 *
 * **parentEntity** is a reference to the parent entity.
 *
 * **isPartOfIdentity** is true if the "is part of identity" keyword applies.
 *
 * **isIdentityRename** is true if the "renames identity property" keyword applies.
 *
 * **isRequired** is true if the "is required" keyword applies.
 *
 * **isOptional** is true if the "is optional" keyword applies.
 *
 * **isRequiredCollection** is true if the "is required collection" keyword applies.
 *
 * **isOptionalCollection** is true if the "is optional collection" keyword applies.
 *
 * **isQueryableOnly** is true if the "is queryable only" keyword applies.
 *
 * **withContext** is true if the "renames identity property" keyword applies.
 *
 * **hasRestriction** is true if the property has a value restriction for its type, such as "min length" or "max value".
 *
 * **referencedType** is the optional metaEdName of the type being referenced, when it differs from the property's metaEdName.
 *
 * **mergeTargetedBy** is the list of all EntityProperties that are targeting this property for a merge.
 *
 * **sourceMap** annotates where in the .metaed files each piece of data for this property derives from.
 *
 * **data** is the place where plugins are allowed to annotate the property with their own plugin-specfic data.
 */
export type EntityProperty = {
  type: PropertyType;
  typeHumanizedName: string;
  documentation: string;
  documentationInherited: boolean;
  metaEdName: string;
  metaEdId: string;
  namespace: Namespace;
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
  mergeTargetedBy: Array<EntityProperty>;
  sourceMap: EntityPropertySourceMap;
  data: any;
};

/**
 *
 */
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

/**
 *
 */
export const NoEntityProperty: EntityProperty = deepFreeze({
  ...newEntityProperty(),
  metaEdName: 'NoEntityProperty',
});
