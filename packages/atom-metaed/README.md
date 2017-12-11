Atom-MetaEd
======

Purpose
-

This is the MetaEd plugin for the [Atom](https://atom.io) editor.  It is the source of the _atom-metaed_ package deployed in the Ed-Fi npm registry.  When installed as a plugin for Atom, it is known as the _MetaEd IDE_.  Versioning of _atom-metaed_ follows the versioning of MetaEd IDE releases, differing only in patch version.

Atom-Metaed handles all of the interfacing to the Atom editor, delegating syntax and semantic validation to metaed-core.  Actual MetaEd generation is delegated to metaed-csharp.

Atom-Metaed is dependent on the following npm packages:
* **metaed-csharp** - The C# implementation of MetaEd.
* **metaed-core** - The Javascript core implementation of MetaEd, which requires additional metaed-plugin-* npm packages to be useful.
* **ed-fi-model-2.0** - The Ed-Fi Data Standard 2.0 as described in MetaEd.
