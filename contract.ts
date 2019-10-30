import {
  schema2rust,
  schema2ts,
  EntryType,
  T,
  Variant as V,
  ast2ts,
  schema2serializers,
  schema2deserializers
} from "ts-rust-bridge-codegen";

import { format } from "prettier";
import * as fs from "fs";

const BoolI32 = EntryType.Tuple("BoolI32", [T.Scalar.Bool, T.Scalar.I32]);

const NestedPayload = EntryType.Struct("NestedPayload", {
  bool: T.Scalar.Bool,
  i32vec: T.Vec(T.Scalar.I32)
});

const VariantPayload = EntryType.Union(
  "VariantPayload",
  [V.Unit("unit"), V.NewType("val", T.RefTo(NestedPayload))],
  { tagAnnotation: false }
);

const Payload = EntryType.Struct("Payload", {
  str: T.Option(T.Scalar.Str),
  f64: T.Option(T.Scalar.F64),
  tuple: T.Option(T.RefTo(BoolI32)),
  union: T.Option(T.RefTo(VariantPayload)),
  structField: T.Option(T.RefTo(NestedPayload))
});

const Packet = EntryType.Newtype("Packet", T.Vec(T.RefTo(Payload)));

const types = [Packet, Payload, VariantPayload, NestedPayload, BoolI32];

const tsFile = __dirname + "/ts/generated/messages.gen.ts";
const tsSerFile = __dirname + "/ts/generated/messages.gen.ser.ts";
const tsDeserFile = __dirname + "/ts/generated/messages.gen.deser.ts";
const rustFile = __dirname + "/src/messages_gen.rs";

const rustContent = `use serde::{Deserialize, Serialize};

${schema2rust(types).join("\n")}
`;

const tsContent = `
${schema2ts(types).join("\n\n")}
`;

const tsSerContent = `
${ast2ts(
  schema2serializers({
    entries: types,
    typesDeclarationFile: `./messages.gen`
  })
).join("\n\n")}
`;

const tsDeserContent = `
${ast2ts(
  schema2deserializers({
    entries: types,
    typesDeclarationFile: `./messages.gen`
  })
).join("\n\n")}
`;

const pretty = (content: string) =>
  format(content, {
    parser: "typescript"
  });
// const pretty = (content: string) => content;

fs.writeFileSync(rustFile, rustContent);
fs.writeFileSync(tsFile, pretty(tsContent));
fs.writeFileSync(tsSerFile, pretty(tsSerContent));
fs.writeFileSync(tsDeserFile, pretty(tsDeserContent));
