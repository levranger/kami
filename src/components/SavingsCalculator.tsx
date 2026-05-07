"use client";

import { useState } from "react";
import { BOOKING_URL } from "@/data/constants";

const LASER_COST = 1200;

export default function SavingsCalculator() {
  const [method, setMethod] = useState<"waxing" | "shaving" | "both">("waxing");
  const [waxSessions, setWaxSessions] = useState(1);
  const [waxCost, setWaxCost] = useState(60);
  const [shavingCost, setShavingCost] = useState(20);
  const [years, setYears] = useState(3);

  const waxingTotal = ["waxing", "both"].includes(method) ? waxSessions * waxCost * 12 * years : 0;
  const shavingTotal = ["shaving", "both"].includes(method) ? shavingCost * 12 * years : 0;
  const currentTotal = waxingTotal + shavingTotal;
  const savings = currentTotal - LASER_COST;

  return (
    <div className="bg-white border border-warm-border rounded-sm p-6 md:p-8">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
        Hair Removal Savings Calculator
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-8">
        See how much you could save by switching to laser hair removal.
      </p>

      <div className="space-y-6">
        {/* Method */}
        <div>
          <label className="font-inter text-sm font-semibold text-[#1A1A1A] block mb-2">
            Current hair removal method
          </label>
          <div className="flex gap-2 flex-wrap">
            {(["waxing", "shaving", "both"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`font-inter text-sm px-4 py-2 rounded-none border transition-colors duration-200 capitalize ${
                  method === m
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white text-[#1A1A1A] border-warm-border hover:border-[#1A1A1A]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Waxing inputs */}
        {["waxing", "both"].includes(method) && (
          <>
            <div>
              <label className="font-inter text-sm font-semibold text-[#1A1A1A] block mb-1">
                Waxing sessions per month: <span className="text-gold">{waxSessions}</span>
              </label>
              <input
                type="range" min={1} max={4} value={waxSessions}
                onChange={(e) => setWaxSessions(Number(e.target.value))}
                className="w-full accent-[#C9A96E]"
              />
              <div className="flex justify-between font-inter text-xs text-warm-gray mt-1">
                <span>1</span><span>4</span>
              </div>
            </div>
            <div>
              <label className="font-inter text-sm font-semibold text-[#1A1A1A] block mb-1">
                Cost per waxing session: <span className="text-gold">${waxCost}</span>
              </label>
              <input
                type="range" min={30} max={150} step={5} value={waxCost}
                onChange={(e) => setWaxCost(Number(e.target.value))}
                className="w-full accent-[#C9A96E]"
              />
              <div className="flex justify-between font-inter text-xs text-warm-gray mt-1">
                <span>$30</span><span>$150</span>
              </div>
            </div>
          </>
        )}

        {/* Shaving inputs */}
        {["shaving", "both"].includes(method) && (
          <div>
            <label className="font-inter text-sm font-semibold text-[#1A1A1A] block mb-1">
              Razors & products per month: <span className="text-gold">${shavingCost}</span>
            </label>
            <input
              type="range" min={5} max={50} step={5} value={shavingCost}
              onChange={(e) => setShavingCost(Number(e.target.value))}
              className="w-full accent-[#C9A96E]"
            />
            <div className="flex justify-between font-inter text-xs text-warm-gray mt-1">
              <span>$5</span><span>$50</span>
            </div>
          </div>
        )}

        {/* Years */}
        <div>
          <label className="font-inter text-sm font-semibold text-[#1A1A1A] block mb-2">
            Calculate over
          </label>
          <div className="flex gap-2">
            {[1, 3, 5, 10].map((y) => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={`font-inter text-sm px-4 py-2 rounded-none border transition-colors duration-200 ${
                  years === y
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white text-[#1A1A1A] border-warm-border hover:border-[#1A1A1A]"
                }`}
              >
                {y}yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 bg-[#1A1A1A] rounded-sm p-6 space-y-3">
        <div className="flex justify-between font-inter text-sm text-white/70">
          <span>Current method ({years} yr{years > 1 ? "s" : ""})</span>
          <span>${currentTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-inter text-sm text-white/70">
          <span>Laser package (one-time)</span>
          <span>${LASER_COST.toLocaleString()}</span>
        </div>
        <div className="border-t border-white/10 pt-3">
          {savings > 0 ? (
            <>
              <p className="font-inter text-xs text-white/50 uppercase tracking-widest mb-1">You save</p>
              <p className="font-playfair text-4xl font-bold text-gold">
                ${savings.toLocaleString()}
              </p>
              <p className="font-inter text-sm text-white/50 mt-1">over {years} year{years > 1 ? "s" : ""}</p>
            </>
          ) : (
            <p className="font-inter text-sm text-white/60">
              Adjust your inputs — laser pays off quickly with regular waxing or shaving.
            </p>
          )}
        </div>
      </div>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block w-full text-center bg-[#1A1A1A] hover:bg-gold text-white font-inter text-sm tracking-wider px-6 py-3 transition-colors duration-300"
      >
        Book Your Free Consultation
      </a>
    </div>
  );
}
