// @flow
import { newMetaEdEnvironment, newDomainEntity, newInterchangeItem } from 'metaed-core';
import { addEdFiXsdEntityRepositoryTo, newMergedInterchange } from 'metaed-plugin-edfi-xsd';
import type { GeneratedOutput } from 'metaed-core';
import { addMergedInterchangeEdfiInterchangeBriefTo } from '../../src/model/MergedInterchange';
import { generate as InterchangeBriefAsMarkdownGenerator } from '../../src/generator/InterchangeBriefAsMarkdownGenerator';
import type { ReferenceUsageInfo } from '../../src/model/ReferenceUsageInfo';
import { newReferenceUsageInfo } from '../../src/model/ReferenceUsageInfo';

describe('When generating interchange brief with no extended references or descriptors', () => {
  const interchange1metaEdName: string = 'Interchange1metaEdName';
  const interchange2metaEdName: string = 'Interchange2metaEdName';
  const interchange1InterchangeName: string = 'InterchangeInterchange1metaEdName';
  const interchange2InterchangeName: string = 'InterchangeInterchange2metaEdName';

  const interchange1Documentation: string = 'Interchange 1 Documentation here';
  const interchange2Documentation = 'Interchange 2 Documentation here';

  const domainEntity1Documentation: string = 'Domain Entity 1 Documentation here';
  const domainEntity2Documentation: string = 'Domain Entity 2 Documentation here';
  const domainEntity3Documentation: string = 'Domain Entity 3 Documentation here';
  const domainEntity4Documentation: string = 'Domain Entity 4 Documentation here';

  let generatedResults: Array<GeneratedOutput>;

  function GetBuilderResults() {
    const domainEntity1 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity1',
      documentation: domainEntity1Documentation,
    });
    const domainEntity2 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity2',
      documentation: domainEntity2Documentation,
    });
    const domainEntity3 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity3',
      documentation: domainEntity3Documentation,
    });
    const domainEntity4 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity4',
      documentation: domainEntity4Documentation,
    });

    const interchange1 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange1metaEdName,
      interchangeName: interchange1InterchangeName,
      documentation: interchange1Documentation,
    });
    const interchangeItem1 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity1.metaEdName,
      referencedEntity: domainEntity1,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity1Documentation } },
    });
    const interchangeItem2 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity2.metaEdName,
      referencedEntity: domainEntity2,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity2Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem2);

    const interchange2 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange2metaEdName,
      interchangeName: interchange2InterchangeName,
      documentation: interchange2Documentation,
    });
    const interchangeItem3 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity3.metaEdName,
      referencedEntity: domainEntity3,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity3Documentation } },
    });
    const interchangeItem4 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity4.metaEdName,
      referencedEntity: domainEntity4,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity4Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange2);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem4);

    const builderResult = Object.assign(newMetaEdEnvironment(), {
      dataStandardVersion: '2.1.0',
      plugin: new Map(),
    });
    addEdFiXsdEntityRepositoryTo(builderResult);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange1.interchangeName, interchange1);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange2.interchangeName, interchange2);
    return builderResult;
  }

  beforeAll(async () => {
    generatedResults = (await InterchangeBriefAsMarkdownGenerator(GetBuilderResults())).generatedOutput;
  });

  it('Should include entities', () => {
    expect(generatedResults.length).toBe(3);

    expect(generatedResults[0].resultString).toContain(interchange1InterchangeName);
    expect(generatedResults[0].resultString).toContain(interchange1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity2Documentation);

    expect(generatedResults[1].resultString).toContain(interchange2InterchangeName);
    expect(generatedResults[1].resultString).toContain(interchange2Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity3Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity4Documentation);
  });

  it('Should not include extended references', () => {
    expect(generatedResults[0].resultString).toContain('Extended References');
    expect(generatedResults[0].resultString).toContain('This interchange contains no external references.');

    expect(generatedResults[1].resultString).toContain('Extended References');
    expect(generatedResults[1].resultString).toContain('This interchange contains no external references.');
  });
});

describe('When generating interchange brief with extended documentation', () => {
  const interchange1metaEdName = 'Interchange1metaEdName';
  const interchange2metaEdName = 'Interchange2metaEdName';
  const interchange1InterchangeName = 'InterchangeInterchange1metaEdName';
  const interchange2InterchangeName = 'InterchangeInterchange2metaEdName';

  const interchange1Documentation = 'Interchange 1 Documentation here';
  const interchange2Documentation = 'Interchange 2 Documentation here';

  const interchange1ExtendedDocumentation = 'Interchange 1 Extended Documentation here';

  const domainEntity1Documentation = 'Domain Entity 1 Documentation here';
  const domainEntity2Documentation = 'Domain Entity 2 Documentation here';
  const domainEntity3Documentation = 'Domain Entity 3 Documentation here';
  const domainEntity4Documentation = 'Domain Entity 4 Documentation here';

  let generatedResults: Array<GeneratedOutput>;

  function GetBuilderResults() {
    const domainEntity1 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity1',
      documentation: domainEntity1Documentation,
    });
    const domainEntity2 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity2',
      documentation: domainEntity2Documentation,
    });
    const domainEntity3 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity3',
      documentation: domainEntity3Documentation,
    });
    const domainEntity4 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity4',
      documentation: domainEntity4Documentation,
    });

    const interchange1 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange1metaEdName,
      interchangeName: interchange1InterchangeName,
      documentation: interchange1Documentation,
      extendedDocumentation: interchange1ExtendedDocumentation,
    });
    const interchangeItem1 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity1.metaEdName,
      data: { edfiXsd: { xsd_Name: domainEntity1.metaEdName }, edfiInterchangeBrief: { interchangeBriefDescription: domainEntity1Documentation } },
      referencedEntity: domainEntity1,
    });
    const interchangeItem2 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity2.metaEdName,
      data: { edfiXsd: { xsd_Name: domainEntity2.metaEdName }, edfiInterchangeBrief: { interchangeBriefDescription: domainEntity2Documentation } },
      referencedEntity: domainEntity2,
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem2);

    const interchange2 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange2metaEdName,
      interchangeName: interchange2InterchangeName,
      documentation: interchange2Documentation,
    });
    const interchangeItem3 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity3.metaEdName,
      data: { edfiXsd: { xsd_Name: domainEntity3.metaEdName }, edfiInterchangeBrief: { interchangeBriefDescription: domainEntity3Documentation } },
      referencedEntity: domainEntity3,
    });
    const interchangeItem4 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity4.metaEdName,
      data: { edfiXsd: { xsd_Name: domainEntity4.metaEdName }, edfiInterchangeBrief: { interchangeBriefDescription: domainEntity4Documentation } },
      referencedEntity: domainEntity4,
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange2);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem4);

    const builderResult = Object.assign(newMetaEdEnvironment(), {
      dataStandardVersion: '2.1.0',
      plugin: new Map(),
    });
    addEdFiXsdEntityRepositoryTo(builderResult);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange1.interchangeName, interchange1);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange2.interchangeName, interchange2);
    return builderResult;
  }

  beforeAll(async () => {
    generatedResults = (await InterchangeBriefAsMarkdownGenerator(GetBuilderResults())).generatedOutput;
  });

  it('Should include entities', () => {
    expect(generatedResults.length).toBe(3);

    expect(generatedResults[0].resultString).toContain(interchange1InterchangeName);
    expect(generatedResults[0].resultString).toContain(interchange1Documentation);
    expect(generatedResults[0].resultString).toContain(interchange1ExtendedDocumentation);
    expect(generatedResults[0].resultString).toContain(domainEntity1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity2Documentation);

    expect(generatedResults[1].resultString).toContain(interchange2InterchangeName);
    expect(generatedResults[1].resultString).toContain(interchange2Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity3Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity4Documentation);
  });

  it('Should not include extended references', () => {
    expect(generatedResults[0].resultString).toContain('Extended References');
    expect(generatedResults[0].resultString).toContain('This interchange contains no external references.');

    expect(generatedResults[1].resultString).toContain('Extended References');
    expect(generatedResults[1].resultString).toContain('This interchange contains no external references.');
  });
});

describe('When generating interchange brief with use case documentation', () => {
  const interchange1metaEdName = 'Interchange1metaEdName';
  const interchange2metaEdName = 'Interchange2metaEdName';
  const interchange1InterchangeName = 'InterchangeInterchange1metaEdName';
  const interchange2InterchangeName = 'InterchangeInterchange2metaEdName';

  const interchange1Documentation = 'Interchange 1 Documentation here';
  const interchange2Documentation = 'Interchange 2 Documentation here';

  const interchange1UseCaseDocumentation = 'Interchange 1 Use Cases here';

  const domainEntity1Documentation = 'Domain Entity 1 Documentation here';
  const domainEntity2Documentation = 'Domain Entity 2 Documentation here';
  const domainEntity3Documentation = 'Domain Entity 3 Documentation here';
  const domainEntity4Documentation = 'Domain Entity 4 Documentation here';

  let generatedResults: Array<GeneratedOutput>;

  function GetBuilderResults() {
    const domainEntity1 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity1',
      documentation: domainEntity1Documentation,
    });
    const domainEntity2 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity2',
      documentation: domainEntity2Documentation,
    });
    const domainEntity3 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity3',
      documentation: domainEntity3Documentation,
    });
    const domainEntity4 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity4',
      documentation: domainEntity4Documentation,
    });

    const interchange1 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange1metaEdName,
      interchangeName: interchange1InterchangeName,
      documentation: interchange1Documentation,
      useCaseDocumentation: interchange1UseCaseDocumentation,
    });
    const interchangeItem1 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity1.metaEdName,
      referencedEntity: domainEntity1,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity1Documentation } },
    });
    const interchangeItem2 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity2.metaEdName,
      referencedEntity: domainEntity2,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity2Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem2);

    const interchange2 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange2metaEdName,
      interchangeName: interchange2InterchangeName,
      documentation: interchange2Documentation,
    });
    const interchangeItem3 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity3.metaEdName,
      referencedEntity: domainEntity3,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity3Documentation } },
    });
    const interchangeItem4 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity4.metaEdName,
      referencedEntity: domainEntity4,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity4Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange2);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem4);

    const builderResult = Object.assign(newMetaEdEnvironment(), {
      dataStandardVersion: '2.1.0',
      plugin: new Map(),
    });
    addEdFiXsdEntityRepositoryTo(builderResult);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange1.interchangeName, interchange1);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange2.interchangeName, interchange2);
    return builderResult;
  }

  beforeAll(async () => {
    generatedResults = (await InterchangeBriefAsMarkdownGenerator(GetBuilderResults())).generatedOutput;
  });

  it('Should include entities', () => {
    expect(generatedResults.length).toBe(3);

    expect(generatedResults[0].resultString).toContain(interchange1InterchangeName);
    expect(generatedResults[0].resultString).toContain(interchange1Documentation);
    expect(generatedResults[0].resultString).toContain(interchange1UseCaseDocumentation);
    expect(generatedResults[0].resultString).toContain(domainEntity1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity2Documentation);

    expect(generatedResults[1].resultString).toContain(interchange2InterchangeName);
    expect(generatedResults[1].resultString).toContain(interchange2Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity3Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity4Documentation);
  });

  it('Should not include extended references', () => {
    expect(generatedResults[0].resultString).toContain('Extended References');
    expect(generatedResults[0].resultString).toContain('This interchange contains no external references.');

    expect(generatedResults[1].resultString).toContain('Extended References');
    expect(generatedResults[1].resultString).toContain('This interchange contains no external references.');
  });
});

describe('When generating interchange brief with extended and use case documentation', () => {
  const interchange1metaEdName = 'Interchange1metaEdName';
  const interchange2metaEdName = 'Interchange2metaEdName';
  const interchange1InterchangeName = 'InterchangeInterchange1metaEdName';
  const interchange2InterchangeName = 'InterchangeInterchange2metaEdName';

  const interchange1Documentation = 'Interchange 1 Documentation here';
  const interchange2Documentation = 'Interchange 2 Documentation here';

  const interchange1ExtendedDocumentation = 'Interchange 1 Extended Documentation here';
  const interchange1UseCaseDocumentation = 'Interchange 1 Use Cases here';

  const domainEntity1Documentation = 'Domain Entity 1 Documentation here';
  const domainEntity2Documentation = 'Domain Entity 2 Documentation here';
  const domainEntity3Documentation = 'Domain Entity 3 Documentation here';
  const domainEntity4Documentation = 'Domain Entity 4 Documentation here';

  let generatedResults: Array<GeneratedOutput>;

  function GetBuilderResults() {
    const domainEntity1 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity1',
      documentation: domainEntity1Documentation,
    });
    const domainEntity2 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity2',
      documentation: domainEntity2Documentation,
    });
    const domainEntity3 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity3',
      documentation: domainEntity3Documentation,
    });
    const domainEntity4 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity4',
      documentation: domainEntity4Documentation,
    });

    const interchange1 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange1metaEdName,
      interchangeName: interchange1InterchangeName,
      documentation: interchange1Documentation,
      extendedDocumentation: interchange1ExtendedDocumentation,
      useCaseDocumentation: interchange1UseCaseDocumentation,
    });
    const interchangeItem1 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity1.metaEdName,
      referencedEntity: domainEntity1,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity1Documentation } },
    });
    const interchangeItem2 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity2.metaEdName,
      referencedEntity: domainEntity2,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity2Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem2);

    const interchange2 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange2metaEdName,
      interchangeName: interchange2InterchangeName,
      documentation: interchange2Documentation,
    });
    const interchangeItem3 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity3.metaEdName,
      referencedEntity: domainEntity3,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity3Documentation } },
    });
    const interchangeItem4 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity4.metaEdName,
      referencedEntity: domainEntity4,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity4Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange2);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem4);

    const builderResult = Object.assign(newMetaEdEnvironment(), {
      dataStandardVersion: '2.1.0',
      plugin: new Map(),
    });
    addEdFiXsdEntityRepositoryTo(builderResult);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange1.interchangeName, interchange1);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange2.interchangeName, interchange2);
    return builderResult;
  }

  beforeAll(async () => {
    generatedResults = (await InterchangeBriefAsMarkdownGenerator(GetBuilderResults())).generatedOutput;
  });

  it('Shouldincludeentities', () => {
    expect(generatedResults.length).toBe(3);

    expect(generatedResults[0].resultString).toContain(interchange1InterchangeName);
    expect(generatedResults[0].resultString).toContain(interchange1Documentation);
    expect(generatedResults[0].resultString).toContain(interchange1ExtendedDocumentation);
    expect(generatedResults[0].resultString).toContain(interchange1UseCaseDocumentation);
    expect(generatedResults[0].resultString).toContain(domainEntity1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity2Documentation);

    expect(generatedResults[1].resultString).toContain(interchange2InterchangeName);
    expect(generatedResults[1].resultString).toContain(interchange2Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity3Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity4Documentation);
  });

  it('Shouldnotincludeextendedreferences', () => {
    expect(generatedResults[0].resultString).toContain('Extended References');
    expect(generatedResults[0].resultString).toContain('This interchange contains no external references.');

    expect(generatedResults[1].resultString).toContain('Extended References');
    expect(generatedResults[1].resultString).toContain('This interchange contains no external references.');
  });
});

describe('When generating interchange brief with extended references', () => {
  const interchange1metaEdName = 'Interchange1metaEdName';
  const interchange2metaEdName = 'Interchange2metaEdName';
  const interchange1InterchangeName = 'InterchangeInterchange1metaEdName';
  const interchange2InterchangeName = 'InterchangeInterchange2metaEdName';

  const interchange1Documentation = 'Interchange 1 Documentation here';
  const interchange2Documentation = 'Interchange 2 Documentation here';

  const domainEntity1Documentation = 'Domain Entity 1 Documentation here';
  const domainEntity2Documentation = 'Domain Entity 2 Documentation here';
  const domainEntity3Documentation = 'Domain Entity 3 Documentation here';
  const domainEntity4Documentation = 'Domain Entity 4 Documentation here';

  const referenceUsage1Name = 'Reference Usage 1 Name';
  const referenceUsage2Name = 'Reference Usage 2 Name';
  const referenceUsage3Name = 'Reference Usage 3 Name';
  const referenceUsage4Name = 'Reference Usage 4 Name';

  const referenceUsage1Description = 'Reference Usage 1 Description';
  const referenceUsage2Description = 'Reference Usage 2 Description';
  const referenceUsage3Description = 'Reference Usage 3 Description';
  const referenceUsage4Description = 'Reference Usage 4 Description';

  let generatedResults: Array<GeneratedOutput>;

  function GetBuilderResults() {
    const domainEntity1 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity1',
      documentation: domainEntity1Documentation,
    });
    const domainEntity2 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity2',
      documentation: domainEntity2Documentation,
    });
    const domainEntity3 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity3',
      documentation: domainEntity3Documentation,
    });
    const domainEntity4 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity4',
      documentation: domainEntity4Documentation,
    });

    const referenceUsage1: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage1Name,
      description: referenceUsage1Description,
    });
    const referenceUsage2: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage2Name,
      description: referenceUsage2Description,
    });
    const referenceUsage3: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage3Name,
      description: referenceUsage3Description,
    });
    const referenceUsage4: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage4Name,
      description: referenceUsage4Description,
    });

    const interchange1 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange1metaEdName,
      interchangeName: interchange1InterchangeName,
      documentation: interchange1Documentation,
    });
    const interchangeItem1 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity1.metaEdName,
      referencedEntity: domainEntity1,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity1Documentation } },
    });
    const interchangeItem2 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity2.metaEdName,
      referencedEntity: domainEntity2,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity2Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem2);

    interchange1.data.edfiInterchangeBrief.interchangeBriefExtendedReferences.push(referenceUsage1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefExtendedReferences.push(referenceUsage2);

    const interchange2 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange2metaEdName,
      interchangeName: interchange2InterchangeName,
      documentation: interchange2Documentation,
    });
    const interchangeItem3 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity3.metaEdName,
      referencedEntity: domainEntity3,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity3Documentation } },
    });
    const interchangeItem4 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity4.metaEdName,
      referencedEntity: domainEntity4,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity4Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange2);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem4);

    interchange2.data.edfiInterchangeBrief.interchangeBriefExtendedReferences.push(referenceUsage3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefExtendedReferences.push(referenceUsage4);

    const builderResult = Object.assign(newMetaEdEnvironment(), {
      dataStandardVersion: '2.1.0',
      plugin: new Map(),
    });
    addEdFiXsdEntityRepositoryTo(builderResult);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange1.interchangeName, interchange1);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange2.interchangeName, interchange2);
    return builderResult;
  }

  beforeAll(async () => {
    generatedResults = (await InterchangeBriefAsMarkdownGenerator(GetBuilderResults())).generatedOutput;
  });

  it('Shouldincludeentities', () => {
    expect(generatedResults.length).toBe(3);

    expect(generatedResults[0].resultString).toContain(interchange1InterchangeName);
    expect(generatedResults[0].resultString).toContain(interchange1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity2Documentation);

    expect(generatedResults[1].resultString).toContain(interchange2InterchangeName);
    expect(generatedResults[1].resultString).toContain(interchange2Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity3Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity4Documentation);
  });

  it('Should include extended references', () => {
    expect(generatedResults[0].resultString).toContain('Extended References');
    expect(generatedResults[0].resultString).toContain(referenceUsage1Name);
    expect(generatedResults[0].resultString).toContain(referenceUsage2Name);
    expect(generatedResults[0].resultString).toContain(referenceUsage1Description);
    expect(generatedResults[0].resultString).toContain(referenceUsage2Description);

    expect(generatedResults[1].resultString).toContain('Extended References');
    expect(generatedResults[1].resultString).toContain(referenceUsage3Name);
    expect(generatedResults[1].resultString).toContain(referenceUsage4Name);
    expect(generatedResults[1].resultString).toContain(referenceUsage3Description);
    expect(generatedResults[1].resultString).toContain(referenceUsage4Description);
  });
});

describe('When generating interchange brief with descriptors', () => {
  const interchange1metaEdName = 'Interchange1metaEdName';
  const interchange2metaEdName = 'Interchange2metaEdName';
  const interchange1InterchangeName = 'InterchangeInterchange1metaEdName';
  const interchange2InterchangeName = 'InterchangeInterchange2metaEdName';

  const interchange1Documentation = 'Interchange 1 Documentation here';
  const interchange2Documentation = 'Interchange 2 Documentation here';

  const domainEntity1Documentation = 'Domain Entity 1 Documentation here';
  const domainEntity2Documentation = 'Domain Entity 2 Documentation here';
  const domainEntity3Documentation = 'Domain Entity 3 Documentation here';
  const domainEntity4Documentation = 'Domain Entity 4 Documentation here';

  const referenceUsage1Name = 'Reference Usage 1 Name';
  const referenceUsage2Name = 'Reference Usage 2 Name';
  const referenceUsage3Name = 'Reference Usage 3 Name';
  const referenceUsage4Name = 'Reference Usage 4 Name';

  const referenceUsage1Description = 'Reference Usage 1 Description';
  const referenceUsage2Description = 'Reference Usage 2 Description';
  const referenceUsage3Description = 'Reference Usage 3 Description';
  const referenceUsage4Description = 'Reference Usage 4 Description';

  let generatedResults: Array<GeneratedOutput>;

  function GetBuilderResults() {
    const domainEntity1 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity1',
      documentation: domainEntity1Documentation,
    });
    const domainEntity2 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity2',
      documentation: domainEntity2Documentation,
    });
    const domainEntity3 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity3',
      documentation: domainEntity3Documentation,
    });
    const domainEntity4 = Object.assign(newDomainEntity(), {
      metaEdName: 'domainEntity4',
      documentation: domainEntity4Documentation,
    });

    const referenceUsage1: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage1Name,
      description: referenceUsage1Description,
    });
    const referenceUsage2: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage2Name,
      description: referenceUsage2Description,
    });
    const referenceUsage3: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage3Name,
      description: referenceUsage3Description,
    });
    const referenceUsage4: ReferenceUsageInfo = Object.assign(newReferenceUsageInfo(), {
      name: referenceUsage4Name,
      description: referenceUsage4Description,
    });

    const interchange1 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange1metaEdName,
      interchangeName: interchange1InterchangeName,
      documentation: interchange1Documentation,
    });
    const interchangeItem1 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity1.metaEdName,
      referencedEntity: domainEntity1,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity1Documentation } },
    });
    const interchangeItem2 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity2.metaEdName,
      referencedEntity: domainEntity2,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity2Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem2);

    interchange1.data.edfiInterchangeBrief.interchangeBriefDescriptorReferences.push(referenceUsage1);
    interchange1.data.edfiInterchangeBrief.interchangeBriefDescriptorReferences.push(referenceUsage2);

    const interchange2 = Object.assign(newMergedInterchange(), {
      metaEdName: interchange2metaEdName,
      interchangeName: interchange2InterchangeName,
      documentation: interchange2Documentation,
    });
    const interchangeItem3 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity3.metaEdName,
      referencedEntity: domainEntity3,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity3Documentation } },
    });
    const interchangeItem4 = Object.assign(newInterchangeItem(), {
      metaEdName: domainEntity4.metaEdName,
      referencedEntity: domainEntity4,
      data: { edfiInterchangeBrief: { interchangeBriefDescription: domainEntity4Documentation } },
    });
    addMergedInterchangeEdfiInterchangeBriefTo(interchange2);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefEntities.push(interchangeItem4);

    interchange2.data.edfiInterchangeBrief.interchangeBriefDescriptorReferences.push(referenceUsage3);
    interchange2.data.edfiInterchangeBrief.interchangeBriefDescriptorReferences.push(referenceUsage4);

    const builderResult = Object.assign(newMetaEdEnvironment(), {
      dataStandardVersion: '2.1.0',
      plugin: new Map(),
    });
    addEdFiXsdEntityRepositoryTo(builderResult);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange1.interchangeName, interchange1);
    (builderResult.plugin.get('edfiXsd'): any).entity.mergedInterchange.set(interchange2.interchangeName, interchange2);
    return builderResult;
  }

  beforeAll(async () => {
    generatedResults = (await InterchangeBriefAsMarkdownGenerator(GetBuilderResults())).generatedOutput;
  });

  it('Should include entities', () => {
    expect(generatedResults.length).toBe(3);

    expect(generatedResults[0].resultString).toContain(interchange1InterchangeName);
    expect(generatedResults[0].resultString).toContain(interchange1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity1Documentation);
    expect(generatedResults[0].resultString).toContain(domainEntity2Documentation);

    expect(generatedResults[1].resultString).toContain(interchange2InterchangeName);
    expect(generatedResults[1].resultString).toContain(interchange2Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity3Documentation);
    expect(generatedResults[1].resultString).toContain(domainEntity4Documentation);
  });

  it('Should not include extended references', () => {
    expect(generatedResults[0].resultString).toContain('Extended References');
    expect(generatedResults[0].resultString).toContain('This interchange contains no external references.');

    expect(generatedResults[1].resultString).toContain('Extended References');
    expect(generatedResults[1].resultString).toContain('This interchange contains no external references.');
  });

  it('Should include descriptor dependencies', () => {
    expect(generatedResults[0].resultString).toContain('Descriptor Dependencies');
    expect(generatedResults[0].resultString).toContain(referenceUsage1Name);
    expect(generatedResults[0].resultString).toContain(referenceUsage2Name);
    expect(generatedResults[0].resultString).toContain(referenceUsage1Description);
    expect(generatedResults[0].resultString).toContain(referenceUsage2Description);

    expect(generatedResults[1].resultString).toContain('Descriptor Dependencies');
    expect(generatedResults[1].resultString).toContain(referenceUsage3Name);
    expect(generatedResults[1].resultString).toContain(referenceUsage4Name);
    expect(generatedResults[1].resultString).toContain(referenceUsage3Description);
    expect(generatedResults[1].resultString).toContain(referenceUsage4Description);
  });
});
