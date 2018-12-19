import { State } from '../State';
import { PluginManifest } from '../plugin/PluginManifest';
import { nextMacroTask } from '../Utility';

export async function execute(pluginManifest: PluginManifest, state: State): Promise<void> {
  if (state.metaEd.namespace == null || state.metaEd.propertyIndex == null) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const enhancer of pluginManifest.metaEdPlugin.enhancer) {
    state.enhancerResults.push(enhancer(state.metaEd));
    await nextMacroTask();
  }
}
