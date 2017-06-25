// @flow
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../packages/metaed-core/src/enhancer/EnhancerResult';
import { getAll } from '../../../../packages/metaed-core/src/model/EntityRepository';
import type { Interchange } from '../../../../packages/metaed-core/src/model/Interchange';
import type { InterchangeItem } from '../../../../packages/metaed-core/src/model/InterchangeItem';
import { asInterchange } from '../../../../packages/metaed-core/src/model/Interchange';

const enhancerName: string = 'InterchangeBaseItemEnhancer';

function assignReference(metaEd: MetaEdEnvironment, item: InterchangeItem) {
  // $FlowIgnore - entity lookup by type
  const referencedEntity = metaEd.entity[item.referencedType].get(item.metaEdName);
  if (referencedEntity) item.referencedEntity = referencedEntity;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAll(metaEd.entity, 'interchange', 'interchangeExtension').forEach(interchangeBase => {
    const interchange: Interchange = asInterchange(interchangeBase);
    interchange.elements.forEach(item => assignReference(metaEd, item));
    interchange.identityTemplates.forEach(item => assignReference(metaEd, item));
  });

  return {
    enhancerName,
    success: true,
  };
}
