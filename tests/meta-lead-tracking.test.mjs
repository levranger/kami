import test from "node:test";
import assert from "node:assert/strict";

const id = "12345678-1234-4234-8234-123456789abc";
let instance = 0;
async function setup({ enabled = true, privacy = false, dnt = false, storageThrows = false } = {}) {
  process.env.NEXT_PUBLIC_META_LEAD_TRACKING = String(enabled);
  const store = new Map();
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: {
    globalPrivacyControl: privacy, doNotTrack: dnt ? "1" : null,
  } });
  globalThis.window = { localStorage: {
    getItem(key) { if (storageThrows) throw Error("blocked"); return store.get(key) ?? null; },
    setItem(key, value) { if (storageThrows) throw Error("blocked"); store.set(key, value); },
  } };
  const m = await import(`../src/lib/metaLeadTracking.ts?test=${++instance}`);
  return { m, store };
}

test("feature is off by default / disabled: no pixel initialization or event", async () => {
  const { m } = await setup({ enabled: false });
  m.setMetaConsent("granted");
  assert.equal(m.initializeMetaQueue(), false);
  assert.equal(m.trackMetaLead(id), false);
  assert.equal(window.fbq, undefined);
});

test("no consent and declined consent both refuse measurement", async () => {
  const { m } = await setup();
  assert.equal(m.getMetaConsent(), "unset");
  assert.equal(m.trackMetaLead(id), false);
  m.setMetaConsent("denied");
  assert.equal(m.trackMetaLead(id), false);
  assert.equal(window.fbq, undefined);
});

test("manual-only initialization; successful lead has no custom data and deduplicates", async () => {
  const { m } = await setup();
  m.setMetaConsent("granted");
  assert.equal(m.initializeMetaQueue(), true);
  assert.deepEqual(window.fbq.queue, [
    ["consent", "grant"],
    ["set", "autoConfig", false, m.META_PIXEL_ID],
    ["init", m.META_PIXEL_ID],
  ]);
  assert.equal(m.trackMetaLead(id), true);
  assert.equal(m.trackMetaLead(id), false);
  const events = window.fbq.queue.filter(args => args[0] === "trackSingle");
  assert.deepEqual(events, [["trackSingle", m.META_PIXEL_ID, "Lead", {}, { eventID: id }]]);
  assert.equal(window.fbq.queue.some(args => ["PageView", "Purchase", "Schedule", "ViewContent"].includes(args[2])), false);
});

test("rejects arbitrary identifiers and does not initialize for them", async () => {
  const { m } = await setup();
  m.setMetaConsent("granted");
  for (const bad of ["", "lhr_123", "name@example.com", "Brazilian", "2026-09-25"]) {
    assert.equal(m.trackMetaLead(bad), false);
  }
  assert.equal(window.fbq, undefined);
});

test("withdrawal removes unsent events; later permission reinitializes without replay", async () => {
  const { m } = await setup();
  m.setMetaConsent("granted");
  m.trackMetaLead(id);
  m.setMetaConsent("denied");
  assert.deepEqual(window.fbq.queue, [["consent", "revoke"]]);
  assert.equal(m.trackMetaLead(id), false);
  m.setMetaConsent("granted");
  m.initializeMetaQueue();
  assert.ok(window.fbq.queue.some(args => args[0] === "init"));
  assert.equal(m.trackMetaLead(id), false);
  assert.equal(window.fbq.queue.some(args => args[0] === "trackSingle"), false);
});

test("GPC and Do Not Track override an allow choice", async () => {
  for (const signal of [{ privacy: true }, { dnt: true }]) {
    const { m } = await setup(signal);
    assert.equal(m.setMetaConsent("granted"), "denied");
    assert.equal(m.trackMetaLead(id), false);
    assert.equal(window.fbq, undefined);
  }
});

test("storage denial does not break the page or erase an in-memory choice", async () => {
  const { m } = await setup({ storageThrows: true });
  assert.equal(m.getMetaConsent(), "unset");
  m.setMetaConsent("granted");
  assert.equal(m.trackMetaLead(id), true);
});

test("expired / malformed stored permission is not accepted", async () => {
  const { m, store } = await setup();
  store.set("kami_meta_measurement_v1", JSON.stringify({ choice: "granted", at: 0 }));
  assert.equal(m.getMetaConsent(), "unset");
  store.set("kami_meta_measurement_v1", "broken");
  assert.equal(m.getMetaConsent(), "unset");
});

test("cleared or expired consent cannot fall back to an earlier in-memory grant", async () => {
  const { m, store } = await setup();
  m.setMetaConsent("granted");
  store.delete("kami_meta_measurement_v1");
  assert.equal(m.getMetaConsent(), "unset");
  assert.equal(m.trackMetaLead(id), false);
  store.set("kami_meta_measurement_v1", JSON.stringify({ choice: "granted", at: 0 }));
  assert.equal(m.getMetaConsent(), "unset");
});

test("a failing SDK does not throw into the booking flow", async () => {
  const { m } = await setup();
  m.setMetaConsent("granted");
  m.initializeMetaQueue();
  window.fbq.callMethod = () => { throw Error("ad blocker / SDK failure"); };
  assert.doesNotThrow(() => assert.equal(m.trackMetaLead(id), false));
});
