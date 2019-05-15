import path from 'path';
import fs from 'fs';
import { MetaEdEnvironment, GeneratorResult, GeneratedOutput, Namespace } from 'metaed-core';
import { edfiHandbookRepositoryForNamespace } from '../enhancer/EnhancerHelper';
import { HandbookEntry, HandbookEntityReferenceProperty } from '../model/HandbookEntry';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

function handbookEntriesForNamespace(metaEd: MetaEdEnvironment, namespace: Namespace): HandbookEntry[] {
  const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, namespace);
  if (handbookRepository == null) return [];
  return handbookRepository.handbookEntries;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const handbookEntries: HandbookEntry[] = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    handbookEntries.push(...handbookEntriesForNamespace(metaEd, namespace));
  });

  // unclear why this needs to be a map operation rather than forEach, as it's just mutating a part of x
  const updateHandbookEntries = handbookEntries.map(x => {
    const referringProperties: HandbookEntityReferenceProperty[] = handbookEntries
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

  const results: GeneratedOutput[] = [];
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
