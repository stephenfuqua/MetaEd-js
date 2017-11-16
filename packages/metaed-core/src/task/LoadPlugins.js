// @flow
/* hardcode unified and xsd
import type { State } from '../State';
import type { PluginManifest } from '../plugin/PluginTypes';

import { initialize as initializeUnified } from '../../../metaed-plugin-edfi-unified/src/edfiUnified';
import { initialize as initializeXsd } from '../../../metaed-plugin-edfi-xsd/src/edfiXsd';

// hardcode unified and xsd - this is a reversed dependency that may cause strange ES module circular dependency issues
export function loadPlugins(state: State): State {
  const unifiedManifest: PluginManifest = {
    npmName: 'metaed-plugin-edfi-unified',
    version: 'N/A',
    mainModule: 'N/A',
    displayName: 'N/A',
    author: 'N/A',
    metaEdVersionRange: 'N/A',
    dependencies: [],
    dataReference: 'N/A',
    enabled: true,
    metaEdPlugin: initializeUnified(),
  };

  const xsdManifest: PluginManifest = {
    npmName: 'metaed-plugin-edfi-xsd',
    version: 'N/A',
    mainModule: 'N/A',
    displayName: 'N/A',
    author: 'N/A',
    metaEdVersionRange: 'N/A',
    dependencies: [],
    dataReference: 'N/A',
    enabled: true,
    metaEdPlugin: initializeXsd(),
  };
  state.pluginManifest.push(unifiedManifest, xsdManifest);

  return state;
}
*/

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

  // This is a placeholder implementation - in real implementation,
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
