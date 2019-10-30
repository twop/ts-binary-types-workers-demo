use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Packet(pub Vec<Payload>);

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Payload {
    pub str: Option<String>,
    pub f64: Option<f64>,
    pub tuple: Option<BoolI32>,
    pub union: Option<VariantPayload>,
    #[serde(rename = "structField")]
    pub struct_field: Option<NestedPayload>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum VariantPayload {
    unit,
    val(NestedPayload),
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct NestedPayload {
    pub bool: bool,
    pub i32vec: Vec<i32>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct BoolI32(pub bool, pub i32);
