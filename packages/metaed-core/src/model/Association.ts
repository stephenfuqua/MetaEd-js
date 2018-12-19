import deepFreeze from 'deep-freeze';
import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { ModelBase } from './ModelBase';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export interface AssociationSourceMap extends TopLevelEntitySourceMap {
  isAbstract: SourceMap;
}

/**
 *
 */
export function newAssociationSourceMap(): AssociationSourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    isAbstract: NoSourceMap,
  };
}

export interface Association extends TopLevelEntity {
  sourceMap: AssociationSourceMap;
  isAbstract: boolean;
}

/**
 *
 */
export function newAssociation(): Association {
  return {
    ...newTopLevelEntity(),
    type: 'association',
    typeHumanizedName: 'Association',
    isAbstract: false,
    sourceMap: newAssociationSourceMap(),
  };
}

/**
 *
 */
export const asAssociation = (x: ModelBase): Association => x as Association;

/**
 *
 */
export const NoAssociation: Association = deepFreeze({
  ...newAssociation(),
  metaEdName: 'NoAssociation',
});
