// @noflow
import mockfs from 'mock-fs';
import MetaEdTextBuilder from '../../../packages/metaed-core/test/MetaEdTextBuilder';
import loadFiles from '../../../packages/metaed-core/src/task/FileSystemFilenameLoader';
import { newState } from '../../../packages/metaed-core/src/State';

describe('When a single file', () => {
  beforeAll(() => {
    const metaEdText = MetaEdTextBuilder.build()
    .withStartDomainEntity('DomainEntity1')
    .withDocumentation('doc1')
    .withStringIdentity('Property1', 'doc2', '100')
    .withEndDomainEntity()
    .toString();

    mockfs({
      '/fake/dir': {
        'DomainEntity1.metaed': metaEdText,
      },
    });
  });

  afterAll(() => {
    mockfs.restore();
  });

  it('Should load the file contents', () => {
    const newState = loadFiles(Object.assign(newState(),
      {
        inputDirectories: [{
          path: '/fake/dir',
          namespace: 'edfi',
          projectExtension: '',
          isExtension: false,
        }],
      }));
    const contents = newState.loadedFileSet[0].files[0].contents;
    expect(contents).toMatch('Domain Entity');
    expect(contents).toMatch('DomainEntity1');
    expect(contents).toMatch('string');
    expect(contents).toMatch('Property1');
  });
});

describe('When multiple files', () => {
  beforeAll(() => {
    const metaEdTextDomainEntity = MetaEdTextBuilder.build()
    .withStartDomainEntity('DomainEntity1')
    .withDocumentation('doc')
    .withStringIdentity('Property1', 'doc', '100')
    .withEndDomainEntity()
    .toString();

    const metaEdTextAssociation = MetaEdTextBuilder.build()
    .withStartAssociation('Association1')
    .withDocumentation('doc')
    .withAssociationDomainEntityProperty('Domain1', 'doc')
    .withAssociationDomainEntityProperty('Domain2', 'doc')
    .withIntegerIdentity('Property2', 'doc', '100')
    .withEndDomainEntity()
    .toString();

    mockfs({
      '/fake/dir': {
        'Domain Entities': {
          'DomainEntity1.metaed': metaEdTextDomainEntity,
        },
        Associations: {
          'Association1.metaed': metaEdTextAssociation,
        },
      },
    });
  });

  afterAll(() => {
    mockfs.restore();
  });

  it('Should load the file contents', () => {
    const newState = loadFiles(Object.assign(newState(),
      {
        inputDirectories: [{
          path: '/fake/dir',
          namespace: 'edfi',
          projectExtension: '',
          isExtension: false,
        }],
      }));
    const associationContents = newState.loadedFileSet[0].files[0].contents;
    expect(associationContents).toMatch('Association');
    expect(associationContents).toMatch('Domain1');
    expect(associationContents).toMatch('Domain2');
    expect(associationContents).toMatch('integer');
    expect(associationContents).toMatch('Property2');
    expect(associationContents).toMatchSnapshot();

    const domainEntityContents = newState.loadedFileSet[0].files[1].contents;
    expect(domainEntityContents).toMatch('Domain Entity');
    expect(domainEntityContents).toMatch('DomainEntity1');
    expect(domainEntityContents).toMatch('string');
    expect(domainEntityContents).toMatch('Property1');
    expect(associationContents).toMatchSnapshot();
  });
});
