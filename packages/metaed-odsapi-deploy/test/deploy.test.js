// @flow
import { newMetaEdProject } from 'metaed-core';
import type { MetaEdProject, SemVer } from 'metaed-core';
import { getDeployTargetsFor } from '../src/deploy';
import type { DeployTargets } from '../src/deploy';

describe('when deploying 3.0 artifacts', () => {
  let result: Array<DeployTargets> = [];

  beforeAll(async () => {
    const dataStandardVersion: SemVer = '3.0.0';
    const projects: Array<MetaEdProject> = [
      {
        ...newMetaEdProject(),
        namespace: 'sample',
        projectName: 'Sample',
        projectVersion: '1.0.0',
      },
      {
        ...newMetaEdProject(),
        namespace: 'edfi',
        projectName: 'Ed-Fi',
        projectVersion: '3.0.0',
      },
    ];
    result = await getDeployTargetsFor(dataStandardVersion, projects);
  });

  it('should have correct core directory paths', () => {
    const core = result[0];
    expect(core.namespace).toBe('edfi');
    expect(core.apiMetadata.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Metadata/');
    expect(core.databaseData.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Data/EdFi/');
    expect(core.databaseStructure.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Structure/EdFi/');
    expect(core.interchange.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
    expect(core.xsd.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
  });

  it('should have correct extension directory paths', () => {
    const extension = result[1];
    expect(extension.namespace).toBe('sample');
    expect(extension.apiMetadata.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Standard.Extensions.sample/SupportingArtifacts/Metadata/',
    );
    expect(extension.databaseData.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Standard.Extensions.sample/SupportingArtifacts/Database/Data/EdFi/',
    );
    expect(extension.databaseStructure.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Standard.Extensions.sample/SupportingArtifacts/Database/Structure/EdFi/',
    );
    expect(extension.interchange.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Standard.Extensions.sample/SupportingArtifacts/Schemas/',
    );
    expect(extension.xsd.replace(/\\/g, '/')).toBe(
      'Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Standard.Extensions.sample/SupportingArtifacts/Schemas/',
    );
  });
});

describe('when deploying 2.0 artifacts', () => {
  let result: Array<DeployTargets> = [];

  beforeAll(async () => {
    const dataStandardVersion: SemVer = '2.0.0';
    const projects: Array<MetaEdProject> = [
      {
        ...newMetaEdProject(),
        namespace: 'sample',
        projectName: 'Sample',
        projectVersion: '1.0.0',
      },
      {
        ...newMetaEdProject(),
        namespace: 'edfi',
        projectName: 'Ed-Fi',
        projectVersion: '2.0.0',
      },
    ];
    result = await getDeployTargetsFor(dataStandardVersion, projects);
  });

  it('should have correct core directory paths', () => {
    const core = result[0];
    expect(core.namespace).toBe('edfi');
    expect(core.apiMetadata.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Metadata/');
    expect(core.databaseData.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Data/EdFi/');
    expect(core.databaseStructure.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Database/Structure/EdFi/');
    expect(core.interchange.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
    expect(core.xsd.replace(/\\/g, '/')).toBe('Ed-Fi-ODS/Standard/Schemas/');
  });

  it('should have correct extension directory paths', () => {
    const extension = result[1];
    expect(extension.namespace).toBe('sample');
    expect(extension.apiMetadata.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Extension/Metadata/');
    expect(extension.databaseData.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Database/Data/EdFi/');
    expect(extension.databaseStructure.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Database/Structure/EdFi/');
    expect(extension.interchange.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Extension/Schemas/');
    expect(extension.xsd.replace(/\\/g, '/')).toBe('Ed-Fi-ODS-Implementation/Extension/Schemas/');
  });
});
