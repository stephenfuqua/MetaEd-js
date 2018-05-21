// @flow
import type { State } from '../State';
import type { Generator } from '../generator/Generator';
import type { PluginManifest } from '../plugin/PluginTypes';

export async function execute(pluginManifest: PluginManifest, state: State): Promise<void> {
  if (state.metaEd.namespace == null || state.metaEd.propertyIndex == null) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const generator: Generator of pluginManifest.metaEdPlugin.generator) {
    state.generatorResults.push(await generator(state.metaEd));
  }
}
