// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap } from './EntityProperty';

export class AssociationPropertySourceMap extends ReferentialPropertySourceMap {
  isWeak: ?SourceMap;
}

export class AssociationProperty extends ReferentialProperty {
  isWeak: boolean;
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | AssociationPropertySourceMap;
}

export function associationPropertyFactory(): AssociationProperty {
  return Object.assign(new AssociationProperty(), defaultReferentialProperty(), {
    type: 'association',
    isWeak: false,
    sourceMap: new AssociationPropertySourceMap(),
  });
}
