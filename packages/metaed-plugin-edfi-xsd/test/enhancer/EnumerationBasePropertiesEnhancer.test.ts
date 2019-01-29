import {
  newMetaEdEnvironment,
  newEnumeration,
  newNamespace,
  newMapTypeEnumeration,
  newSchoolYearEnumeration,
} from 'metaed-core';
import { MetaEdEnvironment, Enumeration, MapTypeEnumeration, SchoolYearEnumeration, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/EnumerationBasePropertiesEnhancer';

describe('when EnumerationBasePropertiesEnhancer enhances enumeration', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const enumerationBaseName = 'EnumerationName';
  const enumerationName = 'EnumerationNameType';

  beforeAll(() => {
    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationBaseName,
      namespace,
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.enumeration.set(enumeration.metaEdName, enumeration);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should have xsdEnumerationName assigned', () => {
    const enumeration: any = namespace.entity.enumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationName).toBe(enumerationName);
  });

  it('should have xsdEnumerationBaseNameWithExtension value same as enumerationName', () => {
    const enumeration: any = namespace.entity.enumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationNameWithExtension).toBe(enumerationName);
  });
});

describe('when EnumerationBasePropertiesEnhancer enhances enumeration with extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const projectExtension = 'EXTENSION';
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'Extension', projectExtension });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);

  const enumerationBaseName = 'EnumerationName';
  const enumerationName = 'EnumerationNameType';

  beforeAll(() => {
    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationBaseName,
      namespace: extensionNamespace,
      data: {
        edfiXsd: {},
      },
    });
    extensionNamespace.entity.enumeration.set(enumeration.metaEdName, enumeration);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should have xsdEnumerationName assigned', () => {
    const enumeration: any = extensionNamespace.entity.enumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationName).toBe(enumerationName);
  });

  it('should have xsdEnumerationBaseNameWithExtension value with extension', () => {
    const enumeration: any = extensionNamespace.entity.enumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationNameWithExtension).toBe(`${projectExtension}-${enumerationName}`);
  });
});

describe('when EnumerationBasePropertiesEnhancer enhances enumeration that ends in Type', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const enumerationBaseName = 'EnumerationNameType';
  const enumerationName = 'EnumerationNameType';

  beforeAll(() => {
    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationBaseName,
      namespace,
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.enumeration.set(enumeration.metaEdName, enumeration);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should have xsdEnumerationName assigned', () => {
    const enumeration: any = namespace.entity.enumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationName).toBe(enumerationName);
  });

  it('should have xsdEnumerationBaseNameWithExtension value same as enumerationName', () => {
    const enumeration: any = namespace.entity.enumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationNameWithExtension).toBe(enumerationName);
  });
});

describe('when EnumerationBasePropertiesEnhancer enhances MapTypeEnumeration', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const enumerationBaseName = 'EnumerationName';
  const enumerationName = 'EnumerationNameType';
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const enumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
      metaEdName: enumerationBaseName,
      namespace,
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.mapTypeEnumeration.set(enumeration.metaEdName, enumeration);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should have xsdEnumerationName assigned', () => {
    const enumeration: any = namespace.entity.mapTypeEnumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationName).toBe(enumerationName);
  });

  it('should have xsdEnumerationBaseNameWithExtension value same as enumerationName', () => {
    const enumeration: any = namespace.entity.mapTypeEnumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationNameWithExtension).toBe(enumerationName);
  });
});

describe('when EnumerationBasePropertiesEnhancer enhances SchoolYearEnumeration', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const enumerationBaseName = 'EnumerationName';
  const enumerationName = 'EnumerationNameType';
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'EdFi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    const enumeration: SchoolYearEnumeration = Object.assign(newSchoolYearEnumeration(), {
      metaEdName: enumerationBaseName,
      namespace,
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.schoolYearEnumeration.set(enumeration.metaEdName, enumeration);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);
  });

  it('should have xsdEnumerationName assigned', () => {
    const enumeration: any = namespace.entity.schoolYearEnumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationName).toBe(enumerationName);
  });

  it('should have xsdEnumerationBaseNameWithExtension value same as enumerationName', () => {
    const enumeration: any = namespace.entity.schoolYearEnumeration.get(enumerationBaseName);
    expect(enumeration.data.edfiXsd.xsdEnumerationNameWithExtension).toBe(enumerationName);
  });
});
