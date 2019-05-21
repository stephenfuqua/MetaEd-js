import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { EntityProperty } from './EntityProperty';

export interface DomainEntityPropertySourceMap extends ReferentialPropertySourceMap {
  isWeak: SourceMap;
  definesAssociation: SourceMap;
}

/**
 *
 */
export function newDomainEntityPropertySourceMap(): DomainEntityPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
    isWeak: NoSourceMap,
    definesAssociation: NoSourceMap,
  };
}

export interface DomainEntityProperty extends ReferentialProperty {
  sourceMap: DomainEntityPropertySourceMap;
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
    isWeak: false,
    definesAssociation: false,
    sourceMap: newDomainEntityPropertySourceMap(),
  };
}

/**
 *
 */
export const asDomainEntityProperty = (x: EntityProperty): DomainEntityProperty => x as DomainEntityProperty;
