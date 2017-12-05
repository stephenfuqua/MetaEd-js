// @flow
import path from 'path';
import winston from 'winston';
import { scanDirectories, materializePlugin } from '../plugin/PluginLoader';
import type { State } from '../State';
import type { PluginManifest } from '../plugin/PluginTypes';
import { NoMetaEdPlugin } from '../plugin/PluginTypes';

const cachedPluginManifest: Array<PluginManifest> = [];

export function loadPlugins(state: State): State {
  if (cachedPluginManifest.length > 0) {
    state.pluginManifest = cachedPluginManifest;
    return state;
  }

  // default to artifact-specific plugin loading from siblings of metaed-core
  if (!state.pluginScanDirectory) state.pluginScanDirectory = path.resolve(__dirname, '../../..');

  const pluginManifests: Array<PluginManifest> = scanDirectories(state.pluginScanDirectory, { pluginType: 'artifact-specific' });

  // This is a placeholder for artifact-specific configuration - in real implementation,
  // Artifact-specific configuration files would be loaded and the data provided from that
  // configuration, but targeted to specific plugins
  const pluginData = { name: 'xyz', annotation: 'pdq' };

  pluginManifests.forEach((pluginManifest: PluginManifest) => {
    materializePlugin(pluginData, pluginManifest);
    if (pluginManifest.metaEdPlugin !== NoMetaEdPlugin) {
      winston.info(`LoadPlugins: Loaded plugin '${pluginManifest.npmName}'`);
    } else {
      winston.info(`LoadPlugins: Could not load plugin '${pluginManifest.npmName}'`);
    }

    cachedPluginManifest.push(pluginManifest);
  });

  state.pluginManifest = cachedPluginManifest;
  return state;
}
