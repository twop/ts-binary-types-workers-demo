import {
  VariantPayload,
  NestedPayload,
  Payload,
  BoolI32,
  Packet
} from "./generated/messages.gen";

const genNestedPayload = (): NestedPayload => ({
  bool: genBool(),
  i32vec: genVec(5, genI32)
});

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

const possibleLetters =
  "выфвпｪｺｻｪ ｷｼｪｩｪ ｺｪｹ ｻｼ ｴｮｨｱаывпцукжд比诶艾娜诶艾伊吾艾比诶艾娜诶艾伊吾asdsasadfasdfdsfsdafлчмДЛОДЛТДЛОЖЖЩШЛДЙТЦУЗЧЖСДЛ12389050-5435";

// const possibleLetters =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
  structField: struct ? genNestedPayload() : undefined,
  union: union ? genVariantPayload() : undefined
});

export const genPacket = (
  vecSize: number,
  options: GenPayloadOptions
): Packet => Packet(genVec(vecSize, () => genPayload(options)));

// export const writePacket = (msg: Packet, arr: Uint8Array): Uint8Array => {
//   const { arr: res } = writeP({ arr, pos: 0 }, msg);
//   //   console.log("$$", pos);
//   return res;
// };

// const read = Packet[bindesc].read;
// export const readPacket = (arr: Uint8Array): Packet => {
//   const sink: Sink = { arr, pos: 0 };
//   const res = read(sink);
//   // console.log(`read ${sink.pos} bytes`);
//   return res;
// };

function genBool(): boolean {
  return Math.random() > 0.5;
}

export type WorkerStructuralMsg = { tag: "structural"; val: Packet };
export type WorkerJsonMsg = { tag: "json"; val: string };
export type WorkerMsg =
  | WorkerStructuralMsg
  | WorkerJsonMsg
  | { tag: "binary" | "binary_for_wasm"; val: ArrayBuffer };
