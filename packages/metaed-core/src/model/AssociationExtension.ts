import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type AssociationExtensionSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newAssociationExtensionSourceMap(): AssociationExtensionSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface AssociationExtension extends TopLevelEntity {
  sourceMap: AssociationExtensionSourceMap;
}

/**
 *
 */
export function newAssociationExtension(): AssociationExtension {
  return {
    ...newTopLevelEntity(),
    type: 'associationExtension',
    typeHumanizedName: 'Association Extension',
    sourceMap: newAssociationExtensionSourceMap(),
  };
}
/**
 *
 */
export const asAssociationExtension = (x: ModelBase): AssociationExtension => x as AssociationExtension;
