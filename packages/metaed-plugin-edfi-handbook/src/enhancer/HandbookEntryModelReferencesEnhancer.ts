import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';
import { HandbookEntityReferenceProperty } from '../model/HandbookEntryReferenceProperty';
import { HandbookEntry } from '../model/HandbookEntry';

const enhancerName = 'HandbookEntryModelReferencesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    const { handbookEntries } = handbookRepository;

    handbookEntries.forEach((handbookEntry: HandbookEntry) => {
      const modelReferencesUsedByProperties: HandbookEntityReferenceProperty[] = handbookEntries
        .filter(
          y =>
            y.modelReferencesContainsProperties != null &&
            y.modelReferencesContainsProperties.filter(z => handbookEntry.uniqueIdentifier === z.referenceUniqueIdentifier)
              .length,
        )
        .map(y => ({
          edFiId: y.edFiId,
          targetPropertyId: '',
          referenceUniqueIdentifier: y.uniqueIdentifier,
          name: y.name,
          deprecationText: y.deprecationText,
          dataType: '',
          isIdentity: false,
          cardinality: y.modelReferencesContainsProperties.filter(
            z => handbookEntry.uniqueIdentifier === z.referenceUniqueIdentifier,
          )[0].cardinality,
          definition: '',
        }));

      handbookEntry.modelReferencesUsedByProperties = modelReferencesUsedByProperties;
    });
  });
  return {
    enhancerName,
    success: true,
  };
}
