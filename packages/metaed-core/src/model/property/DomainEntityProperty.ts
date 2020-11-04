import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { EntityProperty } from './EntityProperty';

export interface DomainEntityPropertySourceMap extends ReferentialPropertySourceMap {
  possiblyExternal: SourceMap;
  isWeak: SourceMap;
  definesAssociation: SourceMap;
}

/**
 *
 */
export function newDomainEntityPropertySourceMap(): DomainEntityPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
    possiblyExternal: NoSourceMap,
    isWeak: NoSourceMap,
    definesAssociation: NoSourceMap,
  };
}

export interface DomainEntityProperty extends ReferentialProperty {
  sourceMap: DomainEntityPropertySourceMap;
  possiblyExternal: boolean;
  isWeak: boolean;
  definesAssociation: boolean;
}

/**
 *
 */
export function newDomainEntityProperty(): DomainEntityProperty {
  return {
    ...newReferentialProperty(),
    type: 'domainEntity',
    typeHumanizedName: 'Domain Entity Property',
    possiblyExternal: false,
    isWeak: false,
    definesAssociation: false,
    sourceMap: newDomainEntityPropertySourceMap(),
  };
}

/**
 *
 */
export const asDomainEntityProperty = (x: EntityProperty): DomainEntityProperty => x as DomainEntityProperty;
