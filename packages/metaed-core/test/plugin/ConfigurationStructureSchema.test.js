// @flow
import { configurationStructureSchema } from '../../src/plugin/ConfigurationSchema';

describe('when config is single plugin level rule', () => {
  const configToTest = {
    config: {
      rule: '35113',
      data: {
        explainer: 'this object goes on the plugin that is in scope',
      },
    },
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config is single plugin level rule in array', () => {
  const configToTest = {
    config: [
      {
        rule: '35113',
        data: {
          explainer: 'this object goes on the plugin that is in scope',
        },
      },
    ],
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config is single rule with matches', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: [
        {
          entity: ['domainEntity', 'association'],
          extensions: true,
        },
      ],
      data: {
        explainer: 'this object goes on all domain entities and associations in extension namespaces',
      },
    },
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config is single rule in array with matches', () => {
  const configToTest = {
    config: [
      {
        rule: '4433334',
        matches: [
          {
            entity: ['domainEntity', 'association'],
            extensions: true,
          },
        ],
        data: {
          explainer: 'this object goes on all domain entities and associations in extension namespaces',
        },
      },
    ],
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config is multiple rules', () => {
  const configToTest = {
    config: [
      {
        rule: '4433334',
        matches: [
          {
            entity: ['domainEntity', 'association'],
            extensions: true,
          },
        ],
        data: {
          explainer: 'this object goes on all domain entities and associations in extension namespaces',
        },
      },
      {
        rule: '1133334',
        matches: [
          {
            entity: ['domainEntity', 'association'],
            extensions: true,
          },
        ],
        data: {
          explainer: 'this object goes on all domain entities and associations in extension namespaces',
        },
      },
    ],
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config has single match', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        entity: ['domainEntity', 'association'],
        extensions: true,
      },

      data: {
        explainer: 'this object goes on all domain entities and associations in extension namespaces',
      },
    },
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config has single match', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        entity: ['domainEntity', 'association'],
        extensions: true,
      },

      data: {
        explainer: 'this object goes on all domain entities and associations in extension namespaces',
      },
    },
  };

  it('should be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).toBeNull();
  });
});

describe('when config has invalid entity type', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        entity: 'invalid',
      },

      data: {
        explainer: 'this is not a valid entity type',
      },
    },
  };

  it('should not be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).not.toBeNull();
    expect(result.error).toMatchSnapshot();
  });
});

describe('when config has matches with core flag along with namespace', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        entity: ['domainEntity', 'association'],
        namespace: 'xyz',
        core: true,
      },

      data: {
        explainer: 'this is not a valid pairing',
      },
    },
  };

  it('should not be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).not.toBeNull();
    expect(result.error).toMatchSnapshot();
  });
});

describe('when config has matches with extensions flag along with namespace', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        entity: ['domainEntity', 'association'],
        namespace: 'xyz',
        extensions: true,
      },

      data: {
        explainer: 'this is not a valid pairing',
      },
    },
  };

  it('should not be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).not.toBeNull();
    expect(result.error).toMatchSnapshot();
  });
});

describe('when config has matches with entityName but without entity type', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        entityName: 'NeedsTypeDefined',
      },

      data: {
        explainer: 'this is not valid wihout entity',
      },
    },
  };

  it('should not be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).not.toBeNull();
    expect(result.error).toMatchSnapshot();
  });
});

describe('when config has invalid matches field', () => {
  const configToTest = {
    config: {
      rule: '4433334',
      matches: {
        invalid: 'yes',
      },

      data: {
        explainer: 'this is not a valid field',
      },
    },
  };

  it('should not be valid', () => {
    const result = configurationStructureSchema.validate(configToTest, { abortEarly: false });
    expect(result.error).not.toBeNull();
    expect(result.error).toMatchSnapshot();
  });
});
