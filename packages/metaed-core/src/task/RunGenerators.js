// @flow
import type { State } from '../State';
import type { Generator } from '../generator/Generator';
import type { PluginManifest } from '../plugin/PluginTypes';

export async function execute(pluginManifest: PluginManifest, state: State): Promise<void> {
  // eslint-disable-next-line no-restricted-syntax
  for (const generator: Generator of pluginManifest.metaEdPlugin.generator) {
    if (state.metaEd.entity != null && state.metaEd.propertyIndex != null) {
      state.generatorResults.push(await generator(state.metaEd));
    }
  }
}
