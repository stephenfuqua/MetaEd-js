# metaed-console

This package can be used for running the MetaEd build process from the command line.

1. Build the project from the parent directory with `npm run build`.
2. To confirm it is functional, try `node ./dist/index.js -h`.
3. The easiest way to run this is with a config file. See `metaed-edfi-5.2.json` for a fully-worked
   sample config file. Note that this shows Alliance Mode _on_, which is only appropriate in the Ed-Fi Alliance's build
   processes. External users should set this to `false`. To run with a config file:
    `node ./dist/index.js -a -c ./metaed-edfi-5.2.json`.
