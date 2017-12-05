// @flow
import winston from 'winston';
import type { State } from '../State';
import type { Validator } from '../validator/Validator';
import type { PluginManifest } from '../plugin/PluginTypes';

export function execute(state: State): void {
  state.pluginManifest.filter((pluginManifest: PluginManifest) => pluginManifest.enabled).forEach(pluginManifest => {
    try {
      pluginManifest.metaEdPlugin.validator.forEach((validator: Validator) => {
        if (state.metaEd.entity != null && state.metaEd.propertyIndex != null) {
          state.validationFailure.push(...validator(state.metaEd));
        }
      });
    } catch (err) {
      winston.error(`Plugin ${pluginManifest.npmName} threw exception '${err.message}', and will be disabled.`);
      pluginManifest.enabled = false;
    }
  });
}
