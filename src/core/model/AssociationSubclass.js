// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class AssociationSubclassSourceMap extends TopLevelEntitySourceMap {}

export class AssociationSubclass extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | AssociationSubclassSourceMap;
}

export function associationSubclassFactory(): AssociationSubclass {
  return Object.assign(new AssociationSubclass(), defaultTopLevelEntity(), {
    type: 'associationSubclass',
    typeHumanizedName: 'Association Subclass',
    sourceMap: new AssociationSubclassSourceMap(),
  });
}
