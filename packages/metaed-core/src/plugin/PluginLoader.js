// @flow
import fs from 'final-fs';
import path from 'path';
import winston from 'winston';
import type { PluginManifest, MetaEdPlugin } from './PluginTypes';
import { NoMetaEdPlugin } from './PluginTypes';

export type PluginOptions = {
  pluginType: string,
}

function loadPluginManifest(directory: string, options: PluginOptions): ?PluginManifest {
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(path.join(directory, 'package.json.for.plugin')));
  } catch (err) {
    return null;
  }
  if (!packageJson['metaed-plugin'] || !packageJson['metaed-plugin'][options.pluginType]) return null;

  const packageMetadata = packageJson['metaed-plugin'][options.pluginType];

  return {
    npmName: packageJson.name,
    version: packageJson.version,
    mainModule: path.resolve(directory, packageMetadata.mainModule) || 'none',
    pluginName: packageMetadata.pluginName || 'none',
    displayName: packageMetadata.displayName || 'none',
    author: packageMetadata.author || 'none',
    metaEdVersionRange: packageMetadata.metaEdVersionRange || 'none',
    dependencies: packageMetadata.dependencies || [],
    dataReference: packageMetadata.dataReference || '',
    metaEdPlugin: NoMetaEdPlugin,
    enabled: true,
  };
}

// Scans the immediate subdirectories for plugins. Requires absolute path.
export function scanDirectories(directories: string | Array<string>, options: PluginOptions): Array<PluginManifest> {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(directories)) directories = [directories];

  const result = [];
  directories.forEach(directory => {
    try {
      const subdirectories = fs.readdirSync(directory).filter(file => fs.statSync(path.join(directory, file)).isDirectory());
      subdirectories.forEach(subdirectory => {
        const directoryToTry = path.join(directory, subdirectory);
        const manifest = loadPluginManifest(directoryToTry, options);
        if (manifest) result.push(manifest);
      });
    } catch (err) {
      // ignore invalid directories
    }
  });
  return result;
}

export function materializePlugin(pluginData: any, metaEdCore: any, plugManifest: PluginManifest) {
  try {
    /* eslint-disable */
    // $FlowIgnore - No one likes a dynamic require
    const pluginFactoryCandidate = require(plugManifest.mainModule);
    /* eslint-enable */

    // handle either ES or CommonJS modules
    const pluginFactory: (any, any) => MetaEdPlugin = pluginFactoryCandidate.default ? pluginFactoryCandidate.default : pluginFactoryCandidate;
    plugManifest.metaEdPlugin = pluginFactory(pluginData, metaEdCore);
  } catch (err) {
    winston.error(`PluginLoader: Attempted load of npm package ${plugManifest.npmName} plugin '${plugManifest.displayName}' at '${plugManifest.mainModule}' failed.`);
    winston.error(`PluginLoader: Error Message: ${err.message}`);
    plugManifest.metaEdPlugin = NoMetaEdPlugin;
  }
}
