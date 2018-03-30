// @flow
import path from 'path';
import { executePipeline, newMetaEdConfiguration, newPipelineOptions, newState } from 'metaed-core';
import type { State, DomainEntity } from 'metaed-core';

jest.unmock('final-fs');
jest.setTimeout(30000);

const metaEdConfiguration = {
  ...newMetaEdConfiguration(),
  artifactDirectory: './MetaEdOutput/',
  pluginConfig: {
    edfiUnified: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiOds: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiOdsApi: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiXsd: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiHandbook: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiInterchangeBrief: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiXmlDictionary: {
      targetTechnologyVersion: '2.0.0',
    },
  },
  projectPaths: [
    path.resolve(__dirname, 'projects', 'edfi'),
    path.resolve(__dirname, 'projects', 'gb'),
    path.resolve(__dirname, 'projects', 'sample'),
  ],
  projects: [
    {
      projectName: 'Ed-Fi',
      namespace: 'edfi',
      projectExtension: '',
      projectVersion: '2.0.0',
    },
    {
      projectName: 'Grand Bend',
      namespace: 'gb',
      projectExtension: 'GrandBend',
      projectVersion: '1.0.0',
    },
    {
      projectName: 'Sample',
      namespace: 'sample',
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

  it('should have built three domain entities', () => {
    const domainEntities: Map<string, DomainEntity> = state.metaEd.entity.domainEntity;
    expect(domainEntities.get('EdfiDomainEntity')).toBeDefined();
    expect(domainEntities.get('GbDomainEntity')).toBeDefined();
    expect(domainEntities.get('SampleDomainEntity')).toBeDefined();
  });

  it('should have core ods table', () => {
    const edfiDomainEntity = state.metaEd.entity.domainEntity.get('EdfiDomainEntity');
    if (edfiDomainEntity == null) throw new Error();
    expect(edfiDomainEntity.data.edfiOds.ods_Tables[0].name).toBe('EdfiDomainEntity');
    expect(edfiDomainEntity.data.edfiOds.ods_Tables[0].schema).toBe('edfi');
  });

  it('should have gb ods table with reference to core', () => {
    const gbDomainEntity = state.metaEd.entity.domainEntity.get('GbDomainEntity');
    if (gbDomainEntity == null) throw new Error();
    expect(gbDomainEntity.data.edfiOds.ods_Tables[0].name).toBe('GbDomainEntity');
    expect(gbDomainEntity.data.edfiOds.ods_Tables[0].schema).toBe('gb');
    const gbDomainEntityFK = gbDomainEntity.data.edfiOds.ods_Tables[0].foreignKeys[0];
    expect(gbDomainEntityFK.foreignTableName).toBe('EdfiDomainEntity');
    expect(gbDomainEntityFK.foreignTableSchema).toBe('edfi');
  });

  it('should have sample ods table with reference to core', () => {
    const sampleDomainEntity = state.metaEd.entity.domainEntity.get('SampleDomainEntity');
    if (sampleDomainEntity == null) throw new Error();
    expect(sampleDomainEntity.data.edfiOds.ods_Tables[0].name).toBe('SampleDomainEntity');
    expect(sampleDomainEntity.data.edfiOds.ods_Tables[0].schema).toBe('sample');
    const sampleDomainEntityFK = sampleDomainEntity.data.edfiOds.ods_Tables[0].foreignKeys[0];
    expect(sampleDomainEntityFK.foreignTableName).toBe('EdfiDomainEntity');
    expect(sampleDomainEntityFK.foreignTableSchema).toBe('edfi');
  });
});
