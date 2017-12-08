// @flow
import type { State } from '../State';
import type { Validator } from '../validator/Validator';
import type { PluginManifest } from '../plugin/PluginTypes';

export function execute(pluginManifest: PluginManifest, state: State): void {
  pluginManifest.metaEdPlugin.validator.forEach((validator: Validator) => {
    if (state.metaEd.entity != null && state.metaEd.propertyIndex != null) {
      state.validationFailure.push(...validator(state.metaEd));
    }
  });
}
