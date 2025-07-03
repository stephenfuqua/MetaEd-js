## General

* Make only high confidence suggestions when reviewing code changes.
* Never change package.json or package-lock.json files unless explicitly asked to.
* Apply the [coding style](../docs/codingStyle.md) defined in the MetaEd Coding Style Guide.

## Formatting

* Apply code-formatting style defined in `.editorconfig`.
* For linting run `npm run test:lint` and fix all issues.

### Nullable Reference Types

* Declare variables non-nullable, and check for `null` at entry points.
* Always use `is null` or `is not null` instead of `== null` or `!= null`.
* Trust the C# null annotations and don't add null checks when the type system says a value cannot be null.

### Testing

* We use Jest tests.
* Copy existing style in nearby files for test method names and capitalization.
* To build and run tests in the repo, use the command `npm run test`
