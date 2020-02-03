// eslint-disable-next-line import/no-unresolved
import { commands, workspace, window, ExtensionContext, Terminal } from 'vscode';
import R from 'ramda';
import path from 'path';
import fs from 'fs-extra';
import tmp from 'tmp-promise';
import { MetaEdConfiguration, newMetaEdConfiguration } from 'metaed-core';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';
import { findMetaEdProjectMetadata, MetaEdProjectMetadata } from './Projects';
import { AboutPanel } from './AboutPanel';

let client: LanguageClient;

function validProjectMetadata(metaEdProjectMetadata: MetaEdProjectMetadata[]): boolean {
  let hasInvalidProject = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const pm of metaEdProjectMetadata) {
    if (pm.invalidProject) {
      window.showErrorMessage(`Project file ${pm.invalidProjectReason}.`);
      hasInvalidProject = true;
    }
  }
  if (hasInvalidProject) return false;

  // const hasExtensionProjects: boolean = R.any((pm: MetaEdProjectMetadata) => pm.isExtensionProject, metaEdProjectMetadata);
  // const coreProjectMetadata: MetaEdProjectMetadata[] = metaEdProjectMetadata.filter(
  //   (pm: MetaEdProjectMetadata) => !pm.isExtensionProject,
  // );

  // // if (coreProjectMetadata.length > 1) {
  // //   outputWindow.addMessage('MetaEd does not support multiple core MetaEd projects.');
  // //   return false;
  // // }

  // // Note - we are intentionally not validating that there are multiple extension projects with the same namespace

  // if (coreProjectMetadata.length < 1) {
  //   outputWindow.addMessage('Please set up a core MetaEd directory under MetaEd -> Settings...');
  //   return false;
  // }

  // if (coreProjectMetadata[0].projectVersion !== getTargetDsVersionSemver()) {
  //   outputWindow.addMessage(
  //     'Core MetaEd project version does not match Data Standard version selected under MetaEd -> Settings...',
  //   );
  //   return false;
  // }

  // if (!hasExtensionProjects && !allianceMode()) {
  //   outputWindow.addMessage('No extension project.  Please add an extension project folder.');
  //   return false;
  // }

  // if (semver.satisfies(getTargetOdsApiVersionSemver(), '2.x')) {
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const pm of metaEdProjectMetadata) {
  //     if (pm.isExtensionProject && pm.projectNamespace !== 'Extension') {
  //       outputWindow.addMessage(
  //         `Namespace derived from projectName (first character capitalized, remove special characters) is not "Extension". ODS/API version 2.x only supports the namespace "Extension".`,
  //       );
  //       return false;
  //     }
  //   }
  // }

  return true;
}

async function createMetaEdConfiguration(): Promise<MetaEdConfiguration | undefined> {
  const metaEdProjectMetadata: MetaEdProjectMetadata[] = await findMetaEdProjectMetadata();
  if (!validProjectMetadata(metaEdProjectMetadata)) return undefined;

  const lastProjectPath = workspace.workspaceFolders ? R.last(workspace.workspaceFolders).uri.fsPath : '';

  const metaEdConfiguration: MetaEdConfiguration = {
    ...newMetaEdConfiguration(),
    defaultPluginTechVersion: '3.2.0',
    allianceMode: false,
    artifactDirectory: path.join(lastProjectPath, 'MetaEdOutput'),
  };

  metaEdProjectMetadata.forEach(pm => {
    metaEdConfiguration.projects.push({
      namespaceName: pm.projectNamespace,
      projectName: pm.projectName,
      projectVersion: pm.projectVersion,
      projectExtension: pm.projectExtension,
    });
    metaEdConfiguration.projectPaths.push(pm.projectPath);
  });

  return metaEdConfiguration;
}

export function launchServer(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(path.join('dist', 'server', 'server.js'));
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: 'file', language: 'metaed' }],
    synchronize: {
      // Notify the server about file changes to metaed files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.metaed'),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);

  // Start the client. This will also launch the server
  client.start();
}

export function activate(context: ExtensionContext) {
  // eslint-disable-next-line no-console
  console.log('Congratulations, your extension "vscode-metaed" is now active!');

  let NEXT_TERM_ID = 1;

  const disposable = commands.registerCommand('metaed.build', async () => {
    // The code you place here will be executed every time your command is executed

    window.showInformationMessage('Building MetaEd...');
    const metaEdConsoleDirectory = path.resolve(__dirname, '../../..', 'metaed-console');

    const terminal: Terminal = window.createTerminal(`Ext Terminal #${NEXT_TERM_ID}`, 'C:\\Windows\\System32\\cmd.exe');
    NEXT_TERM_ID += 1;

    terminal.show(true);

    tmp.setGracefulCleanup();
    const tempConfigurationPath = await tmp.tmpName({ prefix: 'MetaEdConfig-VsCode-', postfix: '.json' });
    const metaEdConfiguration = await createMetaEdConfiguration();
    await fs.outputJson(tempConfigurationPath, { metaEdConfiguration }, { spaces: 2 });

    terminal.sendText(`node ${metaEdConsoleDirectory} --config ${tempConfigurationPath}`, true);

    // TODO: remove tempfile after awaiting for build to finish
  });

  context.subscriptions.push(disposable);

  // About Panel
  context.subscriptions.push(
    commands.registerCommand('metaed.about', () => {
      AboutPanel.createOrShow(context.extensionPath);
    }),
  );

  launchServer(context);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
