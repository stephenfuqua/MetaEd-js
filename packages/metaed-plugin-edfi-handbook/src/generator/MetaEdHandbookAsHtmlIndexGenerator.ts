import path from 'path';
import fs from 'fs';
import { MetaEdEnvironment, GeneratorResult, GeneratedOutput, Namespace } from 'metaed-core';
import { edfiHandbookRepositoryForNamespace } from '../enhancer/EnhancerHelper';
import { HandbookEntry } from '../model/HandbookEntry';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

function handbookEntriesForNamespace(metaEd: MetaEdEnvironment, namespace: Namespace): HandbookEntry[] {
  const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, namespace);
  if (handbookRepository == null) return [];
  return handbookRepository.handbookEntries;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const allHandbookEntries: HandbookEntry[] = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    allHandbookEntries.push(...handbookEntriesForNamespace(metaEd, namespace));
  });

  let detail: string = fs.readFileSync(path.join(__dirname, './template/MetaEdHandbookAsHtmlSPADetail.html'), 'utf8');
  detail = detail.replace(/\n/g, ' ');
  detail = detail.replace(/>\s+</g, '><');
  detail = detail.replace(/\s{2,}/g, ' ');
  detail = detail.replace(/"/g, "'");
  const index: string = fs
    .readFileSync(path.join(__dirname, './template/MetaEdHandbookAsHtmlSPAIndex.html'), 'utf8')
    .replace(/\{JSONData\}/g, JSON.stringify(allHandbookEntries))
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
