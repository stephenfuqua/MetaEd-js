// @flow
import R from 'ramda';

export const findDuplicates = R.memoize(
  R.compose(R.map(R.head), R.filter(x => x.length > 1), R.values, R.groupBy(R.identity)),
);
