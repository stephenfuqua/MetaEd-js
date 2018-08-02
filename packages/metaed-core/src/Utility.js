// @flow
import R from 'ramda';
import semver from 'semver';
import type { SemVer } from './MetaEdEnvironment';

export const nextMacroTask = (): Promise<void> => new Promise(resolve => setImmediate(resolve));

export function lowercaseAndNumericOnly(aString: string): ?string {
  const alphanumericMatches: ?Array<string> = aString.match(/[a-zA-Z0-9]+/g);
  if (alphanumericMatches == null) return null;
  const alphanumericOnly = alphanumericMatches.join('');
  const leadingAlphaCharacter = /^[a-zA-Z]/;
  if (!alphanumericOnly || !alphanumericOnly.match(leadingAlphaCharacter)) return null;
  return alphanumericOnly.toLowerCase();
}

export function prependIndefiniteArticle(phrase: string): string {
  if (phrase == null || phrase === '') return '';
  const firstChar = phrase.charAt(0).toLowerCase();
  if ('aeiou'.includes(firstChar)) {
    return `an ${phrase}`;
  }
  return `a ${phrase}`;
}

export const orderByProp = (prop: string) =>
  R.sortBy(
    R.compose(
      R.toLower,
      R.prop(prop),
    ),
  );

export const V2Only: SemVer = '^2.x';
export const V3OrGreater: SemVer = '>=3.x';
// https://github.com/npm/node-semver
export const versionSatisfies = (version: SemVer, range: SemVer): boolean => semver.satisfies(version, range);

export function normalizeSuffix(base: string, suffix: string) {
  return base.endsWith(suffix) ? base : base + suffix;
}

const descriptor: string = 'Descriptor';
const type: string = 'Type';

export function normalizeDescriptorSuffix(base: string) {
  return normalizeSuffix(base, descriptor);
}

export function normalizeEnumerationSuffix(base: string) {
  return normalizeSuffix(base, type);
}
