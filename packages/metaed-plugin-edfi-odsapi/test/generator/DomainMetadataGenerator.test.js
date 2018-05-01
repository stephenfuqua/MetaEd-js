// @flow
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { generate } from '../../src/generator/domainMetadata/DomainMetadataGenerator';
import type { Aggregate } from '../../src/model/domainMetadata/Aggregate';

describe('when generating aggregate for edfi', () => {
  const namespaceName: string = 'edfi';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: false,
      isExtension: false,
      entityTables: [
        {
          table: 'Entity2',
          isA: null,
          isAbstract: false,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: false,
        },
        {
          table: 'Entity3',
          isA: null,
          isAbstract: false,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: false,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: false,
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});

describe('when generating aggregate for extensions', () => {
  const namespaceName: string = 'extension';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: false,
      isExtension: false,
      entityTables: [
        {
          table: 'Entity2',
          isA: null,
          isAbstract: false,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: true,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: true,
      projectExtension: 'EXTENSION',
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});

describe('when generating aggregate with subclass for edfi', () => {
  const namespaceName: string = 'edfi';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: false,
      isExtension: false,
      entityTables: [
        {
          table: 'Entity2',
          isA: 'Entity4',
          isAbstract: false,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: true,
          requiresSchema: false,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: false,
      projectExtension: '',
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});

describe('when generating aggregate extensions', () => {
  const namespaceName: string = 'extension';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: false,
      isExtension: true,
      entityTables: [
        {
          table: 'Entity2',
          isA: null,
          isAbstract: false,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: true,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: true,
      projectExtension: 'EXTENSION',
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});

describe('when generating abstract aggregate for edfi', () => {
  const namespaceName: string = 'edfi';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: false,
      isExtension: false,
      entityTables: [
        {
          table: 'Entity2',
          isA: null,
          isAbstract: true,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: false,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: false,
      projectExtension: '',
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});

describe('when generating aggregate with primary key update', () => {
  const namespaceName: string = 'edfi';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: true,
      isExtension: false,
      entityTables: [
        {
          table: 'Entity1',
          isA: null,
          isAbstract: false,
          isRequiredCollection: false,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: false,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: false,
      projectExtension: '',
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});

describe('when generating aggregate with required collection table', () => {
  const namespaceName: string = 'edfi';
  let result: string = '';

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

    const aggregate: Aggregate = {
      root: 'Entity1',
      schema: namespaceName,
      allowPrimaryKeyUpdates: true,
      isExtension: false,
      entityTables: [
        {
          table: 'Entity1',
          isA: null,
          isAbstract: false,
          isRequiredCollection: true,
          schema: namespaceName,
          hasIsA: false,
          requiresSchema: false,
        },
      ],
    };

    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: false,
      projectExtension: '',
      data: {
        edfiOdsApi: {
          aggregates: [aggregate],
        },
      },
    });

    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    result = (await generate(metaEd)).generatedOutput[0].resultString;
  });

  it('should generate aggregate element', () => {
    expect(result).toMatchSnapshot();
  });
});
