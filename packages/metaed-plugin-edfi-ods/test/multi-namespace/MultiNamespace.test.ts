import path from 'path';
import { executePipeline, newMetaEdConfiguration, newPipelineOptions, newState } from 'metaed-core';
import { State, Namespace } from 'metaed-core';

jest.unmock('final-fs');
jest.setTimeout(30000);

const metaEdConfiguration = {
  ...newMetaEdConfiguration(),
  artifactDirectory: './MetaEdOutput/',
  defaultPluginTechVersion: '2.0.0',
  projectPaths: [
    path.resolve(__dirname, 'projects', 'edfi'),
    path.resolve(__dirname, 'projects', 'gb'),
    path.resolve(__dirname, 'projects', 'sample'),
  ],
  projects: [
    {
      projectName: 'Ed-Fi',
      namespaceName: 'edfi',
      projectExtension: '',
      projectVersion: '2.0.0',
    },
    {
      projectName: 'Grand Bend',
      namespaceName: 'gb',
      projectExtension: 'GrandBend',
      projectVersion: '1.0.0',
    },
    {
      projectName: 'Sample',
      namespaceName: 'sample',
      projectExtension: 'Sample',
      projectVersion: '1.0.0',
    },
  ],
};

describe('when building a simple core and two simple extension projects', () => {
  let state: State = newState();

  beforeAll(async () => {
    state = Object.assign(newState(), {
      metaEdConfiguration,
      pipelineOptions: Object.assign(newPipelineOptions(), {
        runValidators: true,
        runEnhancers: true,
      }),
    });

    state.metaEd.dataStandardVersion = '3.0.0';
    state.pluginScanDirectory = path.resolve(__dirname, '../../..');
    await executePipeline(state);
  });

  it('should have no validation errors', () => {
    expect(state.validationFailure.length).toBe(0);
  });

  it('should have core domain entity', () => {
    const namespace: Namespace | undefined = state.metaEd.namespace.get('edfi');
    if (namespace == null) throw new Error();
    expect(namespace.entity.domainEntity.get('EdfiDomainEntity')).toBeDefined();
  });

  it('should have gb domain entity', () => {
    const namespace: Namespace | undefined = state.metaEd.namespace.get('gb');
    if (namespace == null) throw new Error();
    expect(namespace.entity.domainEntity.get('GbDomainEntity')).toBeDefined();
  });

  it('should have sample domain entity', () => {
    const namespace: Namespace | undefined = state.metaEd.namespace.get('sample');
    if (namespace == null) throw new Error();
    expect(namespace.entity.domainEntity.get('SampleDomainEntity')).toBeDefined();
  });

  it('should have core ods table', () => {
    const namespace: Namespace | undefined = state.metaEd.namespace.get('edfi');
    if (namespace == null) throw new Error();
    const edfiDomainEntity = namespace.entity.domainEntity.get('EdfiDomainEntity');
    if (edfiDomainEntity == null) throw new Error();
    expect(edfiDomainEntity.data.edfiOds.odsTables[0].name).toBe('EdfiDomainEntity');
    expect(edfiDomainEntity.data.edfiOds.odsTables[0].schema).toBe('edfi');
  });

  it('should have gb ods table with reference to core', () => {
    const namespace: Namespace | undefined = state.metaEd.namespace.get('gb');
    if (namespace == null) throw new Error();
    const gbDomainEntity = namespace.entity.domainEntity.get('GbDomainEntity');
    if (gbDomainEntity == null) throw new Error();
    expect(gbDomainEntity.data.edfiOds.odsTables[0].name).toBe('GbDomainEntity');
    expect(gbDomainEntity.data.edfiOds.odsTables[0].schema).toBe('gb');
    const gbDomainEntityFK = gbDomainEntity.data.edfiOds.odsTables[0].foreignKeys[0];
    expect(gbDomainEntityFK.foreignTableName).toBe('EdfiDomainEntity');
    expect(gbDomainEntityFK.foreignTableSchema).toBe('edfi');
  });

  it('should have sample ods table with reference to core', () => {
    const namespace: Namespace | undefined = state.metaEd.namespace.get('sample');
    if (namespace == null) throw new Error();
    const sampleDomainEntity = namespace.entity.domainEntity.get('SampleDomainEntity');
    if (sampleDomainEntity == null) throw new Error();
    expect(sampleDomainEntity.data.edfiOds.odsTables[0].name).toBe('SampleDomainEntity');
    expect(sampleDomainEntity.data.edfiOds.odsTables[0].schema).toBe('sample');
    const sampleDomainEntityFK = sampleDomainEntity.data.edfiOds.odsTables[0].foreignKeys[0];
    expect(sampleDomainEntityFK.foreignTableName).toBe('EdfiDomainEntity');
    expect(sampleDomainEntityFK.foreignTableSchema).toBe('edfi');
  });
});
