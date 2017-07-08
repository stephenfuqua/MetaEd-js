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

  // default to local plugin loading if not specified
  if (!state.pluginScanDirectory) state.pluginScanDirectory = path.resolve(__dirname, '../../plugin');

  const pluginManifests = scanDirectories(state.pluginScanDirectory, { pluginType: 'artifact-specific' });

  const pluginData = { name: 'xyz', annotation: 'pdq' };
  const interfaceToMetaEdCore: any = { exampleIsModelObjectFactory: 'should be an interface with methods to create new model objects' };

  pluginManifests.forEach(pluginManifest => {
    materializePlugin(pluginData, interfaceToMetaEdCore, pluginManifest);
    if (pluginManifest.plugin !== NoMetaEdPlugin) {
      winston.info(`LoadPlugins: Loaded plugin '${pluginManifest.npmName}'`);
    } else {
      winston.info(`LoadPlugins: Could not load plugin '${pluginManifest.npmName}'`);
    }

    cachedPluginManifest.push(pluginManifest);
  });

  state.pluginManifest = cachedPluginManifest;
  return state;
}
