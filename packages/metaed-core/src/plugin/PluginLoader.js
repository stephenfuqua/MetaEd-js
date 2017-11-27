// @flow
import fs from 'final-fs';
import path from 'path';
import winston from 'winston';
import type { PluginManifest, MetaEdPlugin } from './PluginTypes';
import { NoMetaEdPlugin } from './PluginTypes';

export type PluginOptions = {
  pluginType: string,
}

// Resolve roughly like require.resolve() does (https://nodejs.org/api/modules.html#modules_all_together)
function mainModuleResolver(directory: string, packageJson: any): string {
  const pathFromMain = path.resolve(directory, packageJson.main);
  if (fs.existsSync(pathFromMain)) return pathFromMain;
  const pathForIndexJs = path.join(directory, 'index.js');
  if (fs.existsSync(pathForIndexJs)) return pathForIndexJs;
  const pathForIndexJson = path.join(directory, 'index.json');
  if (fs.existsSync(pathForIndexJson)) return pathForIndexJs;
  const pathForIndexNode = path.join(directory, 'index.node');
  if (fs.existsSync(pathForIndexNode)) return pathForIndexNode;
  return '';
}

function loadPluginManifest(directory: string, options: PluginOptions): ?PluginManifest {
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(path.join(directory, 'package.json')));
  } catch (err) {
    return null;
  }

  if (!packageJson['metaed-plugin'] || !packageJson['metaed-plugin'][options.pluginType]) return null;

  const packageMetadata = packageJson['metaed-plugin'][options.pluginType];

  return {
    npmName: packageJson.name,
    description: packageJson.description,
    version: packageJson.version,
    mainModule: mainModuleResolver(directory, packageJson),
    shortName: packageMetadata.shortName || 'none',
    authorName: packageMetadata.authorName || 'none',
    metaEdVersion: packageMetadata.metaEdVersion || 'none',
    technologyVersion: packageMetadata.technologyVersion || 'none',
    dependencies: packageMetadata.dependencies || [],
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
        if (!subdirectory.startsWith('metaed-plugin-')) return;
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

export function materializePlugin(pluginData: any, pluginManifest: PluginManifest) {
  try {
    if (!pluginManifest.mainModule) {
      winston.error(`PluginLoader: Attempted load of npm package ${pluginManifest.npmName} plugin '${pluginManifest.description}' at '${pluginManifest.mainModule}' failed.  Module entry point not found.`);
      return;
    }

    /* eslint-disable */
    // $FlowIgnore - No one likes a dynamic require
    const pluginFactoryCandidate = require(pluginManifest.mainModule);
    /* eslint-enable */

    // Plugins must have an "initialize" method?
    const pluginFactory: (any) => MetaEdPlugin = pluginFactoryCandidate.initialize;
    if (pluginFactory) {
      pluginManifest.metaEdPlugin = pluginFactory(pluginData);
    } else {
      winston.error(`PluginLoader: Attempted load of npm package ${pluginManifest.npmName} plugin '${pluginManifest.description}' at '${pluginManifest.mainModule}' failed.  initialize() not found.`);
    }
  } catch (err) {
    winston.error(`PluginLoader: Attempted load of npm package ${pluginManifest.npmName} plugin '${pluginManifest.description}' at '${pluginManifest.mainModule}' failed.`);
    winston.error(`PluginLoader: Error Message: ${err.message}`);
  }
}
