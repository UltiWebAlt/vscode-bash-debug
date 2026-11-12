# Contributing

Microsoft's documentation for VS Code extensions is suprisingly good (https://code.visualstudio.com/docs/extensions/overview);

## On Linux

Works at least on Kubuntu.

1. install VS Code, `npm`, `nodejs`, optionally `bashdb` (some time ago `nodejs-legacy` was required) + build essentials
1. clone project
1. disable auto carriage return `git config core.autocrlf false; git reset --hard`
1. open VS Code, select project's folder, open terminal and type `npm install` (this will download dependencies)
1. Run by clicking **Ctrl+F5**, new VS window will open
1. Create some folder with one script file, then try debugging it by **F5** (to debug bashDebug.ts, read [this](https://code.visualstudio.com/docs/extensions/example-debuggers#_development-setup-for-mock-debug) -> basically set `Extension + Server` in debug pane, then set `"debugServer": 4711` configuration in launch.json of bash project)

## TypeScript versions

The build uses the native TypeScript 7 compiler through `@typescript/native`. The `typescript` dependency is aliased to the TypeScript 6 compatibility package because ESLint's TypeScript parser still uses the TypeScript JavaScript API; keep both dependencies when updating the compiler.

## On Windows 10

All the pieces seem to be there, but for some reason bash support needs some kick off (https://github.com/Microsoft/BashOnWindows/issues/2#issuecomment-209118529).

Currently, with some hacks, seems to be working on Windows 10. The scripts are executed in bash@linux realm,so all the paths inside scripts need to refer to linux filesystem (`/mnt/c/..`).

## On OS X

Seeems to be working when path to `pkill` is changed. MacOS seems to have bash v.3 by default, this project aims to support bash versions >= 4.3.

## Build CI

GitHub Actions runs compile, lint, tests, and VSIX packaging for pushes and pull requests to `master` and `develop`. To make a local VSIX, run `npm ci` and `npm run package`. A push does not publish a GitHub release or an extension marketplace version.
