// @flow
import type { State } from '../State';
import type { Generator } from '../generator/Generator';
import type { PluginManifest } from '../plugin/PluginTypes';

export function execute(pluginManifest: PluginManifest, state: State): void {
  pluginManifest.metaEdPlugin.generator.forEach((generator: Generator) => {
    if (state.metaEd.entity != null && state.metaEd.propertyIndex != null) {
      state.generatorResults.push(generator(state.metaEd));
    }
  });
}
