// @flow
import { memoize } from 'ramda';
import type { ModelType } from '../../../../../packages/metaed-core/src/model/ModelType';

export const excludedModelTypes = memoize((allModelTypes: ModelType[], includedModelTypes: ModelType[]) => allModelTypes.filter(type => includedModelTypes.every(x => x !== type)));
