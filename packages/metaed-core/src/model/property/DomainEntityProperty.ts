import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';
import { EntityProperty } from './EntityProperty';

export interface DomainEntityPropertySourceMap extends ReferentialPropertySourceMap {
  potentiallyLogical: SourceMap;
  isWeak: SourceMap;
  definesAssociation: SourceMap;
}

/**
 *
 */
export function newDomainEntityPropertySourceMap(): DomainEntityPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
    potentiallyLogical: NoSourceMap,
    isWeak: NoSourceMap,
    definesAssociation: NoSourceMap,
  };
}

export interface DomainEntityProperty extends ReferentialProperty {
  sourceMap: DomainEntityPropertySourceMap;
  potentiallyLogical: boolean;
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
    potentiallyLogical: false,
    isWeak: false,
    definesAssociation: false,
    sourceMap: newDomainEntityPropertySourceMap(),
  };
}

/**
 *
 */
export const asDomainEntityProperty = (x: EntityProperty): DomainEntityProperty => x as DomainEntityProperty;
