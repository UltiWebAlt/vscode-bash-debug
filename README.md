# Bash Debug

Bash Debug is a VS Code debugger extension and a Debug Adapter Protocol (DAP) adapter built on [bashdb](https://bashdb.sourceforge.net/). This repository is maintained by UltiWebAlt as a fork of [rogalmic/vscode-bash-debug](https://github.com/rogalmic/vscode-bash-debug). The VSIX includes bashdb, the compiled adapter, and its runtime dependencies.

The adapter can also be used by Neovim through Mason and nvim-dap. The VS Code extension UI and configuration provider run only in VS Code.

## Install in VS Code

Download the VSIX from the [latest GitHub release](https://github.com/UltiWebAlt/vscode-bash-debug/releases/latest), then choose **Extensions → Install from VSIX** in VS Code. You can also install a downloaded file from a shell:

```sh
code --install-extension bash-debug-0.4.3.vsix
```

The repository does not currently publish automatically to the VS Code Marketplace or Open VSX.

## Requirements

- VS Code 1.146 or newer for the extension. Neovim uses the DAP adapter separately.
- Bash 4.x or 5.x. The adapter checks for these major versions before launching.
- `cat`, `mkfifo`, `pkill`, `rm`, and `sleep` available in the environment where Bash runs.
- A Bash script to debug. The VSIX supplies bashdb; a separate bashdb installation is normally unnecessary.

On macOS, the system Bash may be version 3. Install Bash 4 or 5 and set `pathBash` to that executable. On Windows, use WSL with a supported Bash version. Paths passed to Bash tools must resolve inside WSL. The automated build and tests currently run on Linux, so macOS and WSL behavior should be checked on those systems.

## Debug a script in VS Code

Add a configuration to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "bashdb",
      "request": "launch",
      "name": "Debug current Bash file",
      "program": "${file}",
      "cwd": "${workspaceFolder}",
      "terminalKind": "integrated"
    }
  ]
}
```

Open a Bash script and start debugging with **F5**. You can set breakpoints, step through commands, inspect the stack and variables, evaluate expressions, and use conditional breakpoints. Choose `terminalKind: "integrated"` or `"external"` for scripts that read standard input. The default `"debugConsole"` is useful for noninteractive scripts.

VS Code fills in the bundled bashdb paths and defaults for omitted settings. Common launch settings are:

| Setting | Purpose |
| --- | --- |
| `args` | Array of script arguments, for example `["--mode", "test"]`. |
| `argsString` | Additional arguments appended as shell text. Prefer `args` for ordinary arguments. |
| `env` | Environment variables supplied to the script as an object. |
| `pathBash` | Bash executable; defaults to `bash`. |
| `pathBashdb`, `pathBashdbLib` | Override the bundled bashdb executable and library directory. |
| `pathCat`, `pathMkfifo`, `pathPkill` | Override paths to required utilities. |
| `terminalKind` | `debugConsole`, `integrated`, or `external`. |
| `showDebugOutput`, `trace` | Show bashdb output or DAP trace output when diagnosing a session. |

## Use the adapter in Neovim

Mason's default `bash-debug-adapter` package still refers to the original Rogalmic VSIX. To install this fork's release through Mason, put a [custom registry](https://github.com/UltiWebAlt/nvim-config/tree/main/lua/mason_bash_registry) ahead of the core registry. The [UltiWebAlt Neovim configuration](https://github.com/UltiWebAlt/nvim-config/blob/main/lua/plugins/mason-bash-registry.lua) contains a working example that points to this repository's `v0.4.3` VSIX.

After adding the registry, run `:MasonUpdate` and `:MasonInstall --force bash-debug-adapter`. With `mason-nvim-dap.nvim`, the Bash adapter resolves to Mason's `bash-debug-adapter` executable. No path to a local checkout of this repository is needed. The registry definition pins a release; update its version and VSIX filename when moving to a newer release.

## Build from source

Use the Node version in [`.nvmrc`](.nvmrc) for development. Then run:

```sh
npm ci
npm run lint
npm test
npm run package
```

`npm test` compiles the TypeScript source and runs the Jasmine tests. `npm run package` creates a VSIX in the repository root. GitHub Actions runs clean installation, compilation, linting, tests, and packaging on pushes and pull requests to `master` and `develop`. The [CodeQL workflow](.github/workflows/codeql.yml) also analyzes the TypeScript code.

## Current limitations

- Interactive scripts need an integrated or external terminal for standard input.
- bashdb may stop at the first command when a session starts.
- While debugging, `$0` can refer to bashdb rather than the script, and stepping may overwrite `BASH_REMATCH`.

Report reproducible problems in the [fork's issue tracker](https://github.com/UltiWebAlt/vscode-bash-debug/issues).
