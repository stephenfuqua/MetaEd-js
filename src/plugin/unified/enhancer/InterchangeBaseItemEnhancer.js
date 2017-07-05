// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import { getAll } from '../../../core/model/EntityRepository';
import type { Interchange } from '../../../core/model/Interchange';
import type { InterchangeItem } from '../../../core/model/InterchangeItem';
import { asInterchange } from '../../../core/model/Interchange';

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
