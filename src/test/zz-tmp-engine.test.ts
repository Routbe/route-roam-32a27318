// @vitest-environment node
import { it, expect } from "vitest";
it("engine", async () => {
  const t0 = Date.now();
  const e = await import("@/lib/crypto-enclave/opaque-engine");
  console.log("import ms", Date.now() - t0);
  const s = await e.serverSetupNew();
  console.log("setup", s.length, Date.now() - t0);
  expect(s.length).toBe(128);
}, 120_000);
