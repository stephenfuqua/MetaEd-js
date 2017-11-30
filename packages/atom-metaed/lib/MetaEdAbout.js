/** @babel */
// @flow

/* eslint-disable import/no-dynamic-require */
import path from 'path';

// $FlowIgnore
const atomMetaEdPackageJson = require(path.resolve(__dirname, '../package.json'));
const metaedAboutBackground = path.resolve(__dirname, '../static/MetaEd-About-Background.png');

export function MetaEdAboutModel(): void {
  this.getTitle = (): string => 'About';
  this.getIconName = (): string => 'info';
}

export function MetaEdAboutView(): HTMLElement {
  const template = `
    <div class='metaed-container' style='display: flex; flex-flow: column wrap; justify-content: center; align-items: center; height: 100%; width: 100%;'>
      <div class='metaed-image' style='position: relative;'>
        <img src='${metaedAboutBackground}' alt=''/>
        
        <p class='metaed-info' style='position:absolute; bottom:0; font-size:11px; font-family:"Arial"; padding:35px 37px; width:100%; text-align:left;'>
          MetaEd is ©2017 Ed-Fi Alliance, LLC. Click <a href="https://techdocs.ed-fi.org/display/METAED/Getting+Started+-+Licensing">here</a> for license information.
          <br/>
          atom-metaed v${atomMetaEdPackageJson.version}
        </p>
      </div>
    </div>
  `;

  // eslint-disable-next-line no-undef, document
  const element = document.createElement('div');
  element.innerHTML = template;
  return element;
}
