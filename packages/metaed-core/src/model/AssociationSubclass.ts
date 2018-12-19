import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type AssociationSubclassSourceMap = TopLevelEntitySourceMap;

/**
 *
 */
export function newAssociationSubclassSourceMap(): AssociationSubclassSourceMap {
  return newTopLevelEntitySourceMap();
}

export interface AssociationSubclass extends TopLevelEntity {
  sourceMap: AssociationSubclassSourceMap;
}

/**
 *
 */
export function newAssociationSubclass(): AssociationSubclass {
  return {
    ...newTopLevelEntity(),
    type: 'associationSubclass',
    typeHumanizedName: 'Association Subclass',
    sourceMap: newAssociationSubclassSourceMap(),
  };
}

/**
 *
 */
export const asAssociationSubclass = (x: ModelBase): AssociationSubclass => x as AssociationSubclass;
