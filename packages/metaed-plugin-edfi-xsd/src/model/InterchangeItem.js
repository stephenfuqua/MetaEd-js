// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeExtension, InterchangeItem } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';

export type InterchangeItemEdfiXsd = {
  xsd_Name: string,
  xsd_Type: string,
};

const equalXsdName = R.eqBy(R.path(['data', 'edfiXsd', 'xsd_Name']));
const equalXsdType = R.eqBy(R.path(['data', 'edfiXsd', 'xsd_Type']));
export const interchangeItemsEqual = R.both(equalXsdName, equalXsdType);
export const interchangeItemsNameEqual = equalXsdName;
export const unionOfInterchangeItems = R.unionWith(interchangeItemsEqual);
export const differenceOfInterchangeItems = R.differenceWith(interchangeItemsEqual);
export const differenceOfInterchangeItemsNameOnly = R.differenceWith(interchangeItemsNameEqual);

const enhancerName: string = 'InterchangeItemSetupEnhancer';

export function addInterchangeItemEdfiXsdTo(interchangeItem: InterchangeItem) {
  if (interchangeItem.data.edfiXsd == null) interchangeItem.data.edfiXsd = {};

  Object.assign(interchangeItem.data.edfiXsd, {
    xsd_Name: '',
    xsd_Type: '',
  });
}

function addInterchangeItemEdfiXsdToInterchange(interchange: Interchange | InterchangeExtension) {
  interchange.elements.forEach(interchangeItem => addInterchangeItemEdfiXsdTo(interchangeItem));
  interchange.identityTemplates.forEach(interchangeItem => addInterchangeItemEdfiXsdTo(interchangeItem));
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'interchange'): any): Array<Interchange>).forEach((interchange: Interchange) => {
    addInterchangeItemEdfiXsdToInterchange(interchange);
  });

  ((getAllEntitiesOfType(metaEd, 'interchangeExtension'): any): Array<InterchangeExtension>).forEach(
    (interchangeExtension: InterchangeExtension) => {
      addInterchangeItemEdfiXsdToInterchange(interchangeExtension);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
