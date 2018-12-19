import { MetaEdEnvironment, PluginEnvironment } from 'metaed-core';
import { versionSatisfies } from 'metaed-core';

export function changeQueryIndicated(metaEd: MetaEdEnvironment): boolean {
  const edfiOdsPlugin: PluginEnvironment | undefined = metaEd.plugin.get('edfiOds');
  if (edfiOdsPlugin == null) return false;

  return versionSatisfies(edfiOdsPlugin.targetTechnologyVersion, '>=3.1.0');
}
