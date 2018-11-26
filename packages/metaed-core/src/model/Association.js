// @flow
import deepFreeze from 'deep-freeze';
import type { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export type AssociationSourceMap = {
  isAbstract: SourceMap,
  ...$Exact<TopLevelEntitySourceMap>,
};

export function newAssociationSourceMap(): AssociationSourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    isAbstract: NoSourceMap,
  };
}

export type Association = {
  sourceMap: AssociationSourceMap,
  ...$Exact<TopLevelEntity>,
  isAbstract: boolean,
};

export function newAssociation(): Association {
  return {
    ...newTopLevelEntity(),
    type: 'association',
    typeHumanizedName: 'Association',
    isAbstract: false,
    sourceMap: newAssociationSourceMap(),
  };
}

export const asAssociation = (x: ModelBase): Association => ((x: any): Association);

export const NoAssociation: Association = deepFreeze({
  ...newAssociation(),
  metaEdName: 'NoAssociation',
});
