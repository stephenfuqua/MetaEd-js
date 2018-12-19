import { Interchange } from './Interchange';
import { newInterchange } from './Interchange';
import { ModelBase } from './ModelBase';

/**
 *
 */
export type InterchangeExtension = Interchange;

/**
 *
 */
export function newInterchangeExtension(): InterchangeExtension {
  return {
    ...newInterchange(),
    type: 'interchangeExtension',
    typeHumanizedName: 'Interchange Extension',
  };
}

/**
 *
 */
export const asInterchangeExtension = (x: ModelBase): InterchangeExtension => x as InterchangeExtension;
