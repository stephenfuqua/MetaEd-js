// @flow
import winston from 'winston';
import type { State } from '../State';
import type { Validator } from '../validator/Validator';

export function execute(state: State): State {
  state.pluginManifest.filter(plugin => plugin.enabled).forEach(pluginManifest => {
    try {
      pluginManifest.metaEdPlugin.validator.forEach((validator: Validator) => {
        if (state.metaEd.entity != null && state.metaEd.propertyIndex != null) {
          state.validationFailure.push(...validator(state.metaEd));
        }
      });
    } catch (err) {
      winston.error(`Plugin ${pluginManifest.description} threw an exception, and will be disabled.`);
      pluginManifest.enabled = false;
    }
  });

  return state;
}
