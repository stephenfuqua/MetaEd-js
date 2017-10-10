// @flow
import type { State } from '../State';
import type { PluginManifest } from '../plugin/PluginTypes';

import initializeUnified from '../../../metaed-plugin-edfi-unified/src/unified';
import initializeXsd from '../../../metaed-plugin-edfi-xsd/src/edfiXsd';

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


/* Original directory scanner:


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
*/
