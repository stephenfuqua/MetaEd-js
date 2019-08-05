import { asTopLevelEntity, getAllTopLevelEntitiesForNamespaces } from 'metaed-core';
import { MetaEdEnvironment, EnhancerResult, EntityProperty, TopLevelEntity } from 'metaed-core';
import { NoTable } from './database/Table';
import { Table } from './database/Table';

export interface TopLevelEntityEdfiOds {
  odsTableName: string;
  odsCascadePrimaryKeyUpdates: boolean;
  odsProperties: EntityProperty[];
  odsIdentityProperties: EntityProperty[];
  odsEntityTable: Table;
  odsTables: Table[];
}

const enhancerName = 'OdsTopLevelEntitySetupEnhancer';

export function addTopLevelEntityEdfiOdsTo(topLevelEntity: TopLevelEntity) {
  if (topLevelEntity.data.edfiOds == null) topLevelEntity.data.edfiOds = {};

  Object.assign(topLevelEntity.data.edfiOds, {
    odsTableName: '',
    odsCascadePrimaryKeyUpdates: false,
    odsProperties: [...topLevelEntity.properties],
    odsIdentityProperties: [...topLevelEntity.identityProperties],
    odsEntityTable: NoTable,
    odsTables: [],
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces(Array.from(metaEd.namespace.values())).forEach(entity => {
    addTopLevelEntityEdfiOdsTo(asTopLevelEntity(entity));
  });

  return {
    enhancerName,
    success: true,
  };
}
