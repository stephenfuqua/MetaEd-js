// @flow
import Horseman from 'node-horseman';
import { path as phantomPath } from 'phantomjs-prebuilt';
import path from 'path';
import type { MetaEdEnvironment, GeneratedOutput, GeneratorResult } from 'metaed-core';
import type { MergedInterchange } from 'metaed-plugin-edfi-xsd';

type SvgElement = {
  name: string,
  children?: Array<SvgElement>,
};

const generatorName: string = 'InterchangeBriefImageGenerator';

function getModel(metaEd: MetaEdEnvironment): Array<SvgElement> {
  const result: Array<SvgElement> = [];
  const mergedInterchanges: Array<MergedInterchange> = (metaEd.plugin.get('edfiXsd'): any).entity.mergedInterchange;

  mergedInterchanges.forEach(interchange => {
    const svgElement: SvgElement = {
      name: interchange.interchangeName,
      children: [{ name: '<xs:choice>', children: [] }],
    };
    interchange.identityTemplates.forEach(identityTemplate => {
      const identityTemplateEntity = { name: identityTemplate.data.edfiXsd.xsd_Name };
      // $FlowIgnore Flow thinks svgElement.children[0] could be undefined, but it was defined above.
      if (svgElement.children[0].children) svgElement.children[0].children.push(identityTemplateEntity);
    });
    interchange.elements.forEach(element => {
      const elementEntity = { name: element.data.edfiXsd.xsd_Name };
      // $FlowIgnore Flow thinks svgElement.children[0] could be undefined, but it was defined above.
      if (svgElement.children[0].children) svgElement.children[0].children.push(elementEntity);
    });
    result.push(svgElement);
  });
  return result;
}

// This generator returns a Promise<GeneratorResult>
// instead of the expected GeneratorResult because it's waiting on phantom to finish.
export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const generatedOutput: Array<GeneratedOutput> = [];
  const allInterchangeModels: Array<SvgElement> = getModel(metaEd);
  await Promise.all(
    allInterchangeModels.map(async interchange =>
      new Horseman({ phantomPath })
        .viewport(1000, 1000)
        .open(`file:///${path.join(__dirname, './svg/InterchangeBriefSvg.html')}`)
        .injectJs(path.join(__dirname, './svg/treeLayout.js'))
        .evaluate(model => {
          // eslint-disable-next-line no-undef, $FlowIgnore: draw() will be called within phantom, where it will be defined.
          draw(model);
        }, interchange)
        .cropBase64('g', 'PNG')
        .then(imageBase64 =>
          generatedOutput.push({
            name: `${interchange.name}-InterchangeBrief`,
            namespace: '',
            fileName: `${interchange.name}-InterchangeBrief.png`,
            folderName: 'InterchangeBrief/img',
            resultString: '',
            resultStream: new Buffer(imageBase64, 'base64'),
          }),
        )
        .close(),
    ),
  );

  return {
    generatorName,
    generatedOutput,
  };
}
