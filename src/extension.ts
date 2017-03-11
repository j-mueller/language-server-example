/* --------------------------------------------------------------------------------------------
 * Copyright (c) Jann Mueller. All rights reserved.
 * Licensed under BSD-3. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
"use strict";

import * as path from "path";

import { workspace, Disposable, ExtensionContext } from "vscode";
import { LanguageClient, LanguageClientOptions, SettingMonitor, ServerOptions, TransportKind } from "vscode-languageclient";

export function activate(context: ExtensionContext) {

  // Compiled exectubale, assumed to be on path. 
  // Interaction with the server is via std in/out
  let serverModule = "language-server-example.exe";

  let serverOptions: ServerOptions = {
    run: { command: serverModule, transport: TransportKind.stdio },
    debug: { command: serverModule, transport: TransportKind.stdio }
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: ["plaintext"],
    synchronize: {
      // Synchronize the setting section "languageServerExample" to the server
      configurationSection: "languageServerExample",
      // Notify the server about file changes to ".clientrc files contain in the workspace
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
    }
  }

  // Create the language client and start the client.
  let disposable = new LanguageClient("languageServerExample", "Language Server Example", serverOptions, clientOptions).start();

  // Push the disposable to the context"s subscriptions so that the 
  // client can be deactivated on extension deactivation
  context.subscriptions.push(disposable);
}
