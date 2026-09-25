import test from "node:test";
import assert from "node:assert/strict";
import { submitBookingRequest } from "../src/google-ads-flows/laser-hair-removal/lib/bookingApi.ts";

test("only a successful saved-request response resolves", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({ success: true }), { status: 200 });
    const result = await submitBookingRequest({});
    assert.match(result.bookingRequestId, /^lhr_/);
    for (const [status, body] of [[500, { success: false }], [200, { success: false }], [200, {}]]) {
      globalThis.fetch = async () => new Response(JSON.stringify(body), { status });
      await assert.rejects(submitBookingRequest({}));
    }
    globalThis.fetch = async () => new Response("not JSON", { status: 200 });
    await assert.rejects(submitBookingRequest({}));
  } finally { globalThis.fetch = original; }
});
