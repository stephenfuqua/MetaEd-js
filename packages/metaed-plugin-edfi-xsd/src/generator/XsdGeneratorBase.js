// @flow
import R from 'ramda';
import handlebars from 'handlebars';
import prettifyXml from 'prettify-xml';
import fs from 'fs';
import path from 'path';
import semverLib from 'semver';
import type { SemVer } from '../../../metaed-core/index';

// Handlebars instance scoped for this plugin
export const xsdHandlebars = handlebars.create();

function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

export function templateNamed(templateName: string) {
  return xsdHandlebars.compile(templateString(templateName));
}

export const template = R.memoize(
  () =>
    ({
      interchange: templateNamed('interchange'),
      schema: templateNamed('schema'),
      schemaAnnotation: templateNamed('schemaAnnotation'),
      xsdWithHeader: templateNamed('xsdWithHeader'),
    }),
  );

export const registerPartials = R.once(
  () => {
    xsdHandlebars.registerPartial({
      annotation: templateString('annotation'),
      attribute: templateString('attribute'),
      complexType: templateString('complexType'),
      complexTypeItem: templateString('complexTypeItem'),
      simpleType: templateString('simpleType'),
    });
  });

export function formatAndPrependHeader(xsdBody: string): string {
  const completeXsd = template().xsdWithHeader({
    xsdBody,
    copyrightYear: new Date().getFullYear(),
  });
  return prettifyXml(completeXsd, { indent: 2, newline: '\n' });
}

export function formatVersionForSchema(version: SemVer): string {
  if (!semverLib.valid(version)) return '';
  const semverified = semverLib.parse(version);
  const major: string = semverified.major < 10 ? `0${semverified.major}` : `${semverified.major}`;
  const minor: string = semverified.minor < 10 ? `${semverified.minor}0` : `${semverified.minor}`;
  const patch: string = semverified.patch === 0 ? '' : `${semverified.minor}`;
  const prerelease: string = semverified.prerelease.length ? `-${semverified.prerelease.join('.')}` : '';
  return `${major}${minor}${patch}${prerelease}`;
}
