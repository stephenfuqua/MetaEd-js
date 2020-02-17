Packaging and publishing vscode-metaed as a VS Code Extension with the vsce utility currently runs into problems due to:
https://github.com/microsoft/vscode-vsce/issues/300, where the packager is not including symlinked npm packages
that are part of the monorepo.

https://github.com/microsoft/vscode-vsce/pull/379 is a fix to vsce to support yarn workspaces.  As of Feburary 2020,
it was not complete.

In the interim, the solution has been to copy the entire vscode-metaed package out of the monorepo, bring over the .npmrc,
yarn install, adjust the tsconfig.json, yarn build, and then package with vsce.  The limitation here is that yarn install
will grab the MyGet published versions of the monorepo packages.
