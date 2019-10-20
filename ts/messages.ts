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

export const Payload = Struct({
  str: Optional(Str),
  f64: Optional(F64),
  tuple: Optional(BoolI32),
  union: Optional(VariantPayload),
  struct: Optional(NestedPayload)
});

export type Payload = Static<typeof Payload>;

export const Packet = Vec(Payload);
export type Packet = Static<typeof Packet>;

const genVariantPayload = (): VariantPayload => {
  const seed = Math.random();
  return seed < 0.5
    ? VariantPayload.unit
    : VariantPayload.val(genNestedPayload());
};
const genF64 = () => Math.random() * 1000000;
const genI32 = () =>
  Math.floor(Math.random() * 1000000 * (Math.random() > 0.5 ? 1 : -1));

const genVec = <T>(length: number, f: () => T) => Array.from({ length }, f);

// const possibleLetters =
//   "выфвпｪｺｻｪ ｷｼｪｩｪ ｺｪｹ ｻｼ ｴｮｨｱаывпцукжд比诶艾娜诶艾伊吾艾比诶艾娜诶艾伊吾asdsasadfasdfdsfsdafлчмДЛОДЛТДЛОЖЖЩШЛДЙТЦУЗЧЖСДЛ12389050-5435";

const possibleLetters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomStr(length: number): string {
  let text = "";

  for (let i = 0; i < length; i++)
    text += possibleLetters.charAt(
      Math.floor(Math.random() * possibleLetters.length)
    );

  return text;
}

export type GenPayloadOptions = {
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
}: GenPayloadOptions): Payload => ({
  str: str ? randomStr(100) : undefined,
  f64: f64 ? genF64() : undefined,
  tuple: tuple ? BoolI32(genBool(), genI32()) : undefined,
  struct: struct ? genNestedPayload() : undefined,
  union: union ? genVariantPayload() : undefined
});
export const genPacket = (
  vecSize: number,
  options: GenPayloadOptions
): Packet => genVec(vecSize, () => genPayload(options));

const write = Packet[bindesc].write;
export const writePacket = (msg: Packet, arr: Uint8Array): Uint8Array => {
  const { arr: res } = write({ arr, pos: 0 }, msg);
  //   console.log("$$", pos);
  return res;
};

const read = Packet[bindesc].read;
export const readPacket = (arr: Uint8Array): Packet => {
  const sink: Sink = { arr, pos: 0 };
  const res = read(sink);
  // console.log(`read ${sink.pos} bytes`);
  return res;
};

function genBool(): boolean {
  return Math.random() > 0.5;
}

export type WorkerStructuralMsg = { tag: "structural"; val: Packet };
export type WorkerJsonMsg = { tag: "json"; val: string };
export type WorkerMsg =
  | WorkerStructuralMsg
  | WorkerJsonMsg
  | { tag: "binary" | "binary_for_wasm"; val: ArrayBuffer };

export const printExecTime = (name: string, delta: number) =>
  console.info(name + " took: %dms", delta);
