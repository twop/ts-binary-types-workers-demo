export type Packet = Array<Payload> & { type: "Packet" };

export const Packet = (
  val: Array<Payload>
): Array<Payload> & { type: "Packet" } => val as any;

export interface Payload {
  str: (string) | undefined;
  f64: (number) | undefined;
  tuple: (BoolI32) | undefined;
  union: (VariantPayload) | undefined;
  structField: (NestedPayload) | undefined;
}

export type VariantPayload =
  | { tag: "unit" }
  | { tag: "val"; value: NestedPayload };

export module VariantPayload {
  export const unit: VariantPayload = { tag: "unit" };

  export const val = (value: NestedPayload): VariantPayload => ({
    tag: "val",
    value
  });
}

export interface NestedPayload {
  bool: boolean;
  i32vec: Array<number>;
}

export interface BoolI32 {
  0: boolean;
  1: number;
  length: 2;
}

export const BoolI32 = (p0: boolean, p1: number): BoolI32 => [p0, p1];
