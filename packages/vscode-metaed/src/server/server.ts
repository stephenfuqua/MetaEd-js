// eslint-disable-next-line import/no-unresolved
import { URI } from 'vscode-uri';
import {
  createConnection,
  TextDocument,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
} from 'vscode-languageserver';
import { State, MetaEdConfiguration, executePipeline, newState, newMetaEdConfiguration } from 'metaed-core';
import { MetaEdProjectMetadata, validProjectMetadata, findMetaEdProjectMetadata } from '../common/Projects';

export async function findMetaEdProjectMetadataForServer(workspaceFolders: string[]): Promise<MetaEdProjectMetadata[]> {
  return findMetaEdProjectMetadata(workspaceFolders.map(folderUri => URI.parse(folderUri).fsPath));
}

const connection = createConnection(ProposedFeatures.all);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

const documents: TextDocuments = new TextDocuments();

const workspaceFolders: Set<string> = new Set();
let currentFilesWithFailures: Set<string> = new Set();

connection.onInitialize((params: InitializeParams) => {
  const { capabilities } = params;

  // Does the client support the `workspace/configuration` request?
  // If not, we will fall back using global settings
  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
  hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);

  return {
    capabilities: {
      completionProvider: {
        resolveProvider: true,
      },
      workspaceFolders: {
        supported: true,
        changeNotifications: true,
      },
    },
  };
});

connection.onInitialized(async () => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders(event => {
      connection.console.log('Workspace folder change event received.');
      event.removed.forEach(workspaceFolder => {
        workspaceFolders.delete(workspaceFolder.uri);
      });
      event.added.forEach(workspaceFolder => {
        workspaceFolders.add(workspaceFolder.uri);
      });
    });
    const currentWorkspaceFolders = await connection.workspace.getWorkspaceFolders();
    if (currentWorkspaceFolders != null) {
      currentWorkspaceFolders.forEach(workspaceFolder => {
        workspaceFolders.add(workspaceFolder.uri);
      });
    }
  }
});

async function createMetaEdConfiguration(
  metaEdProjectMetadata: MetaEdProjectMetadata[],
): Promise<MetaEdConfiguration | undefined> {
  if (!validProjectMetadata(metaEdProjectMetadata)) return undefined;

  const metaEdConfiguration: MetaEdConfiguration = {
    ...newMetaEdConfiguration(),
    defaultPluginTechVersion: '3.2.0',
    allianceMode: false,
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

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  // TODO: don't ignore the changed document - need to add the in buffer files

  const diagnostics: Diagnostic[] = [];
  const metaEdProjectMetadata: MetaEdProjectMetadata[] = await findMetaEdProjectMetadataForServer(
    Array.from(workspaceFolders),
  );
  const metaEdConfiguration: MetaEdConfiguration | undefined = await createMetaEdConfiguration(metaEdProjectMetadata);
  if (metaEdConfiguration == null) return;

  const state: State = {
    ...newState(),
    pipelineOptions: {
      runValidators: true,
      runEnhancers: true,
      runGenerators: false,
      stopOnValidationFailure: false,
    },
    metaEdConfiguration,
  };

  const { validationFailure } = (await executePipeline(state)).state;

  const filesWithFailure: Set<string> = new Set();
  // TODO: this will only give 1 validation failure per file, need to gather all of them
  validationFailure.forEach(failure => {
    if (failure.fileMap != null) {
      filesWithFailure.add(failure.fileMap.fullPath);

      const tokenLength: number = failure.sourceMap && failure.sourceMap.tokenText ? failure.sourceMap.tokenText.length : 0;
      const adjustedLine: number = !failure.fileMap || failure.fileMap.lineNumber === 0 ? 0 : failure.fileMap.lineNumber - 1;
      const characterPosition: number = failure.sourceMap ? failure.sourceMap.column : 0;

      const diagnostic: Diagnostic = {
        severity: DiagnosticSeverity.Error, // TODO: actual severity
        range: {
          start: { line: adjustedLine, character: characterPosition },
          end: { line: adjustedLine, character: characterPosition + tokenLength },
        },
        message: failure.message,
        source: 'MetaEd',
      };

      diagnostics.push(diagnostic);
      // Send the computed diagnostics to VSCode.
      connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
    }
  });

  const resolvedFailures = [...filesWithFailure].filter(file => currentFilesWithFailures.has(file));
  resolvedFailures.forEach(resolved => {
    connection.sendDiagnostics({ uri: resolved, diagnostics: [] });
  });
  currentFilesWithFailures = filesWithFailure;
}

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
  validateTextDocument(change.document);
});

connection.onDidChangeWatchedFiles(_change => {
  // Monitored files have change in VSCode
  connection.console.log('We received an file change event');
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
