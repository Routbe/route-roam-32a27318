/**
 * SHA-384 of the committed OPAQUE + Argon2id engine
 * (src/lib/crypto-enclave/wasm/rout-opaque.wasm), built deterministically by
 * wasm/rout-opaque/build.sh (rustc 1.95.0, Cargo.lock). The loader refuses any
 * other bytes before compiling; CI rebuilds from source and compares (F.2).
 */
export const ROUT_OPAQUE_WASM_SHA384 = "397d8bc8b20c664f9be4c3afb3d5839002f2d06cdb8e2f15cbca043c425f5a4f9656fd522f99587835053d593abe4de8";
