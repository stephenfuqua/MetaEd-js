// @flow
import R from 'ramda';
import xmlParser from 'xml-js';
import {
  newMetaEdEnvironment,
  newNamespace,
  newInterchange,
  newInterchangeExtension,
  newInterchangeItem,
} from 'metaed-core';
import type {
  MetaEdEnvironment,
  Namespace,
  Interchange,
  InterchangeItem,
  InterchangeExtension,
  GeneratedOutput,
} from 'metaed-core';
import {
  nameOf,
  textOf,
  nextHead,
  nextSecond,
  nextThird,
  xsdAttributeName,
  xsdAttributeType,
  xsdMaxOccurs,
} from './templates/TemplateTestHelper';
import { addEdFiXsdEntityRepositoryTo } from '../../src/model/EdFiXsdEntityRepository';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../../src/model/MergedInterchange';
import type { MergedInterchange } from '../../src/model/MergedInterchange';
import { generate } from '../../src/generator/InterchangeGenerator';

describe('when generating single interchange', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);
  const elementBaseName: string = 'ElementName';
  const elementTypeName: string = 'ElementNameType';
  const identityTemplateBaseName: string = 'IdentityTemplateNameReference';
  const identityTemplateTypeName: string = 'IdentityTemplateNameReferenceType';
  const interchangeName: string = 'InterchangeName';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const schemaDocumentation: string = `===== Interchange Name Interchange Model =====`;
  const schemaLocationName: string = 'SchemaLocation.xsd';
  let result;

  beforeAll(async () => {
    const element: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementBaseName,
      data: {
        edfiXsd: {
          xsd_Name: elementBaseName,
          xsd_Type: elementTypeName,
        },
      },
    });

    const identityTemplate: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: identityTemplateBaseName,
      data: {
        edfiXsd: {
          xsd_Name: identityTemplateBaseName,
          xsd_Type: identityTemplateTypeName,
        },
      },
    });

    const interchange: Interchange = Object.assign(newInterchange(), {
      metaEdName: interchangeName,
      namespace,
      documentation: interchangeDocumentation,
      elements: [element],
      identityTemplates: [identityTemplate],
    });
    namespace.entity.interchange.set(interchange.metaEdName, interchange);

    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchangeName,
      namespace,
      interchangeName,
      documentation: interchangeDocumentation,
      schemaLocation: schemaLocationName,
      elements: [element],
      identityTemplates: [identityTemplate],
      orderedElements: [identityTemplate, element],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);

    const rawXsd = (await generate(metaEd)).generatedOutput[0].resultString;
    result = xmlParser.xml2js(rawXsd);
  });

  it('should generate valid xsd', () => {
    const xsSchema = R.view(nextSecond, result);

    const schemaLocation = R.view(nextHead, xsSchema);
    expect(R.view(nameOf, schemaLocation)).toBe('xs:include');
    expect(R.view(R.lensPath(['attributes', 'schemaLocation']), schemaLocation)).toBe(schemaLocationName);

    const schemaDocumentationAnnotation = R.view(nextSecond, xsSchema);
    expect(R.view(nameOf, schemaDocumentationAnnotation)).toBe('xs:annotation');
    expect(
      R.view(
        R.compose(
          nextHead,
          nameOf,
        ),
        schemaDocumentationAnnotation,
      ),
    ).toBe('xs:documentation');
    expect(
      R.view(
        R.compose(
          nextHead,
          nextHead,
          textOf,
        ),
        schemaDocumentationAnnotation,
      ),
    ).toBe(schemaDocumentation);

    const interchangeElement = R.view(nextThird, xsSchema);
    expect(R.view(nameOf, interchangeElement)).toBe('xs:element');
    expect(R.view(xsdAttributeName, interchangeElement)).toBe(interchangeName);
    expect(
      R.view(
        R.compose(
          nextHead,
          nameOf,
        ),
        interchangeElement,
      ),
    ).toBe('xs:annotation');
    expect(
      R.view(
        R.compose(
          nextHead,
          nextHead,
          nameOf,
        ),
        interchangeElement,
      ),
    ).toBe('xs:documentation');
    expect(
      R.view(
        R.compose(
          nextHead,
          nextHead,
          nextHead,
          textOf,
        ),
        interchangeElement,
      ),
    ).toBe(interchangeDocumentation);

    const complexType = R.view(nextSecond, interchangeElement);
    expect(R.view(nameOf, complexType)).toBe('xs:complexType');
    expect(
      R.view(
        R.compose(
          nextHead,
          nameOf,
        ),
        complexType,
      ),
    ).toBe('xs:choice');
    expect(
      R.view(
        R.compose(
          nextHead,
          xsdMaxOccurs,
        ),
        complexType,
      ),
    ).toBe('unbounded');

    const identityElement = R.view(
      R.compose(
        nextHead,
        nextHead,
      ),
      complexType,
    );
    expect(R.view(nameOf, identityElement)).toBe('xs:element');
    expect(R.view(xsdAttributeName, identityElement)).toBe(identityTemplateBaseName);
    expect(R.view(xsdAttributeType, identityElement)).toBe(identityTemplateTypeName);

    const element = R.view(
      R.compose(
        nextHead,
        nextSecond,
      ),
      complexType,
    );
    expect(R.view(nameOf, element)).toBe('xs:element');
    expect(R.view(xsdAttributeName, element)).toBe(elementBaseName);
    expect(R.view(xsdAttributeType, element)).toBe(elementTypeName);
  });
});

describe('when generating single interchange with extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);
  const elementBaseName: string = 'ElementName';
  const elementTypeName: string = 'ElementNameType';
  const identityTemplateBaseName: string = 'IdentityTemplateNameReference';
  const identityTemplateTypeName: string = 'IdentityTemplateNameReferenceType';
  const extensionElementBaseName: string = 'ExtensionElementName';
  const extensionElementTypeName: string = 'ExtensionElementNameType';
  const interchangeName: string = 'InterchangeName';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const interchangeExtensionDocumentation: string = 'InterchangeExtensionDocumentation';
  const schemaLocationName: string = 'SchemaLocation.xsd';
  let result: Array<GeneratedOutput>;

  beforeAll(() => {
    const element: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementBaseName,
      data: {
        edfiXsd: {
          xsd_Name: elementBaseName,
          xsd_Type: elementTypeName,
        },
      },
    });

    const identityTemplate: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: identityTemplateBaseName,
      data: {
        edfiXsd: {
          xsd_Name: identityTemplateBaseName,
          xsd_Type: identityTemplateTypeName,
        },
      },
    });

    const extensionElement: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementBaseName,
      data: {
        edfiXsd: {
          xsd_Name: extensionElementBaseName,
          xsd_Type: extensionElementTypeName,
        },
      },
    });

    const interchange: Interchange = Object.assign(newInterchange(), {
      metaEdName: interchangeName,
      namespace,
      documentation: interchangeDocumentation,
      elements: [element],
      identityTemplates: [identityTemplate],
    });
    namespace.entity.interchange.set(interchange.metaEdName, interchange);

    const interchangeExtension: InterchangeExtension = Object.assign(newInterchangeExtension(), {
      metaEdName: interchangeName,
      namespace: extensionNamespace,
      documentation: interchangeExtensionDocumentation,
      elements: [extensionElement],
      identityTemplates: [],
    });
    extensionNamespace.entity.interchangeExtension.set(interchangeExtension.metaEdName, interchangeExtension);

    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      namespace,
      interchangeName,
      documentation: interchangeDocumentation,
      schemaLocation: schemaLocationName,
      elements: [element, extensionElement],
      identityTemplates: [identityTemplate],
      orderedElements: [identityTemplate, element],
    });
    addMergedInterchangeToRepository(metaEd, mergedInterchange);
  });

  it('should not generate explicit extension interchange', async () => {
    result = (await generate(metaEd)).generatedOutput;
    expect(result).toHaveLength(1);
  });

  it('should have interchange name', () => {
    const xsSchema = R.view(nextSecond, xmlParser.xml2js(result[0].resultString));

    const interchangeElement = R.view(nextThird, xsSchema);
    expect(R.view(nameOf, interchangeElement)).toBe('xs:element');
    expect(R.view(xsdAttributeName, interchangeElement)).toBe(interchangeName);
  });
});
