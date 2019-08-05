import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { GeneratorResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { generate } from '../../src/generator/SchemaGenerator';

describe('when generating schemas for core namespace', (): void => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: 'EdFi',
      isExtension: false,
    };
    metaEd.namespace.set('EdFi', namespace);

    result = await generate(metaEd);
  });

  it('should generate correct schema', (): void => {
    expect(result.generatorName).toEqual('edfiOds.SchemaGenerator');
    expect(R.head(result.generatedOutput).fileName).toBe('0010-Schemas.sql');
    expect(R.head(result.generatedOutput).namespace).toBe('EdFi');
    expect(R.head(result.generatedOutput).folderName).toBe('/Database/SQLServer/ODS/Structure/');
    expect(R.head(result.generatedOutput).name).toBe('ODS Schema');
    expect(R.head(result.generatedOutput).resultStream).toBeNull();
    expect(R.head(result.generatedOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating schemas for extension namespace', (): void => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: 'Extension',
      projectExtension: 'EXTENSION',
      isExtension: true,
    };
    metaEd.namespace.set('Extension', namespace);

    result = await generate(metaEd);
  });

  it('should generate correct schema', (): void => {
    expect(result.generatorName).toEqual('edfiOds.SchemaGenerator');
    expect(R.head(result.generatedOutput).fileName).toBe('0010-EXTENSION-Extension-Schemas.sql');
    expect(R.head(result.generatedOutput).namespace).toBe('Extension');
    expect(R.head(result.generatedOutput).folderName).toBe('/Database/SQLServer/ODS/Structure/');
    expect(R.head(result.generatedOutput).name).toBe('ODS Schema');
    expect(R.head(result.generatedOutput).resultStream).toBeNull();
    expect(R.head(result.generatedOutput).resultString).toMatchSnapshot();
  });
});
