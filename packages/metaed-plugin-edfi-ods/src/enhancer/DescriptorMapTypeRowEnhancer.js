// @flow
import R from 'ramda';
import type { EnhancerResult, MetaEdEnvironment, ModelBase } from 'metaed-core';
import { getAllEntitiesOfType, normalizeEnumerationSuffix } from 'metaed-core';
import { enumerationRowCreator } from './EnumerationRowCreator';
import { rowEntities } from './EnhancerHelper';
import type { EnumerationRow } from '../model/database/EnumerationRow';

// Descriptors with map types have enumeration values
const enhancerName: string = 'DescriptorMapTypeRowEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'descriptor').forEach((entity: ModelBase) => {
    if (!entity.data.edfiOds.ods_IsMapType) return;

    const rows: Array<EnumerationRow> = enumerationRowCreator.createRows(
      entity.namespace.namespaceName,
      normalizeEnumerationSuffix(entity.metaEdName),
      R.path(['mapTypeEnumeration', 'enumerationItems'])(entity),
    );

    rows.forEach((row: EnumerationRow) => rowEntities(metaEd, entity.namespace).set(row.name + row.description, row));
  });

  return {
    enhancerName,
    success: true,
  };
}
