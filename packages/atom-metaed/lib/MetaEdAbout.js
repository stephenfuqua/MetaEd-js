/** @babel */
// @flow

/* eslint-disable import/no-dynamic-require */
import path from 'path';
import { scanForPlugins, newState } from 'metaed-core';

// $FlowIgnore
const atomMetaEdPackageJson = require(path.resolve(__dirname, '../package.json'));
const metaedAboutBackground = path.resolve(__dirname, '../static/MetaEd-About-Background.png');

export function MetaEdAboutModel(): void {
  this.getTitle = (): string => 'About';
  this.getIconName = (): string => 'info';
}

export function metaEdAboutView(): () => HTMLElement {
  return () => {
    const pluginList: Array<string> = scanForPlugins(newState()).map(pm => `${pm.npmName} ${pm.version}`);

    const template = `
      <div class='metaed-container' style='display: flex; flex-flow: column wrap; justify-content: center; align-items: center; height: 100%; width: 100%;'>
        <div class='metaed-image' style='position: relative;'>
          <img src='${metaedAboutBackground}' alt=''/>

          <p class='metaed-info' style='position:absolute; bottom:0; font-size:11px; font-family:"Arial"; padding:0px 37px; width:100%; height:185px; text-align:left;'>
            MetaEd is ©2017 Ed-Fi Alliance, LLC. Click <a href="https://techdocs.ed-fi.org/display/METAED/Getting+Started+-+Licensing">here</a> for license information.
            <br/>
            atom-metaed v${atomMetaEdPackageJson.version}
            <br/>
            <br/>
            ${pluginList.length > 0 ? 'Installed Plugins: <br/>' : ''}
            ${pluginList.join('<br/>')}
          </p>
        </div>
      </div>
    `;

    // eslint-disable-next-line no-undef, document
    const element = document.createElement('div');
    element.innerHTML = template;
    return element;
  };
}
