// @flow
import xpath from 'xpath';
import { DOMParser } from 'xmldom';
import type { Workbook } from '../model/Workbook';
import { newWorkbook, exportWorkbook } from '../model/Workbook';
import type { Row } from '../model/Row';
import { newRow, createRow, setRow } from '../model/Row';
import type { Worksheet } from '../model/Worksheet';
import { newWorksheet } from '../model/Worksheet';
import InitializeXsdGenerator from '../../../metaed-plugin-edfi-xsd/src/edfiXsd';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from '../../../metaed-core/index';

const generatorName: string = 'Xml Data Dictionary Generator';
export const xpathSelect = xpath.useNamespaces({
  xs: 'http://www.w3.org/2001/XMLSchema',
  ann: 'http://ed-fi.org/annotation',
});
function byNameDesc(a, b) {
  if (a.Name < b.Name) return -1;
  if (a.Name > b.Name) return 1;
  return 0;
}
function getRestrictions(node): string {
  const results = xpathSelect('./xs:restriction/*', node);

  return results.reduce((res, restriction) => (
    restriction.nodeName === 'xs:enumeration' ?

    `${res}${restriction.getAttribute('value')}\n`
    :
    `${res}${restriction.localName}: ${restriction.getAttribute('value')}
`

  ),
   '');
}
function getParentType(node): string {
  if (!node.attributes) return '';
  if (node.nodeName === 'xs:complexType') return node.getAttribute('name');
  return getParentType(node.parentNode);
}
function getDocumentation(node): string {
  const results = xpathSelect('./xs:annotation/xs:documentation', node);
  if (results.length > 0) return results[0].textContent;
  return '';
}
function getCardinality(node): string {
  let card = '';
  if (node.hasAttribute('minOccurs')) card = `${card}minOccurs: ${node.getAttribute('minOccurs')}\n`;
  if (node.hasAttribute('maxOccurs')) card = `${card}maxOccurs: ${node.getAttribute('maxOccurs')}\n`;
  return card;
}
function generateWorkbookFromXsd(xsdOutput: Array<GeneratedOutput>): GeneratorResult {
  const parser = new DOMParser();
  const parseXml = (xmlString: string) => parser.parseFromString(xmlString);
  const allProps = [];
  const allComplexTypes = [];
  const allSimpleTypes = [];

  xsdOutput.forEach((xsd) => {
    const doc = parseXml(xsd.resultString);
    allProps.push(...xpathSelect('//xs:element', doc));
    allComplexTypes.push(...xpathSelect('//xs:complexType', doc));
    allSimpleTypes.push(...xpathSelect('//xs:simpleType', doc));
  });
  const eBook: Workbook = newWorkbook();

  const elementsSheet: Worksheet = newWorksheet('Elements');
  allProps.forEach((prop) => {
    const eRow: Row = newRow();
    setRow(eRow, 'Name', prop.getAttribute('name'));
    setRow(eRow, 'Type', prop.getAttribute('type'));
    setRow(eRow, 'Parent Type', getParentType(prop));
    setRow(eRow, 'Cardinality', getCardinality(prop));
    setRow(eRow, 'Description', getDocumentation(prop));
    elementsSheet.rows.push(createRow(eRow));
    elementsSheet.rows.sort(byNameDesc);
    elementsSheet['!cols'] = [{ wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 500 }];
  });

  const complexSheet: Worksheet = newWorksheet('Complex Types');
  allComplexTypes.forEach((complexType) => {
    const eRow: Row = newRow();
    setRow(eRow, 'Name', complexType.getAttribute('name'));
    setRow(eRow, 'Description', getDocumentation(complexType));
    complexSheet.rows.push(createRow(eRow));
    complexSheet.rows.sort(byNameDesc);
    complexSheet['!cols'] = [{ wpx: 100 }, { wpx: 500 }];
  });

  const simpleSheet: Worksheet = newWorksheet('Simple Types');
  allSimpleTypes.forEach((simpleType) => {
    const eRow: Row = newRow();
    setRow(eRow, 'Name', simpleType.getAttribute('name'));
    setRow(eRow, 'Restrictions', getRestrictions(simpleType));
    setRow(eRow, 'Description', getDocumentation(simpleType));
    simpleSheet.rows.push(createRow(eRow));
    simpleSheet.rows.sort(byNameDesc);
    simpleSheet['!cols'] = [{ wpx: 100 }, { wpx: 100 }, { wpx: 500 }];
  });

  eBook.sheets.push(elementsSheet);
  eBook.sheets.push(complexSheet);
  eBook.sheets.push(simpleSheet);

  const generatedOutput: Array<GeneratedOutput> =
    [
      {
        name: 'XmlDataDictionary',
        fileName: 'XmlDataDictionary.xlsx',
        folderName: 'Documentation',
        resultString: '',
        resultStream: exportWorkbook(eBook, 'buffer'),
      },
    ];

  return {
    generatorName,
    generatedOutput,
  };
}
export function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  // only need the xsd generator (index 0), not the schema annotation generator.
  const xsdGenerator = InitializeXsdGenerator().generator[0];
  const xsdOutput: Array<GeneratedOutput> = xsdGenerator(metaEd).generatedOutput;
  return generateWorkbookFromXsd(xsdOutput);
}
export function generateFromXsd(xsdOutput: GeneratorResult): GeneratorResult {
  return generateWorkbookFromXsd(xsdOutput.generatedOutput);
}
