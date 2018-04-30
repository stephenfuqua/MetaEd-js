// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';
import type { SourceMap } from './SourceMap';

export class AssociationSourceMap extends TopLevelEntitySourceMap {
  isAbstract: ?SourceMap;
}

export class Association extends TopLevelEntity {
  isAbstract: boolean;
  sourceMap: TopLevelEntitySourceMap | AssociationSourceMap;
}

export function newAssociation(): Association {
  return Object.assign(new Association(), newTopLevelEntity(), {
    type: 'association',
    typeHumanizedName: 'Association',
    isAbstract: false,
    sourceMap: new AssociationSourceMap(),
  });
}

export const asAssociation = (x: ModelBase): Association => ((x: any): Association);
