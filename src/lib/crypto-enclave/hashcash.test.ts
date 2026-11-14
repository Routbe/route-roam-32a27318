import { describe, expect, it } from "vitest";
import { fc, test as fcTest } from "@fast-check/vitest";
import { leadingZeroBits, powDigest, searchPow, solvePow, verifyPow } from "./hashcash";

describe("Hashcash (rout.pow.v1)", () => {
  it("counts leading zero bits exactly", () => {
    expect(leadingZeroBits(Uint8Array.of(0, 0, 0x80))).toBe(16);
    expect(leadingZeroBits(Uint8Array.of(0, 0x01))).toBe(15);
    expect(leadingZeroBits(Uint8Array.of(0xff))).toBe(0);
    expect(leadingZeroBits(new Uint8Array(4))).toBe(32);
  });

  fcTest.prop([fc.uint8Array({ minLength: 32, maxLength: 32 })], { numRuns: 20 })("a solution verifies and a flipped bit does not cheat", (challenge) => {
    const nonce = solvePow(challenge, 12, 1);
    expect(verifyPow(challenge, nonce, 12)).toBe(true);
    expect(leadingZeroBits(powDigest(challenge, nonce))).toBeGreaterThanOrEqual(12);
    const other = challenge.slice();
    other[0] = (other[0] ?? 0) ^ 1;
    // Bound to the challenge: the same nonce almost never meets 12 bits for another one.
    expect(verifyPow(other, nonce, 12) && leadingZeroBits(powDigest(other, nonce)) < 12).toBe(false);
  });

  it("rejects malformed inputs and the server floor", () => {
    expect(verifyPow(new Uint8Array(31), new Uint8Array(8), 1)).toBe(false);
    expect(verifyPow(new Uint8Array(32), new Uint8Array(7), 1)).toBe(false);
    expect(() => solvePow(new Uint8Array(32), 8)).toThrow();
    expect(searchPow(new Uint8Array(32), 26, 0, 4)).toBeNull();
  });
});
