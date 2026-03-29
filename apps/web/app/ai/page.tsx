"use client";

import React, { useState, useCallback } from "react";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/useDashboard";
import { useClock } from "@/components/useClock";
import { AINarrative } from "@/components/aiNarrative";
import { LightningFlash } from "@/components/lightningFlash";
import { RainCanvas } from "@/components/rain";

// ─── Backgrounds ─────────────────────────────────────────────────────────────

function getDayNightBackground(hour: number): string {
  if (hour >= 0 && hour < 5) return "linear-gradient(160deg, #080c14 0%, #060810 60%, #030508 100%)";
  else if (hour < 7) return "linear-gradient(160deg, #0d0c20 0%, #110d22 50%, #09090f 100%)";
  else if (hour < 10) return "linear-gradient(160deg, #2a1a0e 0%, #1a1230 50%, #0b0d18 100%)";
  else if (hour < 17) return "linear-gradient(160deg, #0c1d3a 0%, #0d2040 55%, #081525 100%)";
  else if (hour < 19) return "linear-gradient(160deg, #2a1206 0%, #1a1020 55%, #090b14 100%)";
  else if (hour < 21) return "linear-gradient(160deg, #1a0d1f 0%, #130b1a 55%, #080810 100%)";
  else return "linear-gradient(160deg, #141720 0%, #0b0d11 60%, #080a0e 100%)";
}

function getAtmosphericOverlay(hour: number): string {
  if (hour >= 7 && hour < 10) return "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(180,100,40,0.22) 0%, transparent 70%)";
  else if (hour >= 10 && hour < 17) return "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(40,90,180,0.20) 0%, transparent 70%)";
  else if (hour >= 17 && hour < 19) return "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(200,100,30,0.25) 0%, transparent 70%)";
  else if (hour >= 19 && hour < 20) return "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(120,50,140,0.20) 0%, transparent 70%)";
  else return "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(60,90,140,0.18) 0%, transparent 70%)";
}

// ─── Panel & Label ────────────────────────────────────────────────────────────

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/[0.07] backdrop-blur-sm relative overflow-hidden ${className}`}
    style={{ background: "rgba(255,255,255,0.04)" }}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">{children}</span>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86, 95, 96, 99]);
const isRaining = (code: number) => RAIN_CODES.has(code);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function IdleDashboard() {
  const clock = useClock();
  const router = useRouter();
  const { weather } = useDashboard();
  const [isThundering, setIsThundering] = useState(false);

  const background = getDayNightBackground(clock.hour);
  const atmosphericOverlay = getAtmosphericOverlay(clock.hour);

  const handleClick = useCallback(() => {
    router.push("/");
  }, [router]);

  if (!weather.data || (weather.status === "idle" || weather.status === "loading" || weather.status === "error")) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: getDayNightBackground(clock.hour) }}>
        <button
          onClick={() => router.refresh()}
          className="text-white/30 text-sm hover:text-white/60 transition-colors"
        >
          ↺ reconnect
        </button>
      </div>
    );
  }

  const w = weather.data;
  const raining = isRaining(w.code);

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col"
      style={{
        background,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        transition: "background 2s ease",
      }}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: atmosphericOverlay, transition: "background 2s ease" }}
      />

      {raining && <RainCanvas />}
      {isThundering && <LightningFlash />}

      <div className="relative h-screen z-10 flex justify-center items-center gap-10 p-6!">

        <div className="flex flex-col justify-center gap-2 pl-2">
          <div
            className="font-light text-white leading-none"
            style={{ fontSize: "clamp(64px, 8vw, 96px)", letterSpacing: "-4px", fontFamily: "'DM Mono', monospace" }}
          >
            {clock.h}<span className="text-white/20">:</span>{clock.m}
          </div>
          <div className="text-white/40 text-base font-light tracking-wide">
            {clock.day} &nbsp;|&nbsp; {clock.month} {clock.date}
          </div>
        </div>

        <Panel className="p-6! flex flex-col gap-4! min-w-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40">
              <MapPin size={12} />
              <span className="text-xs">{w.city}, {w.state}</span>
            </div>
            <Label>Live weather</Label>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div
                className="text-6xl font-light text-white"
                style={{ letterSpacing: "-3px", fontFamily: "'DM Mono', monospace" }}
              >
                {w.temp}°
              </div>
              <div className="text-white/50 text-sm mt-1!">{w.condition}</div>
              {/* <div className="flex items-center gap-1 mt-1!">
                <CloudLightning size={13} className="text-yellow-400" />
                <span className="text-white/30 text-xs">Storm approaching</span>
              </div> */}
            </div>

            <div className="relative w-20 h-20 shrink-0">
              <div className="text-6xl">
                {w.icon}
              </div>
            </div>
          </div>

          <AINarrative weather={w} hour={clock.hour} />
        </Panel>
      </div>
    </div>
  );
}