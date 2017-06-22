// @flow

import type { PropertyType } from './PropertyType';
import type { EntityProperty } from './EntityProperty';

export type PropertyIndex = Map<PropertyType, Array<EntityProperty>>;
