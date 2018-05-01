// @flow
import path from 'path';
import { executePipeline, newMetaEdConfiguration, newPipelineOptions, newState, asReferentialProperty } from 'metaed-core';
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

  it('should have extension domain entities referencing core entity (meaning unified enhancers ran)', () => {
    const edfiDomainEntity = state.metaEd.entity.domainEntity.get('EdfiDomainEntity');
    if (edfiDomainEntity == null) throw new Error();
    expect(edfiDomainEntity.namespace.namespaceName).toBe('edfi');

    const gbDomainEntity = state.metaEd.entity.domainEntity.get('GbDomainEntity');
    if (gbDomainEntity == null) throw new Error();
    expect(gbDomainEntity.namespace.namespaceName).toBe('gb');
    expect(gbDomainEntity.properties[2].metaEdName).toBe('EdfiDomainEntity');
    expect(asReferentialProperty(gbDomainEntity.properties[2]).referencedEntity).toBe(edfiDomainEntity);

    const sampleDomainEntity = state.metaEd.entity.domainEntity.get('SampleDomainEntity');
    if (sampleDomainEntity == null) throw new Error();
    expect(sampleDomainEntity.namespace.namespaceName).toBe('sample');
    expect(sampleDomainEntity.properties[2].metaEdName).toBe('EdfiDomainEntity');
    expect(asReferentialProperty(sampleDomainEntity.properties[2]).referencedEntity).toBe(edfiDomainEntity);
  });
});
