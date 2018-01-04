// @flow
import type { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeItem } from 'metaed-core';

export type InterchangeItemEdfiInterchangeBrief = {
  interchangeBriefDescription: string,
};

const enhancerName: string = 'InterchangeItemSetupEnhancer';

export function addInterchangeItemEdfiInterchangeBriefTo(interchangeItem: InterchangeItem) {
  if (interchangeItem.data.edfiInterchangeBrief == null) interchangeItem.data.edfiInterchangeBrief = {};

  Object.assign(interchangeItem.data.edfiInterchangeBrief, {
    interchangeBriefDescription: '',
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.interchange.forEach((interchange: Interchange) => {
    if (interchange.elements.length === 0) return;

    interchange.elements.forEach(item => {
      addInterchangeItemEdfiInterchangeBriefTo(item);
    });

    interchange.identityTemplates.forEach(item => {
      addInterchangeItemEdfiInterchangeBriefTo(item);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
