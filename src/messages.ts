import {
  Struct,
  Vec,
  Tuple,
  Bool,
  Str,
  F64,
  Static,
  bindesc,
  Union,
  I32,
  Sink,
  Optional
} from "ts-binary-types";

const BoolI32 = Tuple(Bool, I32);
// const BoolStr = Tuple(Bool, Str);

const NestedPayload = Struct({
  bool: Bool,
  i32vec: Vec(I32)
});

type NestedPayload = Static<typeof NestedPayload>;

const genNestedPayload = (): NestedPayload => ({
  bool: genBool(),
  i32vec: genVec(5, genI32)
});

const VariantPayload = Union({
  unit: null,
  val: NestedPayload
});
type VariantPayload = Static<typeof VariantPayload>;

const genVariantPayload = (): VariantPayload => {
  const seed = Math.random();
  return seed < 0.5
    ? VariantPayload.unit
    : VariantPayload.val(genNestedPayload());
};

const Payload = Struct({
  str: Optional(Str),
  f64: Optional(F64),
  tuple: Optional(BoolI32),
  union: Optional(VariantPayload),
  struct: Optional(NestedPayload)
});

type Payload = Static<typeof Payload>;

export const Msg = Vec(Payload);
export type Msg = Static<typeof Msg>;

const genF64 = () => Math.random() * 1000000;
const genI32 = () =>
  Math.floor(Math.random() * 1000000 * (Math.random() > 0.5 ? 1 : -1));

const genVec = <T>(length: number, f: () => T) => Array.from({ length }, f);

function randomStr(length: number): string {
  var text = "";
  var possible = "авыджалдллтЛОЫФДЛВдфульсвдыолдо";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export type GenMsgOptions = {
  str?: boolean;
  f64?: boolean;
  tuple?: boolean;
  union?: boolean;
  struct?: boolean;
};

export const genPayload = ({
  str,
  f64,
  tuple,
  union,
  struct
}: GenMsgOptions): Payload => ({
  str: str ? randomStr(100) : undefined,
  f64: f64 ? genF64() : undefined,
  tuple: tuple ? BoolI32(genBool(), genI32()) : undefined,
  struct: struct ? genNestedPayload() : undefined,
  union: union ? genVariantPayload() : undefined
});
export const genMessage = (vecSize: number, options: GenMsgOptions): Msg =>
  genVec(vecSize, () => genPayload(options));

export const writeMessage = (msg: Msg, arr: Uint8Array): Uint8Array => {
  const { arr: res } = Msg[bindesc].write({ arr, pos: 0 }, msg);
  //   console.log("$$", pos);
  return res;
};

export const readMessage = (arr: Uint8Array): Msg => {
  const sink: Sink = { arr, pos: 0 };
  const res = Msg[bindesc].read(sink);
  // console.log(`read ${sink.pos} bytes`);
  return res;
};

function genBool(): boolean {
  return Math.random() > 0.5;
}

export type WorkerMsg =
  | { tag: "json"; val: Msg }
  | { tag: "msg_arr"; val: ArrayBuffer }
  | { tag: "shared_arr"; val: SharedArrayBuffer };

export const printExecTime = (name: string, delta: number) =>
  console.info(name + " took: %dms", delta);
