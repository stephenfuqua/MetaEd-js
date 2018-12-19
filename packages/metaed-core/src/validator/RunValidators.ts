import { State } from '../State';
import { Validator } from './Validator';
import { PluginManifest } from '../plugin/PluginManifest';

export function execute(pluginManifest: PluginManifest, state: State): void {
  if (state.metaEd.namespace == null || state.metaEd.propertyIndex == null) return;

  pluginManifest.metaEdPlugin.validator.forEach((validator: Validator) => {
    state.validationFailure.push(...validator(state.metaEd));
  });
}
