import R from 'ramda';

export function appendOverlapping(base: string, suffix: string): string {
  return R.compose(
    R.concat(base),
    /* eslint-disable-next-line no-underscore-dangle */
    R.drop(R.__, suffix),
    R.length,
    /* eslint-disable-next-line no-underscore-dangle */
    R.until(R.endsWith(R.__, base), R.init),
    R.take(R.min(base.length, suffix.length)),
  )(suffix);
}

export function prependroleNameToMetaEdName(metaEdName: string, roleName: string) {
  return roleName + metaEdName;
}

export function escapeSqlSingleQuote(string: string): string {
  return string.replace(/'/g, "''");
}
