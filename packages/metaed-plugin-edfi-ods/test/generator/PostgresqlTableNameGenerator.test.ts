import { postgresqlTableName } from '../../src/generator/PostgresqlTableNameGenerator';

describe('three components, one equal length to even length', (): void => {
  let result: string = '';
  beforeAll(() => {
    result = postgresqlTableName(['GraduationPlan', 'RequiredAssessment', 'RequiredAssessmentPerformanceLevel']);
  });

  it('should generate correctly', (): void => {
    expect(result.length).toBe(61);
    expect(result).toBe('GraduationPlanRequiredAssessmentRequiredAssessmentPerf-876ba3');
  });
});

describe('three components, one very short, none equal to even length', (): void => {
  let result: string = '';
  beforeAll(() => {
    result = postgresqlTableName(['StudentEducationOrganizationAssociation', 'StudentCharacteristic', 'Period']);
  });

  it('should generate correctly', (): void => {
    expect(result.length).toBe(61);
    expect(result).toBe('StudentEducationOrganizatioStudentCharacteristicPeriod-a18fcf');
  });
});

describe('two components, none equal to even length, one character too long in total', (): void => {
  let result: string = '';
  beforeAll(() => {
    result = postgresqlTableName(['StudentEducationOrganizationAssociation', 'StudentIdentificationCode']);
  });

  it('should generate correctly', (): void => {
    expect(result.length).toBe(63);
    expect(result).toBe('StudentEducationOrganizationAssStudentIdentificationCode-c15030');
  });
});

describe('three components, combined length below limit', (): void => {
  let result: string = '';
  beforeAll(() => {
    result = postgresqlTableName(['GraduationPlan', 'RequiredAssessment', 'RequiredAssessmentScore']);
  });

  it('should generate correctly', (): void => {
    expect(result.length).toBe(55);
    expect(result).toBe('GraduationPlanRequiredAssessmentRequiredAssessmentScore');
  });
});
