import {
  Packet,
  Payload,
  BoolI32,
  VariantPayload,
  NestedPayload
} from "./messages.gen";

import {
  seq_writer,
  opt_writer,
  write_str,
  write_f64,
  write_u32,
  write_bool,
  write_i32,
  Sink,
  Serializer
} from "ts-binary";

const writeOptStr: Serializer<(string) | undefined> = opt_writer(write_str);

const writeOptF64: Serializer<(number) | undefined> = opt_writer(write_f64);

export const writeBoolI32 = (sink: Sink, val: BoolI32): Sink =>
  write_i32(write_bool(sink, val[0]), val[1]);

const writeOptBoolI32: Serializer<(BoolI32) | undefined> = opt_writer(
  writeBoolI32
);

const writeVecI32: Serializer<Array<number>> = seq_writer(write_i32);

export const writeNestedPayload = (
  sink: Sink,
  { bool, i32vec }: NestedPayload
): Sink => writeVecI32(write_bool(sink, bool), i32vec);

export const writeVariantPayload = (sink: Sink, val: VariantPayload): Sink => {
  switch (val.tag) {
    case "unit":
      return write_u32(sink, 0);
    case "val":
      return writeNestedPayload(write_u32(sink, 1), val.value);
  }
};

const writeOptVariantPayload: Serializer<
  (VariantPayload) | undefined
> = opt_writer(writeVariantPayload);

const writeOptNestedPayload: Serializer<
  (NestedPayload) | undefined
> = opt_writer(writeNestedPayload);

export const writePayload = (
  sink: Sink,
  { str, f64, tuple, union, structField }: Payload
): Sink =>
  writeOptNestedPayload(
    writeOptVariantPayload(
      writeOptBoolI32(writeOptF64(writeOptStr(sink, str), f64), tuple),
      union
    ),
    structField
  );

const writeVecPayload: Serializer<Array<Payload>> = seq_writer(writePayload);

export const writePacket: Serializer<Packet> = writeVecPayload;
