// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeExtension, InterchangeItem } from '../../../../packages/metaed-core/index';

export type InterchangeItemEdfiXsd = {
  xsd_Name: string;
  xsd_Type: string;
};

const equalXsdName = R.eqBy(R.path(['data', 'edfiXsd', 'xsd_Name']));
const equalXsdType = R.eqBy(R.path(['data', 'edfiXsd', 'xsd_Type']));
export const interchangeItemsEqual = R.both(equalXsdName, equalXsdType);
export const unionOfInterchangeItems = R.unionWith(interchangeItemsEqual);
export const differenceOfInterchangeItems = R.differenceWith(interchangeItemsEqual);

const enhancerName: string = 'InterchangeItemSetupEnhancer';

export function addInterchangeItemEdfiXsdTo(interchangeItem: InterchangeItem) {
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
  metaEd.entity.interchange.forEach((interchange: Interchange) => {
    addInterchangeItemEdfiXsdToInterchange(interchange);
  });

  metaEd.entity.interchangeExtension.forEach((interchangeExtension: InterchangeExtension) => {
    addInterchangeItemEdfiXsdToInterchange(interchangeExtension);
  });

  return {
    enhancerName,
    success: true,
  };
}
