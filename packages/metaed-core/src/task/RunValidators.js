// @flow
import type { State } from '../State';
import type { Validator } from '../validator/Validator';
import type { PluginManifest } from '../plugin/PluginTypes';

export function execute(pluginManifest: PluginManifest, state: State): void {
  if (state.metaEd.namespace == null || state.metaEd.propertyIndex == null) return;

  pluginManifest.metaEdPlugin.validator.forEach((validator: Validator) => {
    state.validationFailure.push(...validator(state.metaEd));
  });
}
