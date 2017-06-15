// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';

export class AssociationPropertySourceMap extends ReferentialPropertySourceMap {
  isWeak: ?SourceMap;
}

export class AssociationProperty extends ReferentialProperty {
  isWeak: boolean;
  sourceMap: AssociationPropertySourceMap;
}

export function associationPropertyFactory(): AssociationProperty {
  return Object.assign(new AssociationProperty(), defaultReferentialProperty(), {
    type: 'association',
    isWeak: false,
    sourceMap: new AssociationPropertySourceMap(),
  });
}
