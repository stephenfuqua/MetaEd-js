MetaEd-IDE
======

Prerequisites  
-

1. Atom Editor 1.10.0 or higher: <https://atom.io/>.
2. Node.js 6.0 or higher: <https://nodejs.org/>.
3. A local copy of the MetaEd repository: <https://github.com/Ed-Fi-Alliance/MetaEd>.
5. (OPTIONAL) A local working copy of the Ed-Fi ODS / API if you want to do API testing, see: <https://techdocs.ed-fi.org/display/ODSAPI21/Getting+Started+-+Installation+Steps>.

Setting Up
-

1. Clone the MetaEd-IDE repository locally and run `npm install` from the repository directory.
2. Also run `apm install` from the same directory, this installs MetaEd as a package for Atom.
3. Link the repository as an Atom package by running `apm link --dev`.  This will cause the MetaEd-IDE package to only run in dev mode.
4. Build the local copy of the MetaEd Solution.
5. In Atom, go to Settings -> Install from the left menu of the tab. Search for and install the following packages:  `linter`, `linter-eslint`, and `linter-flow` (Note, you may have to search for linter-eslint to find linter).
6. Find the directory where the linter-flow is installed (`%User%\.atom\packages\linter-flow\`) and run `npm install --global --save-dev flow-bin`
7. Also run `apm install linter-flow` from the same directory.
8. Find the directory where the flow executable now resides (`%User%\AppData\Roaming\npm\`) and run `flow init`
9. In Atom, go to File -> Config and replace the configuration with the following. Replace the values for the various paths with your local paths (edfiOdsApiSourceDirectory is optional for Prerequisite 5):
~~~~
"*":
  "atom-metaed":
    cmdFullPath: "C:\\Windows\\System32\\cmd.exe"
    coreMetaEdSourceDirectory: "D:\\DLP\\MetaEd\\src\\MetaEd.Console\\bower_components\\Ed-Fi-MetaEd-Standard"
    edfiOdsApiSourceDirectory: "D:\\DLP"
    metaEdConsoleSourceDirectory: "D:\\DLP\\MetaEd\\src\\MetaEd.Console"
  core:
    telemetryConsent: "limited"
  editor:
    preferredLineLength: 120
  "line-ending-selector":
    defaultLineEnding: "LF"
  "linter-eslint":
    fixOnSave: true
    scopes: [
      "source.js"
      "source.jsx"
      "source.js.jsx"
      "source.babel"
      "source.js-semantic"
      "source.json"
    ]
  "linter-flow":
    enableAll: false
    executablePath: "D:\\Users\\{{{---Your Username Here---}}}\\AppData\\Roaming\\npm\\flow"
  welcome:
    showOnStartup: false
~~~~
10. Restart Atom and open the directory containing the MetaEd to view. Run the build from the MetaEd dropdown. The parse command only outputs to the debug console. Syntax errors should show up in real time.