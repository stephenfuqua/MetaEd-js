import R from 'ramda';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddRoleNameFromEducationContentDSLRMUriDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newStringColumn } from '../../src/model/database/Column';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { Table } from '../../src/model/database/Table';

describe('when AddRoleNameFromEducationContentDSLRMUriDiminisher diminishes EducationContentDerivativeSourceLearningResourceMetadataURI table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationContentDerivativeSourceLearningResourceMetadataURI =
    'EducationContentDerivativeSourceLearningResourceMetadataURI';
  const learningResourceMetadataURI = 'LearningResourceMetadataURI';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const derivativeSourceLearningResourceMetadataURI = 'DerivativeSourceLearningResourceMetadataURI';
    const table: Table = Object.assign(newTable(), {
      name: educationContentDerivativeSourceLearningResourceMetadataURI,
      columns: [
        Object.assign(newStringColumn('123'), {
          name: derivativeSourceLearningResourceMetadataURI,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename DerivativeSourceLearningResourceMetadataURI column to LearningResourceMetadataURI', () => {
    const column: Column = R.head(
      (tableEntities(metaEd, namespace).get(educationContentDerivativeSourceLearningResourceMetadataURI) as Table).columns,
    );
    expect(column.name).toBe(learningResourceMetadataURI);
  });

  it('should set column length', () => {
    const column: Column = R.head(
      (tableEntities(metaEd, namespace).get(educationContentDerivativeSourceLearningResourceMetadataURI) as Table).columns,
    );
    expect(R.prop('length', column)).toBe('225');
    expect(column.dataType).toBe('[NVARCHAR](225)');
  });
});

describe('when AddRoleNameFromEducationContentDSLRMUriDiminisher diminishes EducationContentDerivativeSourceURI table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const educationContentDerivativeSourceURI = 'EducationContentDerivativeSourceURI';
  const uri = 'URI';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const derivativeSourceURI = 'DerivativeSourceURI';
    const table: Table = Object.assign(newTable(), {
      name: educationContentDerivativeSourceURI,
      columns: [
        Object.assign(newStringColumn('123'), {
          name: derivativeSourceURI,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename DerivativeSourceURI column to URI', () => {
    // $FlowIgnore null check
    const column: Column = R.head(
      (tableEntities(metaEd, namespace).get(educationContentDerivativeSourceURI) as Table).columns,
    );
    expect(column.name).toBe(uri);
  });

  it('should set column length', () => {
    // $FlowIgnore null check
    const column: Column = R.head(
      (tableEntities(metaEd, namespace).get(educationContentDerivativeSourceURI) as Table).columns,
    );
    expect(R.prop('length', column)).toBe('225');
    expect(column.dataType).toBe('[NVARCHAR](225)');
  });
});
