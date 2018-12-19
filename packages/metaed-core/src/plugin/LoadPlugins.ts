import path from 'path';
import winston from 'winston';
import { scanDirectories, materializePlugin } from './PluginLoader';
import { State } from '../State';
import { PluginManifest } from './PluginManifest';
import { NoMetaEdPlugin } from './MetaEdPlugin';
import { newPluginEnvironment } from './PluginEnvironment';

winston.configure({ transports: [new winston.transports.Console()], format: winston.format.cli() });

const cachedPlugins: Map<string, Array<PluginManifest>> = new Map();

export function scanForPlugins(state: State): Array<PluginManifest> {
  // default to artifact-specific plugin loading from siblings of metaed-core
  const directory: string = state.pluginScanDirectory || path.resolve(__dirname, '../../..');

  const cache = cachedPlugins.get(directory);
  if (cache && cache.length > 0) return cache;

  const pluginManifests: Array<PluginManifest> = scanDirectories(directory);

  const foundPlugins: Array<PluginManifest> = [];
  pluginManifests.forEach((pluginManifest: PluginManifest) => {
    materializePlugin(pluginManifest);
    if (pluginManifest.metaEdPlugin === NoMetaEdPlugin) {
      winston.info(`  Could not load plugin ${pluginManifest.shortName}`);
      return;
    }

    foundPlugins.push(pluginManifest);
  });

  cachedPlugins.set(directory, foundPlugins);
  return foundPlugins;
}

function pluginConfigExists(state: State, pluginManifest: PluginManifest): boolean {
  return (
    state.metaEdConfiguration &&
    state.metaEdConfiguration.pluginTechVersion &&
    !!state.metaEdConfiguration.pluginTechVersion[pluginManifest.shortName]
  );
}

export function loadPlugins(state: State): void {
  state.pluginManifest = scanForPlugins(state);

  state.pluginManifest.forEach((pluginManifest: PluginManifest) => {
    const targetTechnologyVersion = pluginConfigExists(state, pluginManifest)
      ? state.metaEdConfiguration.pluginTechVersion[pluginManifest.shortName].targetTechnologyVersion
      : state.metaEdConfiguration.defaultPluginTechVersion;

    winston.info(
      `  ${pluginManifest.shortName} version ${pluginManifest.version} targeting tech version ${targetTechnologyVersion}`,
    );

    state.metaEd.plugin.set(pluginManifest.shortName, {
      ...newPluginEnvironment(),
      shortName: pluginManifest.shortName,
      targetTechnologyVersion,
    });
  });
}
