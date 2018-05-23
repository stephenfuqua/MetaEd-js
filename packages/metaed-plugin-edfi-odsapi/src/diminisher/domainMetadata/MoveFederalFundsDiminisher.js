// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { versionSatisfies, Namespace } from 'metaed-core';
import type { NamespaceEdfiOdsApi } from '../../model/Namespace';
import type { Aggregate } from '../../model/domainMetadata/Aggregate';
import type { EntityTable } from '../../model/domainMetadata/EntityTable';

const enhancerName: string = 'MoveFederalFundsDiminisher';
const targetVersions: string = '2.x';
const affectedTables = ['LocalEducationAgencyFederalFunds', 'StateEducationAgencyFederalFunds'];

function remove(array: Array<EntityTable>, element: EntityTable) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

// Remove the existing entity table records for the affected tables
export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const aggregatesToClean = ((coreNamespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.filter((a: Aggregate) =>
    a.entityTables.some((et: EntityTable) => affectedTables.includes(et.table)),
  );

  // Only if this is DS 2.0
  if (aggregatesToClean.length !== 0) {
    aggregatesToClean.forEach((aggregate: Aggregate) => {
      aggregate.entityTables
        .filter((et: EntityTable) => affectedTables.includes(et.table))
        .forEach((et: EntityTable) => remove(aggregate.entityTables, et));
    });

    affectedTables.forEach((affectedTable: string) => {
      const newAggregate: Aggregate = {
        root: affectedTable,
        schema: 'edfi',
        allowPrimaryKeyUpdates: false,
        isExtension: false,
        entityTables: [
          {
            table: affectedTable,
            isA: null,
            isAbstract: false,
            isRequiredCollection: false,
            schema: 'edfi',
            hasIsA: false,
            requiresSchema: false,
          },
        ],
      };

      ((coreNamespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates.push(newAggregate);
    });
  }

  return {
    enhancerName,
    success: true,
  };
}
