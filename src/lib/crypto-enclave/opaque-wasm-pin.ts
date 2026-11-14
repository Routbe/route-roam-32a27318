/**
 * SHA-384 of the committed OPAQUE + Argon2id engine
 * (src/lib/crypto-enclave/wasm/rout-opaque.wasm), built deterministically by
 * wasm/rout-opaque/build.sh (rustc 1.95.0, Cargo.lock). The loader refuses any
 * other bytes before compiling; CI rebuilds from source and compares (F.2).
 */
export const ROUT_OPAQUE_WASM_SHA384 = "83181a43c2d79ea6fc5b3dc396fd7ef40fc1d7f917c95f719efb59a2e8dcf3dca1db437aad798a405c053990e5a216b6";
