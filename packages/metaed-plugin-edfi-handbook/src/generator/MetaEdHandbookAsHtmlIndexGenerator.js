// @flow
import path from 'path';
import fs from 'fs';
import type { MetaEdEnvironment, GeneratorResult, GeneratedOutput, PluginEnvironment } from 'metaed-core';
import type { HandbookEntry, HandbookEntityReferenceProperty } from '../model/HandbookEntry';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const handbookEntries: Array<HandbookEntry> = (((metaEd.plugin.get('edfiHandbook'): any): PluginEnvironment)
    .entity: EdfiHandbookRepository).handbookEntries;

  const updateHandbookEntries = handbookEntries.map(x => {
    const referringProperties: Array<HandbookEntityReferenceProperty> = handbookEntries
      .filter(
        y =>
          y.modelReferencesContainsProperties != null &&
          y.modelReferencesContainsProperties.filter(z => x.uniqueIdentifier === z.referenceUniqueIdentifier).length,
      )
      .map(y => ({
        edFiId: y.edFiId,
        targetPropertyId: '',
        referenceUniqueIdentifier: y.uniqueIdentifier,
        name: y.name,
        dataType: '',
        isIdentity: false,
        cardinality: y.modelReferencesContainsProperties.filter(z => x.uniqueIdentifier === z.referenceUniqueIdentifier)[0]
          .cardinality,
        definition: '',
      }));

    x.modelReferencesUsedByProperties = referringProperties;
    return x;
  });

  let detail: string = fs.readFileSync(path.join(__dirname, './template/MetaEdHandbookAsHtmlSPADetail.html'), 'utf8');
  detail = detail.replace(/\n/g, ' ');
  detail = detail.replace(/>\s+</g, '><');
  detail = detail.replace(/\s{2,}/g, ' ');
  detail = detail.replace(/"/g, "'");
  const index: string = fs
    .readFileSync(path.join(__dirname, './template/MetaEdHandbookAsHtmlSPAIndex.html'), 'utf8')
    .replace(/\{JSONData\}/g, JSON.stringify(updateHandbookEntries))
    .replace(/\{detailTemplate\}/g, detail);

  const results: Array<GeneratedOutput> = [];
  results.push({
    name: 'MetaEd Ed-Fi Handbook',
    namespace: 'Documentation',
    folderName: 'Ed-Fi-Handbook',
    fileName: 'MetaEd-Handbook-Index.html',
    resultString: index,
    resultStream: null,
  });

  return {
    generatorName: 'MetaEdHandbookGenerator',
    generatedOutput: results,
  };
}
