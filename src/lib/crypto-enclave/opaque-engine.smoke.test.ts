// @vitest-environment node
import { it, expect } from "vitest";
import * as E from "./opaque-engine";
const enc = new TextEncoder();
it("smoke", async () => {
  const setup = await E.serverSetupNew();
  console.log("setup len", setup.length);
  const pw = enc.encode("correct horse battery staple");
  const cred = enc.encode("cred-1");
  const rs = await E.clientRegisterStart(pw);
  console.log("reg state", rs.state.length);
  const resp = await E.serverRegisterStart(setup, rs.request, cred);
  let t = Date.now();
  const fin = await E.clientRegisterFinish(pw, rs.state, resp);
  console.log("register finish ms", Date.now() - t);
  const record = await E.serverRegisterFinish(fin.upload);
  const ls = await E.clientLoginStart(pw);
  console.log("login state", ls.state.length);
  const s1 = await E.serverLoginStart(setup, record, ls.ke1, cred, "ctx");
  console.log("server state", s1.state.length);
  t = Date.now();
  const lf = await E.clientLoginFinish(pw, ls.state, s1.ke2, "ctx");
  console.log("login finish ms", Date.now() - t);
  const sk = await E.serverLoginFinish(s1.state, lf.ke3, "ctx");
  expect(sk).toEqual(lf.sessionKey);
  expect(lf.exportKey).toEqual(fin.exportKey);
  expect(E.lastEngineMemoryForTest()!.every((b) => b === 0)).toBe(true);
}, 60000);
