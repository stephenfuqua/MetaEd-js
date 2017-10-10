// @flow
import { memoize, difference } from 'ramda';
import type { ModelType } from '../../../../metaed-core/index';

export const excludedModelTypes = memoize((allModelTypes: ModelType[], includedModelTypes: ModelType[]) => difference(allModelTypes, includedModelTypes));
