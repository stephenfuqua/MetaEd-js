// @flow
import type { MetaEdEnvironment, PluginEnvironment } from '../../../../packages/metaed-core/index';

export function pluginEnvironment(metaEd: MetaEdEnvironment): PluginEnvironment {
  return ((metaEd.plugin.get('edfiXsd'): any): PluginEnvironment);
}
