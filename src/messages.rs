use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct BoolI32(pub bool, pub i32);

#[derive(Deserialize, Serialize, Debug)]
pub struct NestedPayload {
    pub bool: bool,
    pub i32vec: Vec<i32>,
}

#[derive(Deserialize, Serialize, Debug)]
pub enum VariantPayload {
    Unit,
    Val(NestedPayload),
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Payload {
    pub str: Option<String>,
    pub f64: Option<f64>,
    pub tuple: Option<BoolI32>,
    pub union: Option<VariantPayload>,
    pub struct_field: Option<NestedPayload>,
}

#[derive(Serialize, Deserialize)]
pub struct Packet(pub Vec<Payload>);
