// @flow
import { newMetaEdEnvironment, newNamespaceInfo, newAssociation } from 'metaed-core';
import type { MetaEdEnvironment, NamespaceInfo, Association } from 'metaed-core';
import { enhance } from '../../src/diminisher/AbstractGeneralStudentProgramAssociationDiminisher';

describe('when diminishing with no matching entity', () => {
  const entityName: string = 'EntityName';
  const namespace: string = 'edfi';

  let association: Association;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '3.0.0' });

    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), { namespace });
    metaEd.entity.namespaceInfo.set(namespaceInfo.namespace, namespaceInfo);

    association = Object.assign(newAssociation(), { namespaceInfo, metaEdName: entityName });
    metaEd.entity.association.set(association.metaEdName, association);

    enhance(metaEd);
  });

  it('should not change associations in namespace', () => {
    expect(association.isAbstract).toBe(false);
  });
});

describe('when diminishing with matching entity', () => {
  const entityName: string = 'EntityName';
  const generalStudentProgramAssociationName: string = 'GeneralStudentProgramAssociation';
  const studentProgramAssociationName: string = 'StudentProgramAssociation';
  const namespace: string = 'edfi';

  let association1: Association;
  let association2: Association;
  let association3: Association;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = Object.assign(newMetaEdEnvironment(), { dataStandardVersion: '3.0.0' });

    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), { namespace });
    metaEd.entity.namespaceInfo.set(namespaceInfo.namespace, namespaceInfo);

    association1 = Object.assign(newAssociation(), { namespaceInfo, metaEdName: generalStudentProgramAssociationName });
    metaEd.entity.association.set(association1.metaEdName, association1);

    association2 = Object.assign(newAssociation(), { namespaceInfo, metaEdName: studentProgramAssociationName });
    metaEd.entity.association.set(association2.metaEdName, association2);

    association3 = Object.assign(newAssociation(), { namespaceInfo, metaEdName: entityName });
    metaEd.entity.association.set(association3.metaEdName, association3);

    enhance(metaEd);
  });

  it('should only set GeneralStudentProgramAssociation isAbstract', () => {
    expect(association1.isAbstract).toBe(true);
    expect(association2.isAbstract).toBe(false);
    expect(association3.isAbstract).toBe(false);
  });
});
