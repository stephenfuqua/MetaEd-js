import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { EntityProperty } from './EntityProperty';

export interface AssociationPropertySourceMap extends ReferentialPropertySourceMap {
  possiblyExternal: SourceMap;
  isWeak: SourceMap;
}

/**
 *
 */
export function newAssociationPropertySourceMap(): AssociationPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
    possiblyExternal: NoSourceMap,
    isWeak: NoSourceMap,
  };
}

export interface AssociationProperty extends ReferentialProperty {
  sourceMap: AssociationPropertySourceMap;
  possiblyExternal: boolean;
  isWeak: boolean;
}

/**
 *
 */
export function newAssociationProperty(): AssociationProperty {
  return {
    ...newReferentialProperty(),
    type: 'association',
    typeHumanizedName: 'Association Property',
    possiblyExternal: false,
    isWeak: false,
    sourceMap: newAssociationPropertySourceMap(),
  };
}

/**
 *
 */
export const asAssociationProperty = (x: EntityProperty): AssociationProperty => x as AssociationProperty;
