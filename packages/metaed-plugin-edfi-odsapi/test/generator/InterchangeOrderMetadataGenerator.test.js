// @flow

import R from 'ramda';
import xmlParser from 'xml-js';
import { newMetaEdEnvironment, newNamespace, newInterchangeItem } from 'metaed-core';
import type { MetaEdEnvironment, Namespace, InterchangeItem, GeneratedOutput } from 'metaed-core';
import {
  newMergedInterchange,
  addMergedInterchangeToRepository,
  addEdFiXsdEntityRepositoryTo,
} from 'metaed-plugin-edfi-xsd';
import type { MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { nextHead, nextSecond, nextThird, nextLength, xsdAttributeName } from './TemplateTestHelper';
import { generate } from '../../src/generator/interchangeOrderMetadata/InterchangeOrderMetadataGenerator';

describe('when generating core interchange', () => {
  const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '3.0.0' });
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const elementName1: string = 'ElementName1';
  const elementName2: string = 'ElementName2';
  const interchangeName: string = 'InterchangeName';
  let result: GeneratedOutput;

  beforeAll(async () => {
    const element1: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName1,
    });

    const element2: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName2,
    });

    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace,
      metaEdName: interchangeName,
      orderedElements: [element1, element2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);

    [result] = (await generate(metaEd)).generatedOutput;
  });

  it('should generate correct filename', () => {
    expect(result.fileName).toBe('InterchangeOrderMetadata.xml');
  });

  it('should generate valid xsd', () => {
    const interchanges = R.view(nextSecond, xmlParser.xml2js(result.resultString));

    const interchange = R.view(nextHead, interchanges);
    expect(R.view(xsdAttributeName, interchange)).toBe(interchangeName);

    const element1 = R.view(nextHead, interchange);
    expect(R.view(xsdAttributeName, element1)).toBe(elementName1);

    const element2 = R.view(nextSecond, interchange);
    expect(R.view(xsdAttributeName, element2)).toBe(elementName2);
  });
});

describe('when generating extension interchange', () => {
  const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '3.0.0' });
  const coreNamespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(coreNamespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const elementName1: string = 'ElementName1';
  const elementName2: string = 'ElementName2';
  const interchangeName: string = 'InterchangeName';
  let result: GeneratedOutput;

  beforeAll(async () => {
    const element1: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName1,
    });

    const element2: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName2,
    });

    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      metaEdName: interchangeName,
      orderedElements: [element1, element2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);

    [result] = (await generate(metaEd)).generatedOutput;
  });

  it('should generate correct filename', () => {
    expect(result.fileName).toBe('InterchangeOrderMetadata-EXTENSION.xml');
  });

  it('should generate valid xsd', () => {
    const interchanges = R.view(nextSecond, xmlParser.xml2js(result.resultString));

    const interchange = R.view(nextHead, interchanges);
    expect(R.view(nextLength, interchange)).toBe(2);
    expect(R.view(xsdAttributeName, interchange)).toBe(interchangeName);

    const element1 = R.view(nextHead, interchange);
    expect(R.view(xsdAttributeName, element1)).toBe(elementName1);

    const element2 = R.view(nextSecond, interchange);
    expect(R.view(xsdAttributeName, element2)).toBe(elementName2);
  });
});

describe('when generating core and extension interchange', () => {
  const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '3.0.0' });
  const coreNamespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(coreNamespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const elementName1: string = 'ElementName1';
  const elementName2: string = 'ElementName2';
  const elementName3: string = 'ElementName3';
  const coreInterchangeName: string = 'CoreInterchangeName';
  const extensionInterchangeName: string = 'ExtensionInterchangeName';
  let result: Array<GeneratedOutput>;

  beforeAll(async () => {
    const element1: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName1,
    });

    const element2: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName2,
    });

    const element3: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName3,
    });

    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: coreNamespace,
      metaEdName: coreInterchangeName,
      orderedElements: [element1, element2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);

    const mergedExtensionInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      metaEdName: extensionInterchangeName,
      orderedElements: [element1, element3, element2],
    });
    addMergedInterchangeToRepository(metaEd, mergedExtensionInterchange);

    result = (await generate(metaEd)).generatedOutput;
  });

  it('should generate correct filenames', () => {
    expect(result[0].fileName).toBe('InterchangeOrderMetadata.xml');
    expect(result[1].fileName).toBe('InterchangeOrderMetadata-EXTENSION.xml');
  });

  it('should generate valid core xsd', () => {
    const interchanges = R.view(nextSecond, xmlParser.xml2js(result[0].resultString));

    const interchange = R.view(nextHead, interchanges);
    expect(R.view(nextLength, interchange)).toBe(2);
    expect(R.view(xsdAttributeName, interchange)).toBe(coreInterchangeName);

    const element1 = R.view(nextHead, interchange);
    expect(R.view(xsdAttributeName, element1)).toBe(elementName1);

    const element2 = R.view(nextSecond, interchange);
    expect(R.view(xsdAttributeName, element2)).toBe(elementName2);
  });

  it('should generate valid extension xsd', () => {
    const interchanges = R.view(nextSecond, xmlParser.xml2js(result[1].resultString));

    const coreInterchange = R.view(nextHead, interchanges);
    expect(R.view(nextLength, coreInterchange)).toBe(2);
    expect(R.view(xsdAttributeName, coreInterchange)).toBe(coreInterchangeName);

    const coreElement1 = R.view(nextHead, coreInterchange);
    expect(R.view(xsdAttributeName, coreElement1)).toBe(elementName1);

    const coreElement2 = R.view(nextSecond, coreInterchange);
    expect(R.view(xsdAttributeName, coreElement2)).toBe(elementName2);

    const extensionInterchange = R.view(nextSecond, interchanges);
    expect(R.view(nextLength, extensionInterchange)).toBe(3);
    expect(R.view(xsdAttributeName, extensionInterchange)).toBe(extensionInterchangeName);

    const extensionElement1 = R.view(nextHead, extensionInterchange);
    expect(R.view(xsdAttributeName, extensionElement1)).toBe(elementName1);

    const extensionElement2 = R.view(nextSecond, extensionInterchange);
    expect(R.view(xsdAttributeName, extensionElement2)).toBe(elementName3);

    const extensionElement3 = R.view(nextThird, extensionInterchange);
    expect(R.view(xsdAttributeName, extensionElement3)).toBe(elementName2);
  });
});

describe('when generating core and extension interchange with same interchange name', () => {
  const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '3.0.0' });
  const coreNamespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(coreNamespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const elementName1: string = 'ElementName1';
  const elementName2: string = 'ElementName2';
  const elementName3: string = 'ElementName3';
  const coreInterchangeName: string = 'CoreInterchangeName';
  const extensionInterchangeName: string = 'ExtensionInterchangeName';
  const sharedInterchangeName: string = 'SharedInterchangeName';
  let result: Array<GeneratedOutput>;

  beforeAll(async () => {
    const element1: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName1,
    });

    const element2: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName2,
    });

    const element3: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementName3,
    });

    const coreSharedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: coreNamespace,
      metaEdName: sharedInterchangeName,
      orderedElements: [element1],
    });
    addMergedInterchangeToRepository(metaEd, coreSharedInterchange);

    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: coreNamespace,
      metaEdName: coreInterchangeName,
      orderedElements: [element1, element2],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);

    const extensionSharedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      metaEdName: sharedInterchangeName,
      orderedElements: [element1, element2, element3],
    });
    addMergedInterchangeToRepository(metaEd, extensionSharedInterchange);

    const mergedExtensionInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace: extensionNamespace,
      metaEdName: extensionInterchangeName,
      orderedElements: [element1, element2, element3],
    });
    addMergedInterchangeToRepository(metaEd, mergedExtensionInterchange);

    result = (await generate(metaEd)).generatedOutput;
  });

  it('should generate correct filenames', () => {
    expect(result[0].fileName).toBe('InterchangeOrderMetadata.xml');
    expect(result[1].fileName).toBe('InterchangeOrderMetadata-EXTENSION.xml');
  });

  it('should generate valid core xsd', () => {
    const interchanges = R.view(nextSecond, xmlParser.xml2js(result[0].resultString));

    const interchange = R.view(nextHead, interchanges);
    expect(R.view(nextLength, interchange)).toBe(2);
    expect(R.view(xsdAttributeName, interchange)).toBe(coreInterchangeName);

    const element1 = R.view(nextHead, interchange);
    expect(R.view(xsdAttributeName, element1)).toBe(elementName1);

    const element2 = R.view(nextSecond, interchange);
    expect(R.view(xsdAttributeName, element2)).toBe(elementName2);

    const sharedInterchange = R.view(nextSecond, interchanges);
    expect(R.view(nextLength, sharedInterchange)).toBe(1);
    expect(R.view(xsdAttributeName, sharedInterchange)).toBe(sharedInterchangeName);

    const sharedElement1 = R.view(nextHead, sharedInterchange);
    expect(R.view(xsdAttributeName, sharedElement1)).toBe(elementName1);
  });

  it('should generate valid extension xsd', () => {
    const interchanges = R.view(nextSecond, xmlParser.xml2js(result[1].resultString));

    const coreInterchange = R.view(nextHead, interchanges);
    expect(R.view(nextLength, coreInterchange)).toBe(2);
    expect(R.view(xsdAttributeName, coreInterchange)).toBe(coreInterchangeName);

    const coreElement1 = R.view(nextHead, coreInterchange);
    expect(R.view(xsdAttributeName, coreElement1)).toBe(elementName1);

    const coreElement2 = R.view(nextSecond, coreInterchange);
    expect(R.view(xsdAttributeName, coreElement2)).toBe(elementName2);

    const extensionInterchange = R.view(nextSecond, interchanges);
    expect(R.view(nextLength, extensionInterchange)).toBe(3);
    expect(R.view(xsdAttributeName, extensionInterchange)).toBe(extensionInterchangeName);

    const extensionElement1 = R.view(nextHead, extensionInterchange);
    expect(R.view(xsdAttributeName, extensionElement1)).toBe(elementName1);

    const extensionElement2 = R.view(nextSecond, extensionInterchange);
    expect(R.view(xsdAttributeName, extensionElement2)).toBe(elementName2);

    const extensionElement3 = R.view(nextThird, extensionInterchange);
    expect(R.view(xsdAttributeName, extensionElement3)).toBe(elementName3);

    const sharedInterchange = R.view(nextThird, interchanges);
    expect(R.view(nextLength, sharedInterchange)).toBe(3);
    expect(R.view(xsdAttributeName, sharedInterchange)).toBe(sharedInterchangeName);

    const sharedElement1 = R.view(nextHead, sharedInterchange);
    expect(R.view(xsdAttributeName, sharedElement1)).toBe(elementName1);

    const sharedElement2 = R.view(nextSecond, sharedInterchange);
    expect(R.view(xsdAttributeName, sharedElement2)).toBe(elementName2);

    const sharedElement3 = R.view(nextThird, sharedInterchange);
    expect(R.view(xsdAttributeName, sharedElement3)).toBe(elementName3);
  });
});
