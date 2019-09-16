import fs from 'fs';
import path from 'path';
import ramda from 'ramda';
import handlebars from 'handlebars';
import { SimpleType } from 'metaed-plugin-edfi-xsd';
import { HandbookEntry } from '../model/HandbookEntry';
import { newHandbookEntry } from '../model/HandbookEntry';

function generatedTableSqlFor(name: string, columnDefinition: string): string[] {
  return [`${name} ${columnDefinition}`];
}

function getTemplateString(templateName: string): string {
  return fs.readFileSync(path.join(__dirname, './template/', `${templateName}.hbs`), 'utf8');
}

const getSimpleTypeTemplate: () => (any) => string = ramda.once(() => handlebars.compile(getTemplateString('simpleType')));

const registerPartials: () => void = ramda.once(() => {
  handlebars.registerPartial({
    annotation: getTemplateString('annotation'),
    attribute: getTemplateString('attribute'),
  });
});

function generatedXsdFor(entity: SimpleType): string {
  registerPartials();
  const template: (any) => string = getSimpleTypeTemplate();
  return template(entity);
}

export function createDefaultHandbookEntry(
  property: SimpleType,
  edfiId: string,
  name: string,
  documentation: string,
  columnDefinition: string,
): HandbookEntry {
  return {
    ...newHandbookEntry(),
    definition: documentation,
    edFiId: edfiId,
    // This is the way the UI seaches for entities
    uniqueIdentifier: name + edfiId,
    entityType: `${name} Base Type`,
    modelReferencesUsedBy: [],
    name,
    projectName: 'EdFi',
    odsFragment: generatedTableSqlFor(name, columnDefinition),
    optionList: [],
    typeCharacteristics: [],
    xsdFragment: generatedXsdFor(property),
  };
}
