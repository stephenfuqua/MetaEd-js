// @flow
import path from 'path';
import winston from 'winston';
import { scanDirectories, materializePlugin } from '../plugin/PluginLoader';
import type { State } from '../State';
import type { PluginManifest } from '../plugin/PluginTypes';
import { NoMetaEdPlugin } from '../plugin/PluginTypes';

const cachedPlugins: Map<string, Array<PluginManifest>> = new Map();

export function scanForPlugins(pluginScanDirectory: ?string): Array<PluginManifest> {
  // default to artifact-specific plugin loading from siblings of metaed-core
  const directory: string = pluginScanDirectory || path.resolve(__dirname, '../../..');
  const cache = cachedPlugins.get(directory);
  if (cache && cache.length > 0) return cache;

  const pluginManifests: Array<PluginManifest> = scanDirectories(directory, { pluginType: 'artifact-specific' });

  // This is a placeholder for artifact-specific configuration - in real implementation,
  // Artifact-specific configuration files would be loaded and the data provided from that
  // configuration, but targeted to specific plugins
  const pluginData = { name: 'xyz', annotation: 'pdq' };

  const foundPlugins: Array<PluginManifest> = [];
  pluginManifests.forEach((pluginManifest: PluginManifest) => {
    materializePlugin(pluginData, pluginManifest);
    if (pluginManifest.metaEdPlugin !== NoMetaEdPlugin) {
      winston.info(`LoadPlugins: Loaded plugin '${pluginManifest.npmName}'`);
    } else {
      winston.info(`LoadPlugins: Could not load plugin '${pluginManifest.npmName}'`);
    }

    foundPlugins.push(pluginManifest);
  });

  cachedPlugins.set(directory, foundPlugins);
  return foundPlugins;
}

export function loadPlugins(state: State): void {
  state.pluginManifest = scanForPlugins(state.pluginScanDirectory);
}
