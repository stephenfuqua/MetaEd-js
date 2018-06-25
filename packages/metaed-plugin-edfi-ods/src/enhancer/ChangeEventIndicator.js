// @flow
import type { MetaEdEnvironment, Namespace, PluginEnvironment } from 'metaed-core';
import { versionSatisfies } from 'metaed-core';

export function changeEventIndicated(metaEd: MetaEdEnvironment, currentNamespace: Namespace): boolean {
  const edfiOdsPlugin: ?PluginEnvironment = metaEd.plugin.get('edfiOds');
  if (edfiOdsPlugin == null) return false;

  if (versionSatisfies(edfiOdsPlugin.targetTechnologyVersion, '>=2.4.0 <3.0.0')) return !currentNamespace.isExtension;
  return versionSatisfies(edfiOdsPlugin.targetTechnologyVersion, '>=3.1.0');
}
