import type { TransformHtmlConfig } from '../interfaces/root-component-types.js';
export { TransformHtmlConfig };
import type { BlocksAndImages } from '../interfaces/root-component-types.js';
export { BlocksAndImages };
import { RootComponentTypes } from './interfaces/root-component-types.js';
import { WasiCliEnvironment } from './interfaces/wasi-cli-environment.js';
import { WasiCliExit } from './interfaces/wasi-cli-exit.js';
import { WasiCliStderr } from './interfaces/wasi-cli-stderr.js';
import { WasiCliStdin } from './interfaces/wasi-cli-stdin.js';
import { WasiCliStdout } from './interfaces/wasi-cli-stdout.js';
import { WasiClocksWallClock } from './interfaces/wasi-clocks-wall-clock.js';
import { WasiFilesystemPreopens } from './interfaces/wasi-filesystem-preopens.js';
import { WasiFilesystemTypes } from './interfaces/wasi-filesystem-types.js';
import { WasiIoError } from './interfaces/wasi-io-error.js';
import { WasiIoStreams } from './interfaces/wasi-io-streams.js';
export interface ImportObject {
  'root:component/types': typeof RootComponentTypes,
  'wasi:cli/environment@0.2.0': typeof WasiCliEnvironment,
  'wasi:cli/exit@0.2.0': typeof WasiCliExit,
  'wasi:cli/stderr@0.2.0': typeof WasiCliStderr,
  'wasi:cli/stdin@0.2.0': typeof WasiCliStdin,
  'wasi:cli/stdout@0.2.0': typeof WasiCliStdout,
  'wasi:clocks/wall-clock@0.2.0': typeof WasiClocksWallClock,
  'wasi:filesystem/preopens@0.2.0': typeof WasiFilesystemPreopens,
  'wasi:filesystem/types@0.2.0': typeof WasiFilesystemTypes,
  'wasi:io/error@0.2.0': typeof WasiIoError,
  'wasi:io/streams@0.2.0': typeof WasiIoStreams,
}
export interface Root {
  transformHtml(input: string, config: TransformHtmlConfig): BlocksAndImages,
}

export const $init: Promise<void>;

/**
* Instantiates this component with the provided imports and
* returns a map of all the exports of the component.
*
* This function is intended to be similar to the
* `WebAssembly.instantiate` function. The second `imports`
* argument is the "import object" for wasm, except here it
* uses component-model-layer types instead of core wasm
* integers/numbers/etc.
*
* The first argument to this function, `getCoreModule`, is
* used to compile core wasm modules within the component.
* Components are composed of core wasm modules and this callback
* will be invoked per core wasm module. The caller of this
* function is responsible for reading the core wasm module
* identified by `path` and returning its compiled
* `WebAssembly.Module` object. This would use `compileStreaming`
* on the web, for example.
*/
export function instantiate(
getCoreModule: (path: string) => Promise<WebAssembly.Module>,
imports: ImportObject,
instantiateCore?: (module: WebAssembly.Module, imports: Record<string, any>) => Promise<WebAssembly.Instance>
): Promise<Root>;

