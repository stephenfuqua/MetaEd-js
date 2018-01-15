// @flow
import path from 'path';
import winston from 'winston';
import { scanDirectories, materializePlugin } from '../plugin/PluginLoader';
import type { State } from '../State';
import type { PluginManifest } from '../plugin/PluginTypes';
import { NoMetaEdPlugin } from '../plugin/PluginTypes';
import { newPluginEnvironment } from '../plugin/PluginEnvironment';

const cachedPlugins: Map<string, Array<PluginManifest>> = new Map();

export function scanForPlugins(state: State): Array<PluginManifest> {
  // default to artifact-specific plugin loading from siblings of metaed-core
  const directory: string = state.pluginScanDirectory || path.resolve(__dirname, '../../..');
  const cache = cachedPlugins.get(directory);
  if (cache && cache.length > 0) return cache;

  const pluginManifests: Array<PluginManifest> = scanDirectories(directory, { pluginType: 'artifact-specific' });

  // This is a placeholder for artifact-specific configuration - in real implementation,
  // Artifact-specific configuration files would be loaded and the data provided from that
  // configuration, but targeted to specific plugins
  const pluginData = { name: 'xyz', annotation: 'pdq' };

  const foundPlugins: Array<PluginManifest> = [];
  pluginManifests.forEach((pluginManifest: PluginManifest) => {
    materializePlugin(pluginData, pluginManifest, state.metaEdConfiguration.pluginConfig);
    if (pluginManifest.metaEdPlugin === NoMetaEdPlugin) {
      winston.info(`  Could not load plugin ${pluginManifest.shortName}`);
      return;
    }

    winston.info(`  ${pluginManifest.shortName} - v${pluginManifest.version}`);

    if (
      !state.metaEdConfiguration ||
      !state.metaEdConfiguration.pluginConfig ||
      !state.metaEdConfiguration.pluginConfig[pluginManifest.shortName]
    ) {
      winston.info(`  No MetaEd project configuration provided for plugin ${pluginManifest.shortName}.  Will not load.`);
      // TODO: consider impact of skipping a plugin load on probability that dependent plugins will crash
      return;
    }

    state.metaEd.plugin.set(
      pluginManifest.shortName,
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion:
          state.metaEdConfiguration.pluginConfig[pluginManifest.shortName].targetTechnologyVersion || '2.0.0',
      }),
    );

    foundPlugins.push(pluginManifest);
  });

  cachedPlugins.set(directory, foundPlugins);
  return foundPlugins;
}

export function loadPlugins(state: State): void {
  state.pluginManifest = scanForPlugins(state);
}
