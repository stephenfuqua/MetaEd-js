// @flow
import type { State } from '../State';
import type { Enhancer } from '../enhancer/Enhancer';
import type { PluginManifest } from '../plugin/PluginTypes';

export function execute(pluginManifest: PluginManifest, state: State): void {
  pluginManifest.metaEdPlugin.enhancer.forEach((enhancer: Enhancer) => {
    if (state.metaEd.entity != null && state.metaEd.propertyIndex != null) {
      state.enhancerResults.push(enhancer(state.metaEd));
    }
  });
}
