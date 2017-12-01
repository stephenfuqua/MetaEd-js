// @flow
import Horseman from 'node-horseman';
import path from 'path';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from '../../../metaed-core/index';
import type { SvgElement } from '../model/SvgElement';
import type { MergedInterchange } from '../model/MergedInterchange';

const generatorName: string = 'InterchangeBriefImageGenerator';

function getModel(metaEd: MetaEdEnvironment): Array<SvgElement> {
  const result = [];
  const mergedInterchanges: Array<MergedInterchange> = (metaEd.plugin.get('edfiXsd'): any).entity.mergedInterchange;

  mergedInterchanges.forEach(interchange => {
    const model = {
      name: interchange.interchangeName,
      children: [{ name: '<xs:choice>', children: [] }],
    };
    interchange.identityTemplates.forEach(identityTemplate => {
      const identityTemplateEntity = { name: identityTemplate.data.EdfiXsd.xsd_Name };
      model.children[0].children.push(identityTemplateEntity);
    });
    interchange.elements.forEach(element => {
      const elementEntity = { name: element.data.EdfiXsd.xsd_Name };
      model.children[0].children.push(elementEntity);
    });
    result.push(model);
  });
  return result;
}

// This generator returns a Promise<GeneratorResult>
// instead of the expected GeneratorResultbecause it's waiting on phantom to finish.
// $FlowIgnore
export async function generate(metaEd: MetaEdEnvironment): GeneratorResult {
  const generatedOutput: Array<GeneratedOutput> = [];
  const allInterchangeModels: Array<SvgElement> = getModel(metaEd);
  await Promise.all(allInterchangeModels.map(async (interchange) => {
    const horseman = new Horseman();
    const phantomResults = await horseman
      .viewport(1000, 1000)
      .open(`file:///${path.join(__dirname, './svg/InterchangeBriefSvg.html')}`)
      .injectJs(path.join(__dirname, './svg/treeLayout.js'))
      /* eslint-disable */
      // $FlowIgnore: draw() will be called within phantom, where it will be defined.
      .evaluate(function (model) { draw(model); }, interchange)
      /* eslint-enable */
      .cropBase64('g', 'PNG')
      .then(imageBase64 => {
        generatedOutput.push({
          name: `${interchange.name}-InterchangeBrief`,
          fileName: `${interchange.name}-InterchangeBrief.png`,
          folderName: 'InterchangeBrief/img',
          resultString: imageBase64,
          resultStream: null,
        });
        horseman.close();
      });
    return phantomResults;
  }));

  return {
    generatorName,
    generatedOutput,
  };
}
