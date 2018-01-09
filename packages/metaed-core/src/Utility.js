// @flow
import R from 'ramda';
import semver from 'semver';
import type { SemVer } from './MetaEdEnvironment';

export function prependIndefiniteArticle(phrase: string): string {
  if (phrase == null || phrase === '') return '';
  const firstChar = phrase.charAt(0).toLowerCase();
  if ('aeiou'.includes(firstChar)) {
    return `an ${phrase}`;
  }
  return `a ${phrase}`;
}

export const orderByProp = (prop: string) => R.sortBy(R.compose(R.toLower, R.prop(prop)));

export const versionSatisfies = (version: SemVer, range: SemVer): boolean => semver.satisfies(version, range);

export function deepFreeze<T>(target: T): T {
  R.map(R.when(R.or(R.is(Object), R.is(Array)), deepFreeze))(target);
  return Object.freeze(target);
}

export function deepFreezeAssign<T>(target: T, ...sources: Array<any>): T {
  return deepFreeze(Object.assign(target, ...sources));
}
