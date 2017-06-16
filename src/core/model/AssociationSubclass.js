// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class AssociationSubclassSourceMap extends TopLevelEntitySourceMap {}

export class AssociationSubclass extends TopLevelEntity {
  sourceMap: AssociationSubclassSourceMap;
}

export function associationSubclassFactory(): AssociationSubclass {
  return Object.assign(new AssociationSubclass(), defaultTopLevelEntity(), {
    type: 'associationSubclass',
    typeGroupHumanizedName: 'Association Subclass',
    sourceMap: new AssociationSubclassSourceMap(),
  });
}
