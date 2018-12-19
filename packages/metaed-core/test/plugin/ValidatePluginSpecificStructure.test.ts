import Joi from 'joi';
import { validatePluginSpecificStructure } from '../../src/plugin/LoadPluginConfiguration';
import { ConfigurationSchema } from '../../src/plugin/ConfigurationSchema';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

describe('when config matches rule', () => {
  const pluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };

  const configurationSchemas: ConfigurationSchema = new Map([
    [
      'rule123',
      Joi.object().keys({
        explainer: Joi.string().required(),
      }),
    ],
  ]);

  it('should be valid', () => {
    const result: Array<ValidationFailure> = validatePluginSpecificStructure(pluginConfiguration, configurationSchemas);
    expect(result).toHaveLength(0);
  });
});

describe('when config does not match rule schema', () => {
  const pluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          data: {
            notexplainer: 'wrong',
          },
        },
      ],
    },
  };

  const configurationSchemas: ConfigurationSchema = new Map([
    [
      'rule123',
      Joi.object().keys({
        explainer: Joi.string().required(),
      }),
    ],
  ]);

  it('should not be valid', () => {
    const result: Array<ValidationFailure> = validatePluginSpecificStructure(pluginConfiguration, configurationSchemas);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchSnapshot();
    expect(result[1]).toMatchSnapshot();
  });
});

describe('when config does not match rule schema', () => {
  const pluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'not valid rule',
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };

  const configurationSchemas: ConfigurationSchema = new Map([
    [
      'rule123',
      Joi.object().keys({
        explainer: Joi.string().required(),
      }),
    ],
  ]);

  it('should not be valid', () => {
    const result: Array<ValidationFailure> = validatePluginSpecificStructure(pluginConfiguration, configurationSchemas);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchSnapshot();
  });
});
