let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const resourceHandleSymbol = Symbol('resource');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

function throwUninitialized() {
  throw new TypeError('Wasm uninitialized use `await $init` first');
}

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toInt32(val) {
  return val >> 0;
}

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen += s.length * 2);
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  utf8EncodedLen = writtenTotal;
  return ptr;
}

export async function instantiate(getCoreModule, imports, instantiateCore = WebAssembly.instantiate) {
  const module0 = getCoreModule('rust_html_component.core.wasm');
  const module1 = getCoreModule('rust_html_component.core2.wasm');
  const module2 = getCoreModule('rust_html_component.core3.wasm');
  const module3 = getCoreModule('rust_html_component.core4.wasm');
  
  const { getEnvironment } = imports['wasi:cli/environment'];
  const { exit } = imports['wasi:cli/exit'];
  const { getStderr } = imports['wasi:cli/stderr'];
  const { getStdin } = imports['wasi:cli/stdin'];
  const { getStdout } = imports['wasi:cli/stdout'];
  const { getDirectories } = imports['wasi:filesystem/preopens'];
  const { Descriptor, filesystemErrorCode } = imports['wasi:filesystem/types'];
  const { InputStream, OutputStream } = imports['wasi:io/streams'];
  let exports0;
  let exports1;
  
  function trampoline4() {
    const ret = getStderr();
    if (!(ret instanceof OutputStream)) {
      throw new Error('Resource error: Not a valid "OutputStream" resource.');
    }
    var handle0 = handleCnt1++;
    handleTable1.set(handle0, { rep: ret, own: true });
    return handle0;
  }
  
  function trampoline5(arg0) {
    let variant0;
    switch (arg0) {
      case 0: {
        variant0= {
          tag: 'ok',
          val: undefined
        };
        break;
      }
      case 1: {
        variant0= {
          tag: 'err',
          val: undefined
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for expected');
      }
    }
    exit(variant0);
  }
  
  function trampoline6() {
    const ret = getStdin();
    if (!(ret instanceof InputStream)) {
      throw new Error('Resource error: Not a valid "InputStream" resource.');
    }
    var handle0 = handleCnt2++;
    handleTable2.set(handle0, { rep: ret, own: true });
    return handle0;
  }
  
  function trampoline7() {
    const ret = getStdout();
    if (!(ret instanceof OutputStream)) {
      throw new Error('Resource error: Not a valid "OutputStream" resource.');
    }
    var handle0 = handleCnt1++;
    handleTable1.set(handle0, { rep: ret, own: true });
    return handle0;
  }
  let exports2;
  
  function trampoline8(arg0) {
    const ret = getDirectories();
    var vec3 = ret;
    var len3 = vec3.length;
    var result3 = realloc0(0, 0, 4, len3 * 12);
    for (let i = 0; i < vec3.length; i++) {
      const e = vec3[i];
      const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
      if (!(tuple0_0 instanceof Descriptor)) {
        throw new Error('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle1 = handleCnt3++;
      handleTable3.set(handle1, { rep: tuple0_0, own: true });
      dataView(memory0).setInt32(base + 0, handle1, true);
      var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
      var len2 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 8, len2, true);
      dataView(memory0).setInt32(base + 4, ptr2, true);
    }
    dataView(memory0).setInt32(arg0 + 4, len3, true);
    dataView(memory0).setInt32(arg0 + 0, result3, true);
  }
  let memory0;
  let realloc0;
  
  function trampoline9(arg0, arg1, arg2) {
    var handle1 = arg0;
    var rsc0 = handleTable3.get(handle1).rep;
    let ret;
    try {
      ret = { tag: 'ok', val: Descriptor.prototype.writeViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant4 = ret;
    switch (variant4.tag) {
      case 'ok': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg2 + 0, 0, true);
        if (!(e instanceof OutputStream)) {
          throw new Error('Resource error: Not a valid "OutputStream" resource.');
        }
        var handle2 = handleCnt1++;
        handleTable1.set(handle2, { rep: e, own: true });
        dataView(memory0).setInt32(arg2 + 4, handle2, true);
        break;
      }
      case 'err': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg2 + 0, 1, true);
        var val3 = e;
        let enum3;
        switch (val3) {
          case 'access': {
            enum3 = 0;
            break;
          }
          case 'would-block': {
            enum3 = 1;
            break;
          }
          case 'already': {
            enum3 = 2;
            break;
          }
          case 'bad-descriptor': {
            enum3 = 3;
            break;
          }
          case 'busy': {
            enum3 = 4;
            break;
          }
          case 'deadlock': {
            enum3 = 5;
            break;
          }
          case 'quota': {
            enum3 = 6;
            break;
          }
          case 'exist': {
            enum3 = 7;
            break;
          }
          case 'file-too-large': {
            enum3 = 8;
            break;
          }
          case 'illegal-byte-sequence': {
            enum3 = 9;
            break;
          }
          case 'in-progress': {
            enum3 = 10;
            break;
          }
          case 'interrupted': {
            enum3 = 11;
            break;
          }
          case 'invalid': {
            enum3 = 12;
            break;
          }
          case 'io': {
            enum3 = 13;
            break;
          }
          case 'is-directory': {
            enum3 = 14;
            break;
          }
          case 'loop': {
            enum3 = 15;
            break;
          }
          case 'too-many-links': {
            enum3 = 16;
            break;
          }
          case 'message-size': {
            enum3 = 17;
            break;
          }
          case 'name-too-long': {
            enum3 = 18;
            break;
          }
          case 'no-device': {
            enum3 = 19;
            break;
          }
          case 'no-entry': {
            enum3 = 20;
            break;
          }
          case 'no-lock': {
            enum3 = 21;
            break;
          }
          case 'insufficient-memory': {
            enum3 = 22;
            break;
          }
          case 'insufficient-space': {
            enum3 = 23;
            break;
          }
          case 'not-directory': {
            enum3 = 24;
            break;
          }
          case 'not-empty': {
            enum3 = 25;
            break;
          }
          case 'not-recoverable': {
            enum3 = 26;
            break;
          }
          case 'unsupported': {
            enum3 = 27;
            break;
          }
          case 'no-tty': {
            enum3 = 28;
            break;
          }
          case 'no-such-device': {
            enum3 = 29;
            break;
          }
          case 'overflow': {
            enum3 = 30;
            break;
          }
          case 'not-permitted': {
            enum3 = 31;
            break;
          }
          case 'pipe': {
            enum3 = 32;
            break;
          }
          case 'read-only': {
            enum3 = 33;
            break;
          }
          case 'invalid-seek': {
            enum3 = 34;
            break;
          }
          case 'text-file-busy': {
            enum3 = 35;
            break;
          }
          case 'cross-device': {
            enum3 = 36;
            break;
          }
          default: {
            if ((e) instanceof Error) {
              console.error(e);
            }
            
            throw new TypeError(`"${val3}" is not one of the cases of error-code`);
          }
        }
        dataView(memory0).setInt8(arg2 + 4, enum3, true);
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline10(arg0, arg1) {
    var handle1 = arg0;
    var rsc0 = handleTable3.get(handle1).rep;
    let ret;
    try {
      ret = { tag: 'ok', val: Descriptor.prototype.appendViaStream.call(rsc0) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant4 = ret;
    switch (variant4.tag) {
      case 'ok': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 0, true);
        if (!(e instanceof OutputStream)) {
          throw new Error('Resource error: Not a valid "OutputStream" resource.');
        }
        var handle2 = handleCnt1++;
        handleTable1.set(handle2, { rep: e, own: true });
        dataView(memory0).setInt32(arg1 + 4, handle2, true);
        break;
      }
      case 'err': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 1, true);
        var val3 = e;
        let enum3;
        switch (val3) {
          case 'access': {
            enum3 = 0;
            break;
          }
          case 'would-block': {
            enum3 = 1;
            break;
          }
          case 'already': {
            enum3 = 2;
            break;
          }
          case 'bad-descriptor': {
            enum3 = 3;
            break;
          }
          case 'busy': {
            enum3 = 4;
            break;
          }
          case 'deadlock': {
            enum3 = 5;
            break;
          }
          case 'quota': {
            enum3 = 6;
            break;
          }
          case 'exist': {
            enum3 = 7;
            break;
          }
          case 'file-too-large': {
            enum3 = 8;
            break;
          }
          case 'illegal-byte-sequence': {
            enum3 = 9;
            break;
          }
          case 'in-progress': {
            enum3 = 10;
            break;
          }
          case 'interrupted': {
            enum3 = 11;
            break;
          }
          case 'invalid': {
            enum3 = 12;
            break;
          }
          case 'io': {
            enum3 = 13;
            break;
          }
          case 'is-directory': {
            enum3 = 14;
            break;
          }
          case 'loop': {
            enum3 = 15;
            break;
          }
          case 'too-many-links': {
            enum3 = 16;
            break;
          }
          case 'message-size': {
            enum3 = 17;
            break;
          }
          case 'name-too-long': {
            enum3 = 18;
            break;
          }
          case 'no-device': {
            enum3 = 19;
            break;
          }
          case 'no-entry': {
            enum3 = 20;
            break;
          }
          case 'no-lock': {
            enum3 = 21;
            break;
          }
          case 'insufficient-memory': {
            enum3 = 22;
            break;
          }
          case 'insufficient-space': {
            enum3 = 23;
            break;
          }
          case 'not-directory': {
            enum3 = 24;
            break;
          }
          case 'not-empty': {
            enum3 = 25;
            break;
          }
          case 'not-recoverable': {
            enum3 = 26;
            break;
          }
          case 'unsupported': {
            enum3 = 27;
            break;
          }
          case 'no-tty': {
            enum3 = 28;
            break;
          }
          case 'no-such-device': {
            enum3 = 29;
            break;
          }
          case 'overflow': {
            enum3 = 30;
            break;
          }
          case 'not-permitted': {
            enum3 = 31;
            break;
          }
          case 'pipe': {
            enum3 = 32;
            break;
          }
          case 'read-only': {
            enum3 = 33;
            break;
          }
          case 'invalid-seek': {
            enum3 = 34;
            break;
          }
          case 'text-file-busy': {
            enum3 = 35;
            break;
          }
          case 'cross-device': {
            enum3 = 36;
            break;
          }
          default: {
            if ((e) instanceof Error) {
              console.error(e);
            }
            
            throw new TypeError(`"${val3}" is not one of the cases of error-code`);
          }
        }
        dataView(memory0).setInt8(arg1 + 4, enum3, true);
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline11(arg0, arg1) {
    var handle1 = arg0;
    var rsc0 = handleTable3.get(handle1).rep;
    let ret;
    try {
      ret = { tag: 'ok', val: Descriptor.prototype.getType.call(rsc0) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant4 = ret;
    switch (variant4.tag) {
      case 'ok': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 0, true);
        var val2 = e;
        let enum2;
        switch (val2) {
          case 'unknown': {
            enum2 = 0;
            break;
          }
          case 'block-device': {
            enum2 = 1;
            break;
          }
          case 'character-device': {
            enum2 = 2;
            break;
          }
          case 'directory': {
            enum2 = 3;
            break;
          }
          case 'fifo': {
            enum2 = 4;
            break;
          }
          case 'symbolic-link': {
            enum2 = 5;
            break;
          }
          case 'regular-file': {
            enum2 = 6;
            break;
          }
          case 'socket': {
            enum2 = 7;
            break;
          }
          default: {
            if ((e) instanceof Error) {
              console.error(e);
            }
            
            throw new TypeError(`"${val2}" is not one of the cases of descriptor-type`);
          }
        }
        dataView(memory0).setInt8(arg1 + 1, enum2, true);
        break;
      }
      case 'err': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 1, true);
        var val3 = e;
        let enum3;
        switch (val3) {
          case 'access': {
            enum3 = 0;
            break;
          }
          case 'would-block': {
            enum3 = 1;
            break;
          }
          case 'already': {
            enum3 = 2;
            break;
          }
          case 'bad-descriptor': {
            enum3 = 3;
            break;
          }
          case 'busy': {
            enum3 = 4;
            break;
          }
          case 'deadlock': {
            enum3 = 5;
            break;
          }
          case 'quota': {
            enum3 = 6;
            break;
          }
          case 'exist': {
            enum3 = 7;
            break;
          }
          case 'file-too-large': {
            enum3 = 8;
            break;
          }
          case 'illegal-byte-sequence': {
            enum3 = 9;
            break;
          }
          case 'in-progress': {
            enum3 = 10;
            break;
          }
          case 'interrupted': {
            enum3 = 11;
            break;
          }
          case 'invalid': {
            enum3 = 12;
            break;
          }
          case 'io': {
            enum3 = 13;
            break;
          }
          case 'is-directory': {
            enum3 = 14;
            break;
          }
          case 'loop': {
            enum3 = 15;
            break;
          }
          case 'too-many-links': {
            enum3 = 16;
            break;
          }
          case 'message-size': {
            enum3 = 17;
            break;
          }
          case 'name-too-long': {
            enum3 = 18;
            break;
          }
          case 'no-device': {
            enum3 = 19;
            break;
          }
          case 'no-entry': {
            enum3 = 20;
            break;
          }
          case 'no-lock': {
            enum3 = 21;
            break;
          }
          case 'insufficient-memory': {
            enum3 = 22;
            break;
          }
          case 'insufficient-space': {
            enum3 = 23;
            break;
          }
          case 'not-directory': {
            enum3 = 24;
            break;
          }
          case 'not-empty': {
            enum3 = 25;
            break;
          }
          case 'not-recoverable': {
            enum3 = 26;
            break;
          }
          case 'unsupported': {
            enum3 = 27;
            break;
          }
          case 'no-tty': {
            enum3 = 28;
            break;
          }
          case 'no-such-device': {
            enum3 = 29;
            break;
          }
          case 'overflow': {
            enum3 = 30;
            break;
          }
          case 'not-permitted': {
            enum3 = 31;
            break;
          }
          case 'pipe': {
            enum3 = 32;
            break;
          }
          case 'read-only': {
            enum3 = 33;
            break;
          }
          case 'invalid-seek': {
            enum3 = 34;
            break;
          }
          case 'text-file-busy': {
            enum3 = 35;
            break;
          }
          case 'cross-device': {
            enum3 = 36;
            break;
          }
          default: {
            if ((e) instanceof Error) {
              console.error(e);
            }
            
            throw new TypeError(`"${val3}" is not one of the cases of error-code`);
          }
        }
        dataView(memory0).setInt8(arg1 + 1, enum3, true);
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline12(arg0, arg1) {
    var handle1 = arg0;
    var rsc0 = handleTable3.get(handle1).rep;
    let ret;
    try {
      ret = { tag: 'ok', val: Descriptor.prototype.stat.call(rsc0) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant11 = ret;
    switch (variant11.tag) {
      case 'ok': {
        const e = variant11.val;
        dataView(memory0).setInt8(arg1 + 0, 0, true);
        var {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
        var val3 = v2_0;
        let enum3;
        switch (val3) {
          case 'unknown': {
            enum3 = 0;
            break;
          }
          case 'block-device': {
            enum3 = 1;
            break;
          }
          case 'character-device': {
            enum3 = 2;
            break;
          }
          case 'directory': {
            enum3 = 3;
            break;
          }
          case 'fifo': {
            enum3 = 4;
            break;
          }
          case 'symbolic-link': {
            enum3 = 5;
            break;
          }
          case 'regular-file': {
            enum3 = 6;
            break;
          }
          case 'socket': {
            enum3 = 7;
            break;
          }
          default: {
            if ((v2_0) instanceof Error) {
              console.error(v2_0);
            }
            
            throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
          }
        }
        dataView(memory0).setInt8(arg1 + 8, enum3, true);
        dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
        dataView(memory0).setBigInt64(arg1 + 24, toUint64(v2_2), true);
        var variant5 = v2_3;
        if (variant5 === null || variant5=== undefined) {
          dataView(memory0).setInt8(arg1 + 32, 0, true);
        } else {
          const e = variant5;
          dataView(memory0).setInt8(arg1 + 32, 1, true);
          var {seconds: v4_0, nanoseconds: v4_1 } = e;
          dataView(memory0).setBigInt64(arg1 + 40, toUint64(v4_0), true);
          dataView(memory0).setInt32(arg1 + 48, toUint32(v4_1), true);
        }
        var variant7 = v2_4;
        if (variant7 === null || variant7=== undefined) {
          dataView(memory0).setInt8(arg1 + 56, 0, true);
        } else {
          const e = variant7;
          dataView(memory0).setInt8(arg1 + 56, 1, true);
          var {seconds: v6_0, nanoseconds: v6_1 } = e;
          dataView(memory0).setBigInt64(arg1 + 64, toUint64(v6_0), true);
          dataView(memory0).setInt32(arg1 + 72, toUint32(v6_1), true);
        }
        var variant9 = v2_5;
        if (variant9 === null || variant9=== undefined) {
          dataView(memory0).setInt8(arg1 + 80, 0, true);
        } else {
          const e = variant9;
          dataView(memory0).setInt8(arg1 + 80, 1, true);
          var {seconds: v8_0, nanoseconds: v8_1 } = e;
          dataView(memory0).setBigInt64(arg1 + 88, toUint64(v8_0), true);
          dataView(memory0).setInt32(arg1 + 96, toUint32(v8_1), true);
        }
        break;
      }
      case 'err': {
        const e = variant11.val;
        dataView(memory0).setInt8(arg1 + 0, 1, true);
        var val10 = e;
        let enum10;
        switch (val10) {
          case 'access': {
            enum10 = 0;
            break;
          }
          case 'would-block': {
            enum10 = 1;
            break;
          }
          case 'already': {
            enum10 = 2;
            break;
          }
          case 'bad-descriptor': {
            enum10 = 3;
            break;
          }
          case 'busy': {
            enum10 = 4;
            break;
          }
          case 'deadlock': {
            enum10 = 5;
            break;
          }
          case 'quota': {
            enum10 = 6;
            break;
          }
          case 'exist': {
            enum10 = 7;
            break;
          }
          case 'file-too-large': {
            enum10 = 8;
            break;
          }
          case 'illegal-byte-sequence': {
            enum10 = 9;
            break;
          }
          case 'in-progress': {
            enum10 = 10;
            break;
          }
          case 'interrupted': {
            enum10 = 11;
            break;
          }
          case 'invalid': {
            enum10 = 12;
            break;
          }
          case 'io': {
            enum10 = 13;
            break;
          }
          case 'is-directory': {
            enum10 = 14;
            break;
          }
          case 'loop': {
            enum10 = 15;
            break;
          }
          case 'too-many-links': {
            enum10 = 16;
            break;
          }
          case 'message-size': {
            enum10 = 17;
            break;
          }
          case 'name-too-long': {
            enum10 = 18;
            break;
          }
          case 'no-device': {
            enum10 = 19;
            break;
          }
          case 'no-entry': {
            enum10 = 20;
            break;
          }
          case 'no-lock': {
            enum10 = 21;
            break;
          }
          case 'insufficient-memory': {
            enum10 = 22;
            break;
          }
          case 'insufficient-space': {
            enum10 = 23;
            break;
          }
          case 'not-directory': {
            enum10 = 24;
            break;
          }
          case 'not-empty': {
            enum10 = 25;
            break;
          }
          case 'not-recoverable': {
            enum10 = 26;
            break;
          }
          case 'unsupported': {
            enum10 = 27;
            break;
          }
          case 'no-tty': {
            enum10 = 28;
            break;
          }
          case 'no-such-device': {
            enum10 = 29;
            break;
          }
          case 'overflow': {
            enum10 = 30;
            break;
          }
          case 'not-permitted': {
            enum10 = 31;
            break;
          }
          case 'pipe': {
            enum10 = 32;
            break;
          }
          case 'read-only': {
            enum10 = 33;
            break;
          }
          case 'invalid-seek': {
            enum10 = 34;
            break;
          }
          case 'text-file-busy': {
            enum10 = 35;
            break;
          }
          case 'cross-device': {
            enum10 = 36;
            break;
          }
          default: {
            if ((e) instanceof Error) {
              console.error(e);
            }
            
            throw new TypeError(`"${val10}" is not one of the cases of error-code`);
          }
        }
        dataView(memory0).setInt8(arg1 + 8, enum10, true);
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline13(arg0, arg1) {
    var handle1 = arg0;
    var rsc0 = handleTable0.get(handle1).rep;
    const ret = filesystemErrorCode(rsc0);
    var variant3 = ret;
    if (variant3 === null || variant3=== undefined) {
      dataView(memory0).setInt8(arg1 + 0, 0, true);
    } else {
      const e = variant3;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'access': {
          enum2 = 0;
          break;
        }
        case 'would-block': {
          enum2 = 1;
          break;
        }
        case 'already': {
          enum2 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum2 = 3;
          break;
        }
        case 'busy': {
          enum2 = 4;
          break;
        }
        case 'deadlock': {
          enum2 = 5;
          break;
        }
        case 'quota': {
          enum2 = 6;
          break;
        }
        case 'exist': {
          enum2 = 7;
          break;
        }
        case 'file-too-large': {
          enum2 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum2 = 9;
          break;
        }
        case 'in-progress': {
          enum2 = 10;
          break;
        }
        case 'interrupted': {
          enum2 = 11;
          break;
        }
        case 'invalid': {
          enum2 = 12;
          break;
        }
        case 'io': {
          enum2 = 13;
          break;
        }
        case 'is-directory': {
          enum2 = 14;
          break;
        }
        case 'loop': {
          enum2 = 15;
          break;
        }
        case 'too-many-links': {
          enum2 = 16;
          break;
        }
        case 'message-size': {
          enum2 = 17;
          break;
        }
        case 'name-too-long': {
          enum2 = 18;
          break;
        }
        case 'no-device': {
          enum2 = 19;
          break;
        }
        case 'no-entry': {
          enum2 = 20;
          break;
        }
        case 'no-lock': {
          enum2 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum2 = 22;
          break;
        }
        case 'insufficient-space': {
          enum2 = 23;
          break;
        }
        case 'not-directory': {
          enum2 = 24;
          break;
        }
        case 'not-empty': {
          enum2 = 25;
          break;
        }
        case 'not-recoverable': {
          enum2 = 26;
          break;
        }
        case 'unsupported': {
          enum2 = 27;
          break;
        }
        case 'no-tty': {
          enum2 = 28;
          break;
        }
        case 'no-such-device': {
          enum2 = 29;
          break;
        }
        case 'overflow': {
          enum2 = 30;
          break;
        }
        case 'not-permitted': {
          enum2 = 31;
          break;
        }
        case 'pipe': {
          enum2 = 32;
          break;
        }
        case 'read-only': {
          enum2 = 33;
          break;
        }
        case 'invalid-seek': {
          enum2 = 34;
          break;
        }
        case 'text-file-busy': {
          enum2 = 35;
          break;
        }
        case 'cross-device': {
          enum2 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum2, true);
    }
  }
  
  function trampoline14(arg0, arg1) {
    var handle1 = arg0;
    var rsc0 = handleTable1.get(handle1).rep;
    let ret;
    try {
      ret = { tag: 'ok', val: OutputStream.prototype.checkWrite.call(rsc0) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant4 = ret;
    switch (variant4.tag) {
      case 'ok': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 0, true);
        dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
        break;
      }
      case 'err': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 1, true);
        var variant3 = e;
        switch (variant3.tag) {
          case 'last-operation-failed': {
            const e = variant3.val;
            dataView(memory0).setInt8(arg1 + 8, 0, true);
            if (!(e instanceof Error$1)) {
              throw new Error('Resource error: Not a valid "Error" resource.');
            }
            var handle2 = handleCnt0++;
            handleTable0.set(handle2, { rep: e, own: true });
            dataView(memory0).setInt32(arg1 + 12, handle2, true);
            break;
          }
          case 'closed': {
            dataView(memory0).setInt8(arg1 + 8, 1, true);
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
          }
        }
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline15(arg0, arg1, arg2, arg3) {
    var handle1 = arg0;
    var rsc0 = handleTable1.get(handle1).rep;
    var ptr2 = arg1;
    var len2 = arg2;
    var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
    let ret;
    try {
      ret = { tag: 'ok', val: OutputStream.prototype.write.call(rsc0, result2) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant5 = ret;
    switch (variant5.tag) {
      case 'ok': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg3 + 0, 0, true);
        break;
      }
      case 'err': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg3 + 0, 1, true);
        var variant4 = e;
        switch (variant4.tag) {
          case 'last-operation-failed': {
            const e = variant4.val;
            dataView(memory0).setInt8(arg3 + 4, 0, true);
            if (!(e instanceof Error$1)) {
              throw new Error('Resource error: Not a valid "Error" resource.');
            }
            var handle3 = handleCnt0++;
            handleTable0.set(handle3, { rep: e, own: true });
            dataView(memory0).setInt32(arg3 + 8, handle3, true);
            break;
          }
          case 'closed': {
            dataView(memory0).setInt8(arg3 + 4, 1, true);
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
          }
        }
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline16(arg0, arg1, arg2, arg3) {
    var handle1 = arg0;
    var rsc0 = handleTable1.get(handle1).rep;
    var ptr2 = arg1;
    var len2 = arg2;
    var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
    let ret;
    try {
      ret = { tag: 'ok', val: OutputStream.prototype.blockingWriteAndFlush.call(rsc0, result2) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant5 = ret;
    switch (variant5.tag) {
      case 'ok': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg3 + 0, 0, true);
        break;
      }
      case 'err': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg3 + 0, 1, true);
        var variant4 = e;
        switch (variant4.tag) {
          case 'last-operation-failed': {
            const e = variant4.val;
            dataView(memory0).setInt8(arg3 + 4, 0, true);
            if (!(e instanceof Error$1)) {
              throw new Error('Resource error: Not a valid "Error" resource.');
            }
            var handle3 = handleCnt0++;
            handleTable0.set(handle3, { rep: e, own: true });
            dataView(memory0).setInt32(arg3 + 8, handle3, true);
            break;
          }
          case 'closed': {
            dataView(memory0).setInt8(arg3 + 4, 1, true);
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
          }
        }
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline17(arg0, arg1) {
    var handle1 = arg0;
    var rsc0 = handleTable1.get(handle1).rep;
    let ret;
    try {
      ret = { tag: 'ok', val: OutputStream.prototype.blockingFlush.call(rsc0) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    var variant4 = ret;
    switch (variant4.tag) {
      case 'ok': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 0, true);
        break;
      }
      case 'err': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 0, 1, true);
        var variant3 = e;
        switch (variant3.tag) {
          case 'last-operation-failed': {
            const e = variant3.val;
            dataView(memory0).setInt8(arg1 + 4, 0, true);
            if (!(e instanceof Error$1)) {
              throw new Error('Resource error: Not a valid "Error" resource.');
            }
            var handle2 = handleCnt0++;
            handleTable0.set(handle2, { rep: e, own: true });
            dataView(memory0).setInt32(arg1 + 8, handle2, true);
            break;
          }
          case 'closed': {
            dataView(memory0).setInt8(arg1 + 4, 1, true);
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
          }
        }
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function trampoline18(arg0) {
    const ret = getEnvironment();
    var vec3 = ret;
    var len3 = vec3.length;
    var result3 = realloc0(0, 0, 4, len3 * 16);
    for (let i = 0; i < vec3.length; i++) {
      const e = vec3[i];
      const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
      var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
      var len1 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len1, true);
      dataView(memory0).setInt32(base + 0, ptr1, true);
      var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
      var len2 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len2, true);
      dataView(memory0).setInt32(base + 8, ptr2, true);
    }
    dataView(memory0).setInt32(arg0 + 4, len3, true);
    dataView(memory0).setInt32(arg0 + 0, result3, true);
  }
  let exports3;
  let realloc1;
  let postReturn0;
  function trampoline0(handle) {
    const handleEntry = handleTable0.get(handle);
    if (!handleEntry) {
      throw new Error(`Resource error: Invalid handle ${handle}`);
    }
    handleTable0.delete(handle);
    if (handleEntry.own && handleEntry.rep[symbolDispose]) {
      handleEntry.rep[symbolDispose]();
    }
  }
  function trampoline1(handle) {
    const handleEntry = handleTable2.get(handle);
    if (!handleEntry) {
      throw new Error(`Resource error: Invalid handle ${handle}`);
    }
    handleTable2.delete(handle);
    if (handleEntry.own && handleEntry.rep[symbolDispose]) {
      handleEntry.rep[symbolDispose]();
    }
  }
  function trampoline2(handle) {
    const handleEntry = handleTable1.get(handle);
    if (!handleEntry) {
      throw new Error(`Resource error: Invalid handle ${handle}`);
    }
    handleTable1.delete(handle);
    if (handleEntry.own && handleEntry.rep[symbolDispose]) {
      handleEntry.rep[symbolDispose]();
    }
  }
  function trampoline3(handle) {
    const handleEntry = handleTable3.get(handle);
    if (!handleEntry) {
      throw new Error(`Resource error: Invalid handle ${handle}`);
    }
    handleTable3.delete(handle);
    if (handleEntry.own && handleEntry.rep[symbolDispose]) {
      handleEntry.rep[symbolDispose]();
    }
  }
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['12'],
      environ_sizes_get: exports0['13'],
      fd_write: exports0['11'],
      proc_exit: exports0['14'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli/environment@0.2.0': {
      'get-environment': exports0['10'],
    },
    'wasi:cli/exit@0.2.0': {
      exit: trampoline5,
    },
    'wasi:cli/stderr@0.2.0': {
      'get-stderr': trampoline4,
    },
    'wasi:cli/stdin@0.2.0': {
      'get-stdin': trampoline6,
    },
    'wasi:cli/stdout@0.2.0': {
      'get-stdout': trampoline7,
    },
    'wasi:filesystem/preopens@0.2.0': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types@0.2.0': {
      '[method]descriptor.append-via-stream': exports0['2'],
      '[method]descriptor.get-type': exports0['3'],
      '[method]descriptor.stat': exports0['4'],
      '[method]descriptor.write-via-stream': exports0['1'],
      '[resource-drop]descriptor': trampoline3,
      'filesystem-error-code': exports0['5'],
    },
    'wasi:io/error@0.2.0': {
      '[resource-drop]error': trampoline0,
    },
    'wasi:io/streams@0.2.0': {
      '[method]output-stream.blocking-flush': exports0['9'],
      '[method]output-stream.blocking-write-and-flush': exports0['8'],
      '[method]output-stream.check-write': exports0['6'],
      '[method]output-stream.write': exports0['7'],
      '[resource-drop]input-stream': trampoline1,
      '[resource-drop]output-stream': trampoline2,
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline8,
      '1': trampoline9,
      '10': trampoline18,
      '11': exports2.fd_write,
      '12': exports2.environ_get,
      '13': exports2.environ_sizes_get,
      '14': exports2.proc_exit,
      '2': trampoline10,
      '3': trampoline11,
      '4': trampoline12,
      '5': trampoline13,
      '6': trampoline14,
      '7': trampoline15,
      '8': trampoline16,
      '9': trampoline17,
    },
  }));
  realloc1 = exports1.cabi_realloc;
  postReturn0 = exports1['cabi_post_transform-html'];
  
  function transformHtml(arg0, arg1) {
    if (!_initialized) throwUninitialized();
    var ptr0 = utf8Encode(arg0, realloc1, memory0);
    var len0 = utf8EncodedLen;
    var {placeholderClass: v1_0, basePathForRelativeImages: v1_1, postId: v1_2, textSplitterConfig: v1_3 } = arg1;
    var ptr2 = utf8Encode(v1_0, realloc1, memory0);
    var len2 = utf8EncodedLen;
    var ptr3 = utf8Encode(v1_1, realloc1, memory0);
    var len3 = utf8EncodedLen;
    var ptr4 = utf8Encode(v1_2, realloc1, memory0);
    var len4 = utf8EncodedLen;
    var variant6 = v1_3;
    let variant6_0;
    let variant6_1;
    let variant6_2;
    if (variant6 === null || variant6=== undefined) {
      variant6_0 = 0;
      variant6_1 = 0;
      variant6_2 = 0;
    } else {
      const e = variant6;
      var {maxLength: v5_0, minLength: v5_1 } = e;
      variant6_0 = 1;
      variant6_1 = toInt32(v5_0);
      variant6_2 = toInt32(v5_1);
    }
    const ret = exports1['transform-html'](ptr0, len0, ptr2, len2, ptr3, len3, ptr4, len4, variant6_0, variant6_1, variant6_2);
    var len10 = dataView(memory0).getInt32(ret + 4, true);
    var base10 = dataView(memory0).getInt32(ret + 0, true);
    var result10 = [];
    for (let i = 0; i < len10; i++) {
      const base = base10 + i * 16;
      let variant9;
      switch (dataView(memory0).getUint8(base + 0, true)) {
        case 0: {
          var ptr7 = dataView(memory0).getInt32(base + 4, true);
          var len7 = dataView(memory0).getInt32(base + 8, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant9= {
            tag: 'intro',
            val: {
              html: result7,
              section: dataView(memory0).getInt32(base + 12, true),
            }
          };
          break;
        }
        case 1: {
          var ptr8 = dataView(memory0).getInt32(base + 4, true);
          var len8 = dataView(memory0).getInt32(base + 8, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant9= {
            tag: 'h2',
            val: {
              html: result8,
              section: dataView(memory0).getInt32(base + 12, true),
            }
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for ContentBlock');
        }
      }
      result10.push(variant9);
    }
    var len14 = dataView(memory0).getInt32(ret + 12, true);
    var base14 = dataView(memory0).getInt32(ret + 8, true);
    var result14 = [];
    for (let i = 0; i < len14; i++) {
      const base = base14 + i * 24;
      var ptr11 = dataView(memory0).getInt32(base + 0, true);
      var len11 = dataView(memory0).getInt32(base + 4, true);
      var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
      let variant12;
      switch (dataView(memory0).getUint8(base + 8, true)) {
        case 0: {
          variant12 = undefined;
          break;
        }
        case 1: {
          variant12 = dataView(memory0).getInt32(base + 12, true);
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      let variant13;
      switch (dataView(memory0).getUint8(base + 16, true)) {
        case 0: {
          variant13 = undefined;
          break;
        }
        case 1: {
          variant13 = dataView(memory0).getInt32(base + 20, true);
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      result14.push({
        src: result11,
        width: variant12,
        height: variant13,
      });
    }
    postReturn0(ret);
    return {
      blocks: result10,
      images: result14,
    };
  }
  const handleTable0= new Map();
  let handleCnt0 = 0;
  const handleTable1= new Map();
  let handleCnt1 = 0;
  const handleTable2= new Map();
  let handleCnt2 = 0;
  const handleTable3= new Map();
  let handleCnt3 = 0;
  
  return { transformHtml,  };
}
