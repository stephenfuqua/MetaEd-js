// @flow
import Handlebars from 'handlebars';
import xmlFormatter from 'xml-formatter';
import ffs from 'final-fs';

const templateForXsdWithHeader = Handlebars.compile(ffs.readFileSync('./templates/XsdWithHeader.hbs', 'utf-8'));

export function formatAndPrependHeader(xsdBody: string): string {
  return templateForXsdWithHeader({
    XsdBody: xmlFormatter(xsdBody, { indentation: '  ' }),
    CopyrightYear: '1234567890',
  });
}
