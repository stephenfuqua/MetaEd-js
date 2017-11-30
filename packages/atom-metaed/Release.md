MetaEd-IDE Release Process
===
Deployment is from a local machine.  **atom-metaed** (the Atom IDE plugin) is dependent on **metaed-js** and **metaed-csharp**, and must be version bumped even if there are no changes to it.   **atom-metaed** is the authoritative version number for the IDE.  Historically, we have not been concerned with keeping the versions of all three identical.  Make sure everything is up to date locally for **atom-metaed**, **metaed-js** and regular C# MetaEd (**metaed-csharp**).  This process requires a MyGet account with permissions to the Ed-Fi feed.  If this is in preparation for a production release, be sure to schedule QA time with a BA to execute test cases.
 
 
metaed-csharp
--- 
1. I always start with **metaed-csharp** first.  Make sure MetaEd is at the commit you want to tag and publish (usually master), and run a Rebuild All.  Make sure all tests pass.
2. Command line to the MetaEd/src/MetaEd.Console directory where the package.json for **metaed-csharp** sits.
3. Run `npm run release:version-dev` for a dev tag and commit.  This runs the "standard-version" open source package for version-bumping the package.json file and tagging the git commit in sync.  The production flavor for a production release sometimes needs to be done a little more manually with the same underlying package.json script commands.
4. Push to GitHub and the Alliance npm registry with `npm run release:publish-dev` (or the production flavor for a production release).
5. Go to www.myget.org where the Alliance npm registry is managed and choose the chris.moffatt/ed-fi feed.  Confirm the publish (may need a few browser refreshes.)
6. **Important**: Pin the new version so it doesn't get auto-deleted.
 
 
metaed-js
--- 
1. Be sure MetaEd-js is up to date at the correct commit (usually development).  Run `yarn check` to ensure you have the correct 3rd party packages, and `yarn install` if you are out of date.
2. Run `npm test`, `npm run flow` and `npm run eslint` and make sure they pass.
3. Run `npm run build` to transpile to the dist directory.  Then run `npm run release:version-dev` and `npm run release:publish-dev` like with **metaed-csharp**.
4. Go to MyGet, confirm and pin the new version.
 
 
atom-metaed
---
1. Be sure Atom-MetaEd is up to date at the correct commit (usually development).  Run `yarn check` to ensure you have the correct 3rd party packages, and `yarn install` if you are out of date.
2. Run `npm test`, `npm run flow` and `npm run eslint` and make sure they pass.
3. Run `yarn upgrade metaed-csharp@<new-version>` and `yarn upgrade metaed-js@<new-version>` to lock atom-metaed to the new versions.
4. Run `git add -A` to stage the change to yarn.lock resulting from the `yarn upgrade...` commands.
5. Run `npm test`, `npm run flow` and `npm run eslint` and make sure they pass.
6. Run `release: version-dev` and `release: publish-dev`.  If pushing production, run the individual commands by hand (since you aren't in an npm script context, prefix commands with "./node_modules/.bin".
7. Go to MyGet, confirm and pin the new version.
 
 
IDE deployment
---
Now it's time to test out the deployment.
1. In the IDE install directory, run `yarn upgrade atom-metaed@<new-version>`.  The end of the upgrade output will list the updated packages with versions.  Confirm all three packages (**metaed-csharp**, **metaed-js** and **atom-metaed**) are included with the correct new versions.
2. Start Atom and confirm version in the MetaEd -> About menu matches the expected **atom-metaed** version.
3. Try a few things out as smoke test.  If this is a precursor to a production release, have QA execute test cases.
 
 
Rollback
---
If a production release is a disaster, rollback is easy.  We *never* delete releases even if they a broken, because we want to maintain history.  Instead, we rollback which published version is "latest", and therefore the default for installs and upgrades.
1. From the command-line at the **atom-metaed** repo, run `npm dist-tag add atom-metaed@<version-to-rollback-to> latest`
2. In MyGet find that version and confirm that version has the "latest" tag, as listed on the right side under "Keywords".  It should look like "dist-tag:latest".  Double-check that it is pinned.  The deployment is now rolled back.
3. IDE installations that need to rollback can then run `yarn upgrade atom-metaed@<version-to-rollback-to>`.  Yes, `yarn upgrade` is used to downgrade.
 