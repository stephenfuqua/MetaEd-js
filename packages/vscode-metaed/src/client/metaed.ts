// eslint-disable-next-line import/no-unresolved
import { commands, workspace, window, ExtensionContext, Terminal } from 'vscode';
import R from 'ramda';
import path from 'path';
import fs from 'fs-extra';
import tmp from 'tmp-promise';
import { MetaEdConfiguration, newMetaEdConfiguration } from 'metaed-core';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';
import { findMetaEdProjectMetadataForClient } from './Projects';
import { AboutPanel } from './AboutPanel';
import { MetaEdProjectMetadata, validProjectMetadata } from '../common/Projects';

let client: LanguageClient;

async function createMetaEdConfiguration(): Promise<MetaEdConfiguration | undefined> {
  const metaEdProjectMetadata: MetaEdProjectMetadata[] = await findMetaEdProjectMetadataForClient();
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
  const serverModule = context.asAbsolutePath(path.join('dist', 'server', 'server.js'));
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    // Register the server for metaed documents
    documentSelector: [{ scheme: 'file', language: 'metaed' }],
    synchronize: {
      // Notify the server about file changes to metaed files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.metaed'),
    },
  };

  // Start the client. This will also launch the server
  client = new LanguageClient('MetaEd', 'MetaEd', serverOptions, clientOptions);
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
