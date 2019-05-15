import { newMetaEdConfiguration, newMetaEdProject } from 'metaed-core';
import { MetaEdConfiguration } from 'metaed-core';
import { deployTargetsFor } from '../src/deploy';
import { DeployTargets } from '../src/deploy';

describe('when deploying 3.0 artifacts', (): void => {
  let result: DeployTargets[] = [];

  beforeAll(async () => {
    const metaEdConfiguration: MetaEdConfiguration = {
      ...newMetaEdConfiguration(),
      projects: [
        {
          ...newMetaEdProject(),
          namespaceName: 'sample',
          projectName: 'Sample',
          projectVersion: '1.0.0',
        },
        {
          ...newMetaEdProject(),
          namespaceName: 'EdFi',
          projectName: 'Ed-Fi',
          projectVersion: '3.0.0',
        },
      ],
      defaultPluginTechVersion: '3.0.0',
    };
    result = await deployTargetsFor(metaEdConfiguration, true);
  });

  it('should have correct core directory paths', (): void => {
    const core = result[0];
    expect(core.namespaceName).toBe('EdFi');
    expect(core.apiMetadata.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Metadata/');
    expect(core.databaseData.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Data/EdFi/');
    expect(core.databaseStructure.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Structure/EdFi/');
    expect(core.interchange.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
    expect(core.xsd.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
  });

  it('should have correct extension directory paths', (): void => {
    const extension = result[1];
    expect(extension.namespaceName).toBe('sample');
    expect(extension.apiMetadata.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.Sample/SupportingArtifacts/Metadata/',
    );
    expect(extension.databaseData.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.Sample/SupportingArtifacts/Database/Data/EdFi/',
    );
    expect(extension.databaseStructure.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.Sample/SupportingArtifacts/Database/Structure/EdFi/',
    );
    expect(extension.interchange.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.Sample/SupportingArtifacts/Schemas/',
    );
    expect(extension.xsd.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.Sample/SupportingArtifacts/Schemas/',
    );
  });
});

describe('when deploying 2.0 artifacts', (): void => {
  let result: DeployTargets[] = [];

  beforeAll(async () => {
    const metaEdConfiguration: MetaEdConfiguration = {
      ...newMetaEdConfiguration(),
      projects: [
        {
          ...newMetaEdProject(),
          namespaceName: 'sample',
          projectName: 'Sample',
          projectVersion: '1.0.0',
        },
        {
          ...newMetaEdProject(),
          namespaceName: 'EdFi',
          projectName: 'Ed-Fi',
          projectVersion: '2.0.0',
        },
      ],
      defaultPluginTechVersion: '2.0.0',
    };
    result = await deployTargetsFor(metaEdConfiguration, true);
  });

  it('should have correct core directory paths', (): void => {
    const core = result[0];
    expect(core.namespaceName).toBe('EdFi');
    expect(core.apiMetadata.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Metadata/');
    expect(core.databaseData.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Data/EdFi/');
    expect(core.databaseStructure.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Structure/EdFi/');
    expect(core.interchange.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
    expect(core.xsd.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
  });

  it('should have correct extension directory paths', (): void => {
    const extension = result[1];
    expect(extension.namespaceName).toBe('sample');
    expect(extension.apiMetadata.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Extensions/Metadata/');
    expect(extension.databaseData.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Database/Data/EdFi/');
    expect(extension.databaseStructure.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Database/Structure/EdFi/');
    expect(extension.interchange.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Extensions/Schemas/');
    expect(extension.xsd.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Extensions/Schemas/');
  });
});
