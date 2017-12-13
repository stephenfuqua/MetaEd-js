// @flow
import type { State } from '../State';
import type { Enhancer } from '../enhancer/Enhancer';
import type { PluginManifest } from '../plugin/PluginTypes';
import { nextMacroTask } from './NextMacroTask';

export async function execute(pluginManifest: PluginManifest, state: State): Promise<void> {
  if (state.metaEd.entity == null || state.metaEd.propertyIndex == null) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const enhancer: Enhancer of pluginManifest.metaEdPlugin.enhancer) {
    state.enhancerResults.push(enhancer(state.metaEd));
    await nextMacroTask();
  }
}
