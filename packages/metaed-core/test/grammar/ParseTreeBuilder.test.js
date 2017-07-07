// @flow
import { MetaEdErrorListener } from '../../src/grammar/MetaEdErrorListener';
import { buildTopLevelEntity, buildMetaEd } from '../../src/grammar/ParseTreeBuilder';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when parsing top level entities', () => {
  it('should parse with valid MetaEd', () => {
    const inputText = [
      'Domain Entity TestEntity',
      'documentation "This is the first line\nThis is more..."',
      '    integer MyProperty',
      '        documentation "Integer documentation"',
      '        is part of identity\n',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildTopLevelEntity(errorListener, inputText);
    expect(validationFailures).toHaveLength(0);
  });

  it('should not parse with extraneous xyz', () => {
    const inputText = [
      'Domain Entity TestEntity',
      'documentation "This is the first line\nThis is more..."',
      '    integer MyProperty xyz',
      '        documentation "Integer documentation"',
      '        is part of identity\n',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildTopLevelEntity(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing top level entities should not parse with extraneous xyz - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing top level entities should not parse with extraneous xyz - sourceMap');
  });

  it('should not parse with multiple keyword syntax errors', () => {
    const inputText = [
      'Domain Entity Staff additions\n',
      'descriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
      'shared decimal ProfessionalDevelopment named NewTeacherClassroomManagementProfessionalDevelopment\n',
      'documentation "The number of days of professional development in classroom management that was provided by the district for new teacher."\n',
      'is optional\n',
      'shared decimal ProfessionalDevelopment named NewTeacherInstructionalDeliveryProfessionalDevelopment\n',
      'documentation "The number of days of professional development in instructional deliver (strategies) that was provided by the district for new teacher."\n',
      'is optional\n',
      'zcommvzxxon REPRaceOrder\n',
      'documentation "none provided"\n',
      'is optional collection\n',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildTopLevelEntity(errorListener, inputText);
    expect(validationFailures).toHaveLength(2);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing top level entities should not parse with multiple keyword syntax errors - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing top level entities should not parse with multiple keyword syntax errors - sourceMap');
    expect(validationFailures[1].message).toMatchSnapshot('when parsing top level entities should not parse with multiple keyword syntax errors - message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when parsing top level entities should not parse with multiple keyword syntax errors - sourceMap');
  });

  it('another example', () => {
    const inputText = [
      'Domain Entity Staff additions\n',
      'descriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildTopLevelEntity(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing top level entities another example - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing top level entities another example - sourceMap');
  });

  it('and another example', () => {
    const inputText = [
      'Domain Entity Staff\n',
      'documentation "Something"\n',
      'descriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildTopLevelEntity(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing top level entities and another example - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing top level entities and another example - sourceMap');
  });

  it('one more example', () => {
    const inputText = [
      'Domain Entity Staff\n',
      'documentation "Something"\n',
      'decscriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildTopLevelEntity(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing top level entities one more example - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing top level entities one more example - sourceMap');
  });
});

describe('when parsing full MetaEd', () => {
  it('should parse with valid MetaEd', () => {
    const inputText = [
      'Begin Namespace extension EXTENSION',
      'Domain Entity TestEntity',
      'documentation "This is the first line\nThis is more..."',
      '    integer MyProperty',
      '        documentation "Integer documentation"',
      '        is part of identity\n',
      'End Namespace',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildMetaEd(errorListener, inputText);
    expect(validationFailures).toHaveLength(0);
  });

  it('should not parse with extraneous xyz', () => {
    const inputText = [
      'Begin Namespace extension EXTENSION',
      'Domain Entity TestEntity',
      'documentation "This is the first line\nThis is more..."',
      '    integer MyProperty xyz',
      '        documentation "Integer documentation"',
      '        is part of identity\n',
      'End Namespace',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildMetaEd(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing full MetaEd should not parse with extraneous xyz - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing full MetaEd should not parse with extraneous xyz - sourceMap');
  });

  it('should not parse with multiple keyword syntax errors', () => {
    const inputText = [
      'Begin Namespace extension EXTENSION',
      'Domain Entity Staff additions\n',
      'descriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
      'shared decimal ProfessionalDevelopment named NewTeacherClassroomManagementProfessionalDevelopment\n',
      'documentation "The number of days of professional development in classroom management that was provided by the district for new teacher."\n',
      'is optional\n',
      'shared decimal ProfessionalDevelopment named NewTeacherInstructionalDeliveryProfessionalDevelopment\n',
      'documentation "The number of days of professional development in instructional deliver (strategies) that was provided by the district for new teacher."\n',
      'is optional\n',
      'zcommvzxxon REPRaceOrder\n',
      'documentation "none provided"\n',
      'is optional collection\n',
      'End Namespace',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildMetaEd(errorListener, inputText);
    expect(validationFailures).toHaveLength(2);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing full MetaEd should not parse with multiple keyword syntax errors - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing full MetaEd should not parse with multiple keyword syntax errors - sourceMap');
    expect(validationFailures[1].message).toMatchSnapshot('when parsing full MetaEd should not parse with multiple keyword syntax errors - message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when parsing full MetaEd should not parse with multiple keyword syntax errors - sourceMap');
  });

  it('another example', () => {
    const inputText = [
      'Begin Namespace extension EXTENSION',
      'Domain Entity Staff additions\n',
      'descriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
      'End Namespace',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildMetaEd(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing full MetaEd another example - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing full MetaEd another example - sourceMap');
  });

  it('and another example', () => {
    const inputText = [
      'Begin Namespace extension EXTENSION',
      'Domain Entity Staff\n',
      'documentation "Something"\n',
      'descriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
      'End Namespace',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildMetaEd(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing full MetaEd and another example - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing full MetaEd and another example - sourceMap');
  });

  it('one more example', () => {
    const inputText = [
      'Begin Namespace extension EXTENSION',
      'Domain Entity Staff\n',
      'documentation "Something"\n',
      'decscriptor EducatorEffectiveness\n',
      'documentation "Indicates the educator effectiveness label as identified by the school district for each educator. The effectiveness labels should be based upon the employees most recent evaluation."\n',
      'is optional\n',
      'comvmon Recognition\n',
      'documentation "Recognition given to a staff member for accomplishments in a co-curricular, or extra-curricular activity."\n',
      'is optional collection\n',
      'End Namespace',
    ].join('\n');

    const validationFailures: Array<ValidationFailure> = [];
    const errorListener = new MetaEdErrorListener(validationFailures);
    buildMetaEd(errorListener, inputText);
    expect(validationFailures).toHaveLength(1);
    expect(validationFailures[0].message).toMatchSnapshot('when parsing full MetaEd one more example - message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when parsing full MetaEd one more example - sourceMap');
  });
});
