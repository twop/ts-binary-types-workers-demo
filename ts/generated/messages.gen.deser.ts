import {
  Packet,
  Payload,
  BoolI32,
  VariantPayload,
  NestedPayload
} from "./messages.gen";

import {
  seq_reader,
  opt_reader,
  read_str,
  read_f64,
  read_u32,
  read_bool,
  read_i32,
  Sink,
  Deserializer
} from "ts-binary";

const readOptStr: Deserializer<(string) | undefined> = opt_reader(read_str);

const readOptF64: Deserializer<(number) | undefined> = opt_reader(read_f64);

export const readBoolI32 = (sink: Sink): BoolI32 =>
  BoolI32(read_bool(sink), read_i32(sink));

const readOptBoolI32: Deserializer<(BoolI32) | undefined> = opt_reader(
  readBoolI32
);

const readVecI32: Deserializer<Array<number>> = seq_reader(read_i32);

export const readNestedPayload = (sink: Sink): NestedPayload => {
  const bool = read_bool(sink);
  const i32vec = readVecI32(sink);
  return { bool, i32vec };
};

export const readVariantPayload = (sink: Sink): VariantPayload => {
  switch (read_u32(sink)) {
    case 0:
      return VariantPayload.unit;
    case 1:
      return VariantPayload.val(readNestedPayload(sink));
  }
  throw new Error("bad variant index for VariantPayload");
};

const readOptVariantPayload: Deserializer<
  (VariantPayload) | undefined
> = opt_reader(readVariantPayload);

const readOptNestedPayload: Deserializer<
  (NestedPayload) | undefined
> = opt_reader(readNestedPayload);

export const readPayload = (sink: Sink): Payload => {
  const str = readOptStr(sink);
  const f64 = readOptF64(sink);
  const tuple = readOptBoolI32(sink);
  const union = readOptVariantPayload(sink);
  const structField = readOptNestedPayload(sink);
  return { str, f64, tuple, union, structField };
};

const readVecPayload: Deserializer<Array<Payload>> = seq_reader(readPayload);

export const readPacket = (sink: Sink): Packet => Packet(readVecPayload(sink));
