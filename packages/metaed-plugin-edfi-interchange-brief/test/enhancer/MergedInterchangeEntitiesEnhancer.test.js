// @flow
import { newMetaEdEnvironment, newDomainEntity, newInterchangeItem } from 'metaed-core';
import type { MetaEdEnvironment, InterchangeItem, DomainEntity } from 'metaed-core';
import { addEdFiXsdEntityRepositoryTo, newMergedInterchange } from 'metaed-plugin-edfi-xsd';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { enhance } from '../../src/enhancer/MergedInterchangeEntitiesEnhancer';
import { addMergedInterchangeEdfiInterchangeBriefTo } from '../../src/model/MergedInterchange';

const interchangeName: string = 'InterchangeName';
const interchangeLevelDomainEntity1Name: string = 'EntityName1';
const interchangeLevelDomainEntity2Name: string = 'EntityName2';

const interchangeLevelDomainEntity1Documentation: string = 'Entity1Documentation';
const interchangeLevelDomainEntity2Documentation: string = 'Entity2Documentation';

let mergedInterchange: MergedInterchange;
let interchangeLevelDomainEntity1: DomainEntity;
let interchangeLevelDomainEntity2: DomainEntity;

let domainEntity1InterchangeItem: InterchangeItem;
let domainEntity2InterchangeItem: InterchangeItem;

const metaEd: MetaEdEnvironment = newMetaEdEnvironment();

function setupRepository() {
  addEdFiXsdEntityRepositoryTo(metaEd);
  mergedInterchange = ((Object.assign(newMergedInterchange(), { metaEdName: interchangeName }): any): MergedInterchange);
  addMergedInterchangeEdfiInterchangeBriefTo(mergedInterchange);

  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;

  interchangeLevelDomainEntity1 = Object.assign(newDomainEntity(), {
    metaEdName: interchangeLevelDomainEntity1Name,
    documentation: interchangeLevelDomainEntity1Documentation,
  });
  interchangeLevelDomainEntity2 = Object.assign(newDomainEntity(), {
    metaEdName: interchangeLevelDomainEntity2Name,
    documentation: interchangeLevelDomainEntity2Documentation,
  });
  domainEntity1InterchangeItem = Object.assign(newInterchangeItem(), {
    metaEdName: interchangeLevelDomainEntity1Name,
    referencedEntity: interchangeLevelDomainEntity1,
  });
  domainEntity2InterchangeItem = Object.assign(newInterchangeItem(), {
    metaEdName: interchangeLevelDomainEntity2Name,
    referencedEntity: interchangeLevelDomainEntity2,
  });

  edFiXsdEntityRepository.mergedInterchange.set(interchangeName, mergedInterchange);
}

describe('when MergedInterchangeEntitiesEnhancer enhances mergedInterchange with no identity templates', () => {
  beforeAll(() => {
    setupRepository();
    mergedInterchange.elements.push(domainEntity1InterchangeItem);
    enhance(metaEd);
  });
  it('should generate entity with description', () => {
    expect(mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities.length).toBe(1);
    const entity = mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities[0];
    expect(entity).toBe(domainEntity1InterchangeItem);
    expect(entity.data.edfiInterchangeBrief.interchangeBriefDescription).toBe(interchangeLevelDomainEntity1Documentation);
  });
});
describe('when MergedInterchangeEntitiesEnhancer enhances mergedInterchange with no identity elements', () => {
  beforeAll(() => {
    setupRepository();
    mergedInterchange.identityTemplates.push(domainEntity1InterchangeItem);
    enhance(metaEd);
  });
  it('should generate entity with description', () => {
    expect(mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities.length).toBe(1);
    const entity = mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities[0];
    expect(entity).toBe(domainEntity1InterchangeItem);
    expect(entity.data.edfiInterchangeBrief.interchangeBriefDescription).toBe(interchangeLevelDomainEntity1Documentation);
  });
});
describe('when MergedInterchangeEntitiesEnhancer enhances mergedInterchange with multiple items', () => {
  beforeAll(() => {
    setupRepository();
    mergedInterchange.elements.push(domainEntity2InterchangeItem);
    mergedInterchange.identityTemplates.push(domainEntity1InterchangeItem);
    enhance(metaEd);
  });
  it('should generate entities', () => {
    expect(mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities.length).toBe(2);
  });
});
describe('when MergedInterchangeEntitiesEnhancer enhances mergedInterchange with element with bad markdown character', () => {
  const inputDocumentation: string = 'Documentation for logic (X | Y)';
  const escapedDocumentation: string = 'Documentation for logic (X \\| Y)';

  beforeAll(() => {
    setupRepository();
    interchangeLevelDomainEntity1.documentation = inputDocumentation;
    mergedInterchange.elements.push(domainEntity1InterchangeItem);
    enhance(metaEd);
  });
  it('should generate entity with description', () => {
    expect(mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities.length).toBe(1);
    const entity = mergedInterchange.data.edfiInterchangeBrief.interchangeBriefEntities[0];
    expect(entity.data.edfiInterchangeBrief.interchangeBriefDescription).toBe(escapedDocumentation);
  });
});
