// @flow
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import R from 'ramda';
import type { NamespaceInfo } from 'metaed-core';

export const odsPath: string = '/Database/SQLServer/ODS/';
export const dataPath: string = `${odsPath}Data/`;
export const structurePath: string = `${odsPath}Structure/`;

export function fileNameFor(prefix: string, namespaceInfo: NamespaceInfo, suffix: string): string {
  if (namespaceInfo.namespace === 'edfi') return `${prefix}-${suffix}.sql`;

  const extensionNamespace: string =
    namespaceInfo.projectExtension === ''
      ? namespaceInfo.namespace
      : `${namespaceInfo.projectExtension}-${namespaceInfo.namespace}`;
  return `${prefix}-${extensionNamespace}-${suffix}.sql`;
}

// Handlebars instance scoped for this plugin
export const odsHandlebars = handlebars.create();

function templateString(templateName: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', `${templateName}.hbs`)).toString();
}

export function templateNamed(templateName: string) {
  return odsHandlebars.compile(templateString(templateName));
}

export const template = R.memoize(() => ({
  coreSchema: templateNamed('coreSchema'),
  table: templateNamed('table'),
  foreignKey: templateNamed('foreignKey'),
  idIndexes: templateNamed('idIndexes'),
  extendedProperties: templateNamed('extendedProperties'),
  enumerationRow: templateNamed('enumerationRow'),
  schoolYearEnumerationRow: templateNamed('schoolYearEnumerationRow'),
  extensionSchema: templateNamed('extensionSchema'),
}));

export const registerPartials = R.once(() => {
  odsHandlebars.registerPartial({
    column: templateNamed('column'),
  });
});
