/** @babel */
// @flow

// Get regeneratorRuntime async/await polyfill
import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import { v4 as newUuid } from 'uuid';
import { install as packageDepsInstall } from 'atom-package-deps';
import { executePipeline, newState, newMetaEdConfiguration } from 'metaed-core';

import type { State, MetaEdConfiguration, ValidationFailure } from 'metaed-core';

// eslint-disable-next-line
import { CompositeDisposable } from 'atom';
import { $ } from 'atom-space-pen-views';
import Hider from './context-menu-hider';
import reportException from './ExceptionReporter';
import MetaEdLog from './MetaEdLog';
import MetaEdConfig from './MetaEdConfig';
import { MetaEdAboutModel, metaEdAboutView } from './MetaEdAbout';
import {
  updateEditorIfCore,
  addCopyBackToCore,
  createFromTemplate,
  createNewExtensionProject,
  isCoreMetaEdFile,
} from './CoreMetaEd';
import MetaEdConsole from './MetaEdConsole';
import { build } from './MetaEdConsoleJs';
import {
  associationTemplate,
  choiceTemplate,
  commonTemplate,
  descriptorTemplate,
  domainEntityTemplate,
  domainTemplate,
  enumerationTemplate,
  interchangeTemplate,
  sharedDecimalTemplate,
  sharedIntegerTemplate,
  sharedStringTemplate,
} from './templates/TemplateEngine';
import {
  getCoreMetaEdSourceDirectory,
  setCoreMetaEdSourceDirectory,
  getMetaEdConsoleSourceDirectory,
  setMetaEdConsoleSourceDirectory,
  getMetaEdJsConsoleSourceDirectory,
  setMetaEdJsConsoleSourceDirectory,
  validateOnTheFly,
  useTechPreview,
  allianceMode,
} from './Settings';
import { loadFromModifiedEditors } from './BufferFileLoader';

let metaEdLog: ?MetaEdLog;
let metaEdConfig: ?MetaEdConfig;
let metaEdConsole: ?MetaEdConsole;
let subscriptions: ?CompositeDisposable;
let contextMenuHider: Hider;
let mostRecentState: State = newState();

const dataStandard2Config: MetaEdConfiguration = {
  ...newMetaEdConfiguration(),
  pluginConfig: {
    edfiUnified: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiOds: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiOdsApi: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiXsd: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiHandbook: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiInterchangeBrief: {
      targetTechnologyVersion: '2.0.0',
    },
    edfiXmlDictionary: {
      targetTechnologyVersion: '2.0.0',
    },
  },
};

const dataStandard3Config: MetaEdConfiguration = {
  ...newMetaEdConfiguration(),
  pluginConfig: {
    edfiUnified: {
      targetTechnologyVersion: '3.0.0',
    },
    edfiOds: {
      targetTechnologyVersion: '3.0.0',
    },
    edfiOdsApi: {
      targetTechnologyVersion: '3.0.0',
    },
    edfiXsd: {
      targetTechnologyVersion: '3.0.0',
    },
    edfiHandbook: {
      targetTechnologyVersion: '3.0.0',
    },
    edfiInterchangeBrief: {
      targetTechnologyVersion: '3.0.0',
    },
    edfiXmlDictionary: {
      targetTechnologyVersion: '3.0.0',
    },
  },
};

// This is temporary until full multi-project support
function metaEdConfigurationFromTechPreviewFlag(): MetaEdConfiguration {
  const baseConfiguration: MetaEdConfiguration = useTechPreview() ? dataStandard3Config : dataStandard2Config;
  return {
    ...baseConfiguration,
    projects: [
      {
        namespace: 'edfi',
        projectName: 'Ed-Fi',
        projectVersion: useTechPreview() ? '3.0.0' : '2.0.0',
        projectExtension: '',
      },
    ],
    projectPaths: [getCoreMetaEdSourceDirectory()],
  };
}

function reportError(error) {
  try {
    console.log('Reporting exception', error);
    reportException(error);
  } catch (secondaryException) {
    try {
      console.log('Reporting secondary exception', secondaryException);
      reportException(secondaryException);
    } catch (unreportedError) {
      console.log('Unable to report exception', unreportedError);
    }
  }
}

function getContextPaths(commandTarget: any) {
  console.log(commandTarget.classList);
  const cssSelector = '.icon-file-directory';
  // Check current dom node to see if its a directory
  let selectedDirectory = commandTarget.classList.contains(cssSelector);
  if (!selectedDirectory) {
    // If not found, check the descendants
    selectedDirectory = commandTarget.querySelector(cssSelector);
    if (!selectedDirectory) {
      // As a last resort, check for ancestors
      selectedDirectory = commandTarget.closest(cssSelector);
    }
  }

  let targetFolder: string = '';
  if (selectedDirectory) {
    targetFolder = selectedDirectory.dataset.path;
  }
  return targetFolder;
}

function hideTreeViewContextMenuOperationsWhenCore() {
  if (!atom.packages.isPackageLoaded('tree-view')) return;
  atom.packages.activatePackage('tree-view').then(pkg => {
    const contextMenuCommandsToHide = [
      'tree-view:move',
      'tree-view:duplicate',
      'tree-view:remove',
      // copy remains
      'tree-view:cut',
      'tree-view:paste',
      'atom-metaed:createNewExtensionProject',
      'tree-view:add-file',
      'tree-view:add-folder',
    ];
    contextMenuHider = new Hider('Things', contextMenuCommandsToHide);

    const treeView = pkg.mainModule.getTreeViewInstance();
    const treeViewEl = atom.views.getView(treeView);

    // TODO: how to dispose/make disposable?
    $(treeViewEl).on('mousedown', event => {
      if (event.which !== 3) return;
      if (isCoreMetaEdFile(treeView.selectedPath)) {
        contextMenuHider.hide();
      } else {
        contextMenuHider.show();
      }
    });
  });
}

// setup directories on first run, or if invalid
function initializeConfigSettings() {
  if (!getCoreMetaEdSourceDirectory() || !fs.existsSync(path.resolve(getCoreMetaEdSourceDirectory()))) {
    setCoreMetaEdSourceDirectory(path.resolve(__dirname, '../../ed-fi-model-2.0'));
  }
  if (!getMetaEdConsoleSourceDirectory() || !fs.existsSync(path.resolve(getMetaEdConsoleSourceDirectory()))) {
    setMetaEdConsoleSourceDirectory(path.resolve(__dirname, '../../metaed-csharp'));
  }
  if (!getMetaEdJsConsoleSourceDirectory() || !fs.existsSync(path.resolve(getMetaEdJsConsoleSourceDirectory()))) {
    setMetaEdJsConsoleSourceDirectory(path.resolve(__dirname, '../../metaed-console'));
  }
}

// eslint-disable-next-line no-unused-vars
export function activate(state: any) {
  initializeConfigSettings();
  packageDepsInstall('atom-metaed', true).then(() => console.log('All dependencies installed'));
  if (!allianceMode()) hideTreeViewContextMenuOperationsWhenCore();

  metaEdLog = new MetaEdLog();
  metaEdConfig = new MetaEdConfig();
  metaEdConsole = new MetaEdConsole(metaEdLog);
  const fileFromTemplate = (commandEvent: any, filename: string, template: () => string) => {
    const targetPath = getContextPaths(commandEvent.target);
    if (!targetPath) {
      atom.confirm({ message: 'Select a directory.' });
      return;
    }
    if (isCoreMetaEdFile(targetPath) && !allianceMode()) {
      atom.confirm({ message: 'New files cannot be created in a Core MetaEd directory.' });
      return;
    }
    createFromTemplate(targetPath, filename, template);
  };

  subscriptions = new CompositeDisposable();

  if (!atom.config.get('metaed-exception-report.user')) {
    atom.config.set('metaed-exception-report.user', newUuid());
  }

  // eslint-disable-next-line no-unused-vars
  subscriptions.add(
    atom.onWillThrowError(({ originalError, preventDefault }) => {
      reportError(originalError);
      preventDefault();
    }),
  );

  if (atom.onDidFailAssertion != null) {
    subscriptions.add(atom.onDidFailAssertion(error => reportError(error)));
  }

  subscriptions.add(
    // eslint-disable-next-line no-unused-vars
    atom.config.observe('atom-metaed.coreMetaEdSourceDirectory', value => {
      if (metaEdConfig != null) {
        metaEdConfig.updateCoreMetaEdSourceDirectory();
      }
    }),
  );

  if (!allianceMode()) {
    subscriptions.add(
      atom.workspace.observeTextEditors((editor: AtomTextEditor) => {
        updateEditorIfCore(editor);
      }),
    );
    subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'core:copy': commandEvent => addCopyBackToCore(commandEvent),
      }),
    );
  }

  subscriptions.add(atom.views.addViewProvider(MetaEdAboutModel, metaEdAboutView()));
  subscriptions.add(
    atom.workspace.addOpener(uri => {
      if (uri !== 'atom-metaed://about') return null;
      return new MetaEdAboutModel();
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:about': () => {
        atom.workspace.open('atom-metaed://about');
      },
    }),
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:settings': () => {
        atom.workspace.open('atom://config/packages/atom-metaed');
      },
    }),
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:build': async () => {
        if (metaEdConsole != null)
          if (metaEdLog != null) {
            const success: boolean = await build(metaEdConfigurationFromTechPreviewFlag(), metaEdLog); // MetaEdJsConsole
            if (success) await metaEdConsole.build(!allianceMode());
          }
      },
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:deploy': () => {
        if (metaEdConsole != null) metaEdConsole.deploy(!allianceMode());
      },
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:build-js': async () => {
        if (metaEdLog != null) {
          await build(metaEdConfigurationFromTechPreviewFlag(), metaEdLog); // MetaEdJsConsole
        }
      },
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:crash': () => {
        this.subscriptions.add(null); // force a crash -- this.subscriptions is undefined
      },
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:createNewExtensionProject': () => {
        if (metaEdLog != null && metaEdConfig != null) {
          createNewExtensionProject(metaEdLog, metaEdConfig);
        }
      },
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addAssociationTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'Association.metaed', associationTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addChoiceTemplate': commandEvent => fileFromTemplate(commandEvent, 'Choice.metaed', choiceTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addSharedDecimalTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'SharedDecimal.metaed', sharedDecimalTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addSharedIntegerTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'SharedInteger.metaed', sharedIntegerTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addSharedStringTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'SharedString.metaed', sharedStringTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addCommonTemplate': commandEvent => fileFromTemplate(commandEvent, 'Common.metaed', commonTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addDescriptorTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'Descriptor.metaed', descriptorTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addDomainEntityTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'DomainEntity.metaed', domainEntityTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addDomainTemplate': commandEvent => fileFromTemplate(commandEvent, 'Domain.metaed', domainTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addEnumerationTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'Enumeration.metaed', enumerationTemplate),
    }),
  );
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-metaed:addInterchangeTemplate': commandEvent =>
        fileFromTemplate(commandEvent, 'Interchange.metaed', interchangeTemplate),
    }),
  );

  atom.notifications.addInfo(
    'MetaEd is ©2018 Ed-Fi Alliance, LLC.<br />Click <a href="https://techdocs.ed-fi.org/display/METAED/Getting+Started+-+Licensing">here</a> for license information.',
    { dismissable: true },
  );
  if (allianceMode()) {
    atom.notifications.addWarning(
      'This is an Ed-Fi Alliance only beta version of MetaEd and is not suitable for extension authoring.',
      { dismissable: true },
    );
  }
}

export function deactivate() {
  if (metaEdLog) {
    metaEdLog.dispose();
  }
  metaEdLog = null;
  metaEdConsole = null;
  if (subscriptions) {
    subscriptions.dispose();
  }
  subscriptions = null;
}

export function serialize() {}

// eslint-disable-next-line no-unused-vars
function lint(textEditor: AtomTextEditor): ?Promise<?(any[])> {
  if (!fs.existsSync(path.resolve(getCoreMetaEdSourceDirectory()))) {
    atom.notifications.addWarning(
      'The "Ed-Fi Data Standard core .metaed directory" in your Atom-MetaEd settings is not valid.',
    );
    return null;
  }

  const inputDirectories = [
    {
      path: getCoreMetaEdSourceDirectory(),
      namespace: 'edfi',
      projectExtension: '',
      projectName: 'Ed-Fi',
      isExtension: false,
    },
  ];

  // TODO: support multiple extension projects
  if (atom.project.getPaths().length > 1) {
    inputDirectories.push({
      path: atom.project.getPaths()[1],
      namespace: 'extension',
      projectExtension: 'EXTENSION',
      projectName: 'Extension',
      isExtension: true,
    });
  }

  mostRecentState = Object.assign(newState(), {
    inputDirectories,
    pipelineOptions: {
      runValidators: true,
      runEnhancers: true,
      runGenerators: false,
    },
    metaEdConfiguration: useTechPreview() ? { ...dataStandard3Config } : { ...dataStandard2Config },
  });

  // temporary set of data standard version until lookup from project package.json is ready
  mostRecentState.metaEd.dataStandardVersion = useTechPreview() ? '3.0.0' : '2.0.0';
  if (validateOnTheFly()) mostRecentState = loadFromModifiedEditors(mostRecentState);

  const linterMessagesP: Promise<?(any[])> = executePipeline(mostRecentState)
    .then((endState: State) => {
      mostRecentState = endState;
      return mostRecentState.validationFailure.map((errorMessage: ValidationFailure) => {
        const tokenLength: number =
          errorMessage.sourceMap && errorMessage.sourceMap.tokenText ? errorMessage.sourceMap.tokenText.length : 0;
        const adjustedLine: number =
          !errorMessage.fileMap || errorMessage.fileMap.lineNumber === 0 ? 0 : errorMessage.fileMap.lineNumber - 1;
        const characterPosition: number = errorMessage.sourceMap ? errorMessage.sourceMap.column : 0;

        return {
          severity: errorMessage.category,
          excerpt: errorMessage.message,
          location: {
            file: errorMessage.fileMap ? errorMessage.fileMap.fullPath : '',
            position: [[adjustedLine, characterPosition], [adjustedLine, characterPosition + tokenLength]],
          },
        };
      });
    })
    .catch(exception => {
      reportException(exception);
      console.error(exception);
      if (atom.inDevMode()) throw exception;
      return null; // null means no changes to linter messages
    });

  return linterMessagesP;
}

export function provideLinter() {
  return {
    name: 'MetaEd',
    grammarScopes: ['source.metaed'],
    scope: 'project',
    lintsOnChange: validateOnTheFly(),
    lintOnChangeInterval: 500,
    lint,
  };
}
