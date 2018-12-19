import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type DomainEntityExtensionSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newDomainEntityExtensionSourceMap(): DomainEntityExtensionSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface DomainEntityExtension extends TopLevelEntity {
  sourceMap: DomainEntityExtensionSourceMap;
}

/**
 *
 */
export function newDomainEntityExtension(): DomainEntityExtension {
  return {
    ...newTopLevelEntity(),
    type: 'domainEntityExtension',
    typeHumanizedName: 'Domain Entity Extension',
    sourceMap: newDomainEntityExtensionSourceMap(),
  };
}

/**
 *
 */
export const asDomainEntityExtension = (x: ModelBase): DomainEntityExtension => x as DomainEntityExtension;
