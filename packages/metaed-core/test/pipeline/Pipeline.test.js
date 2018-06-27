// @flow
import path from 'path';
import { executePipeline } from '../../src/task/Pipeline';
import { newMetaEdConfiguration } from '../../src/MetaEdConfiguration';
import { newPipelineOptions } from '../../src/task/PipelineOptions';
import { newState } from '../../src/State';
import type { State } from '../../src/State';
import type { CommonProperty } from '../../src/model/property/CommonProperty';
import type { Namespace } from '../../src/model/Namespace';

jest.unmock('final-fs');
jest.setTimeout(30000);

const metaEdConfiguration = {
  ...newMetaEdConfiguration(),
  artifactDirectory: './MetaEdOutput/',
  defaultPluginTechVersion: '2.0.0',
  projectPaths: [path.resolve(__dirname, 'projects', 'de-with-common-property')],
  projects: [
    {
      projectName: 'Ed-Fi',
      namespaceName: 'edfi',
      projectVersion: '2.0.0',
    },
  ],
};

describe('when building a DE with a common property but no common declaration', () => {
  let state: State = newState();
  let coreNamespace: ?Namespace = null;

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

    coreNamespace = state.metaEd.namespace.get('edfi');
  });

  it('should have built one domain entity', () => {
    if (coreNamespace == null) throw new Error();
    expect(coreNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should have validation error', () => {
    expect(state.validationFailure.filter(message => message.category === 'error')[0].validatorName).toBe(
      'CommonPropertyMustMatchACommon',
    );
  });

  it('should have common property with undefined referenced entity (meaning unified enhancers ran)', () => {
    if (coreNamespace == null) throw new Error();
    const entity = coreNamespace.entity.domainEntity.get('EntityName');
    if (entity == null) throw new Error();
    expect(entity.properties[1].type).toBe('common');
    const { referencedEntity } = ((entity.properties[1]: any): CommonProperty);
    if (referencedEntity == null) throw new Error();
    expect(referencedEntity.type).toBe('unknown');
  });
});
