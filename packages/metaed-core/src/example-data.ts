export const repository = {
  unified: {
    core: {
      domainEntity: {
        School: {
          metaEdName: 'School',
          metaEdId: '123',
          property: {
            Name: {
              type: 'StringProperty',
              metaEdName: 'Name',
              metaEdId: '456',
              maxLength: 123,
              roleName: '',
            },
            EducationOrganization: {
              type: 'domainEntityProperty',
              metaEdName: 'EducationOrganization',
              metaEdId: '789',
              reference: 'core/domainEntity/EducationOrganization',
              roleName: '',
            },
            AlternateEducationOrganization: {
              type: 'domainEntityProperty',
              metaEdName: 'EducationOrganization',
              metaEdId: '789',
              roleName: 'Alternate',
              reference: 'core/domainEntity/EducationOrganization',
            },
          },
        },
        EducationOrganization: {
          metaEdName: 'EducationOrganization',
          metaEdId: '1234',
          property: {
            Name: {
              type: 'StringProperty',
              metaEdName: 'Name',
              metaEdId: '4564',
            },
          },
        },
      },
    },
    extension: {},
  },
  plugin: {
    EdFiOdsSqlServer: {
      table: {
        name: 'School',
        column: {
          name: 'Name',
          type: 'VARCHAR(50)',
          isPrimaryKey: false,
          sourceProperties: [{ ref: 'core/domainEntity/blah' }, { ref: 'core/domainEntity/blah2' }],
        },
        foreignKey: [{ localColumn: 'Name', parentColumnRef: 'Student/column/' }],
      },
    },
    EdFiXsd: {},
    EdFiHandbook: {},
  },
};
