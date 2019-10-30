use wasm_bindgen::prelude::*;
use web_sys::console;
mod messages_gen;
use bincode;

use js_sys::Uint8Array;
// use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // Your code goes here!
    console::log_1(&JsValue::from_str("WASM started"));

    Ok(())
}

#[wasm_bindgen]
pub struct Echo {
    msg_data: Vec<u8>,
    data_size: usize,
}

#[wasm_bindgen]
impl Echo {
    pub fn new() -> Echo {
        Echo {
            msg_data: vec![],
            data_size: 0,
        }
    }
    pub fn allocate_space(&mut self, size: u32) -> Uint8Array {
        let casted_size: usize = size as usize;
        if self.msg_data.len() < casted_size {
            // console::log_2(
            //     &JsValue::from_str("WASM: resized to "),
            //     &JsValue::from_str(&size.to_string()),
            // );
            self.msg_data.resize(casted_size, 0);
        }
        self.data_size = casted_size;
        self.view_memory()
    }

    pub fn handle_message(&mut self) -> Uint8Array {
        let decoded: messages_gen::Packet = bincode::deserialize(&self.msg_data[..]).unwrap();
        let encoded: Vec<u8> = bincode::serialize(&decoded).unwrap();

        // console::log_2(
        //     &JsValue::from_str("WASM: decoded/encoded "),
        //     &JsValue::from_str(&decoded.0.len().to_string()),
        // );

        let enc_len: usize = encoded.len();
        self.data_size = enc_len;

        if self.msg_data.len() <= enc_len {
            self.msg_data = encoded;
        } else {
            self.msg_data[..enc_len].copy_from_slice(&encoded[..]);
        }

        self.view_memory()
    }

    fn view_memory(&self) -> Uint8Array {
        unsafe { Uint8Array::view(&self.msg_data[..self.data_size]) }
    }
}
