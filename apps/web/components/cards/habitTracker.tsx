"use client";

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  completions: Record<string, boolean>; // ISO date string → done
  streak: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TODAY = new Date().toISOString().split("T")[0];

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
}

function calcStreak(completions: Record<string, boolean>): number {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().split("T")[0];
    if (completions[key]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

function shortDay(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en", { weekday: "short" });
}

function shortDate(iso: string): string {
  return new Date(iso + "T12:00:00").getDate().toString();
}

// ─── Palette options ──────────────────────────────────────────────────────────
const COLORS = [
  { bg: "bg-rose-400",    ring: "ring-rose-400",    dot: "#fb7185" },
  { bg: "bg-amber-400",   ring: "ring-amber-400",   dot: "#fbbf24" },
  { bg: "bg-emerald-400", ring: "ring-emerald-400", dot: "#34d399" },
  { bg: "bg-sky-400",     ring: "ring-sky-400",     dot: "#38bdf8" },
  { bg: "bg-violet-400",  ring: "ring-violet-400",  dot: "#a78bfa" },
  { bg: "bg-pink-400",    ring: "ring-pink-400",    dot: "#f472b6" },
];

const EMOJIS = ["🏃", "📚", "💧", "🧘", "🍎", "💪", "🌿", "✍️", "🎯", "😴"];

const DEFAULT_HABITS: Habit[] = [
  { id: "1", name: "Wakeup early",      emoji: "🛌", color: "0", completions: {}, streak: 0 },
  // { id: "2", name: "Read 30 min",    emoji: "📚", color: "1", completions: {}, streak: 0 },
  // { id: "3", name: "Drink 2L water", emoji: "💧", color: "3", completions: {}, streak: 0 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function HabitRow({
  habit,
  days,
  onToggle,
  onDelete,
}: {
  habit: Habit;
  days: string[];
  onToggle: (id: string, day: string) => void;
  onDelete: (id: string) => void;
}) {
  const color = COLORS[parseInt(habit.color) % COLORS.length];
  const todayDone = habit.completions[TODAY];

  return (
    <div
      className={`
        group relative flex items-center gap-3 rounded-2xl px-4 py-3
        bg-white/5 border border-white/10 backdrop-blur-sm
        transition-all duration-300
        ${todayDone ? "border-white/20 bg-white/10" : "hover:bg-white/8"}
      `}
    >
      {/* Emoji + name */}
      <div className="flex items-center gap-2 w-40 shrink-0">
        <span className="text-xl">{habit.emoji}</span>
        <span className="text-sm font-medium text-white/80 truncate">{habit.name}</span>
      </div>

      {/* Day dots */}
      <div className="flex gap-2 flex-1 justify-center">
        {days.map((day) => {
          const done = habit.completions[day];
          const isToday = day === TODAY;
          return (
            <button
              key={day}
              onClick={() => onToggle(habit.id, day)}
              title={`${shortDay(day)} ${shortDate(day)}`}
              className={`
                relative flex flex-col items-center gap-0.5
                transition-all duration-200 active:scale-90
              `}
            >
              <span className={`text-[9px] font-semibold tracking-widest uppercase ${isToday ? "text-white/90" : "text-white/30"}`}>
                {shortDay(day)}
              </span>
              <div
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center
                  border-2 transition-all duration-200
                  ${done
                    ? `${color.bg} border-transparent shadow-lg`
                    : isToday
                      ? `border-white/40 hover:border-white/70`
                      : `border-white/15 hover:border-white/30`
                  }
                `}
              >
                {done && <span className="text-white text-xs">✓</span>}
                {!done && isToday && <span className="text-white/50 text-xs">○</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Streak */}
      <div className="shrink-0 w-14 text-right">
        {habit.streak > 0 ? (
          <span className={`text-xs font-bold ${color.bg.replace("bg-", "text-")} tabular-nums`}>
            🔥 {habit.streak}
          </span>
        ) : (
          <span className="text-xs text-white/20">—</span>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(habit.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-rose-400 text-xs ml-1"
        title="Remove habit"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Add Habit Modal ──────────────────────────────────────────────────────────
function AddHabitModal({ onAdd, onClose }: { onAdd: (h: Omit<Habit, "id" | "completions" | "streak">) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [color, setColor] = useState("0");

  function handleSubmit() {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), emoji, color });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1a1a2e] border border-white/15 rounded-3xl p-6 w-80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold text-lg mb-4 font-[family-name:var(--font-display)]">New habit</h3>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Habit name…"
          className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/40 mb-4"
        />

        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Pick an emoji</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`text-xl w-9 h-9 rounded-lg flex items-center justify-center transition-all ${emoji === e ? "bg-white/20 scale-110" : "hover:bg-white/10"}`}
            >
              {e}
            </button>
          ))}
        </div>

        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Color</p>
        <div className="flex gap-2 mb-6">
          {COLORS.map((c, i) => (
            <button
              key={i}
              onClick={() => setColor(i.toString())}
              className={`w-6 h-6 rounded-full ${c.bg} transition-all ${color === i.toString() ? "ring-2 ring-white ring-offset-2 ring-offset-[#1a1a2e] scale-110" : ""}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-white/15 text-white/50 text-sm hover:bg-white/5 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-2 rounded-xl bg-white text-[#1a1a2e] text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-30"
          >
            Add habit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window === "undefined") return DEFAULT_HABITS;
    try {
      const stored = localStorage.getItem("habit-tracker-v1");
      return stored ? JSON.parse(stored) : DEFAULT_HABITS;
    } catch {
      return DEFAULT_HABITS;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const days = getLast7Days();

  // Persist
  useEffect(() => {
    localStorage.setItem("habit-tracker-v1", JSON.stringify(habits));
  }, [habits]);

  function toggleDay(id: string, day: string) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const completions = { ...h.completions, [day]: !h.completions[day] };
        return { ...h, completions, streak: calcStreak(completions) };
      })
    );
  }

  function addHabit(data: Omit<Habit, "id" | "completions" | "streak">) {
    const newHabit: Habit = {
      ...data,
      id: Date.now().toString(),
      completions: {},
      streak: 0,
    };
    setHabits((prev) => [...prev, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  const todayDoneCount = habits.filter((h) => h.completions[TODAY]).length;
  const pct = habits.length > 0 ? Math.round((todayDoneCount / habits.length) * 100) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .habit-tracker { font-family: 'DM Sans', sans-serif; }
        .habit-tracker .font-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <div className="habit-tracker min-h-screen bg-[#0d0d1a] p-6 md:p-10">
        {/* Background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-white leading-tight">
                Daily habits
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {new Date().toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Progress ring (today) */}
            <div className="flex flex-col items-center">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="22"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${2 * Math.PI * 22 * (1 - pct / 100)}`}
                  transform="rotate(-90 28 28)"
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
                <text x="28" y="33" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="DM Sans">
                  {pct}%
                </text>
              </svg>
              <span className="text-white/30 text-[10px] mt-1">today</span>
            </div>
          </div>

          {/* Habit list */}
          <div className="flex flex-col gap-2">
            {habits.length === 0 && (
              <div className="text-center py-16 text-white/25 text-sm">
                No habits yet — add your first one below.
              </div>
            )}
            {habits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                days={days}
                onToggle={toggleDay}
                onDelete={deleteHabit}
              />
            ))}
          </div>

          {/* Add button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 w-full py-3 rounded-2xl border-2 border-dashed border-white/15 text-white/30 text-sm
              hover:border-white/30 hover:text-white/60 hover:bg-white/5
              transition-all duration-200 active:scale-[0.98]"
          >
            + Add habit
          </button>

          {/* Weekly summary bar */}
          {habits.length > 0 && (
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Week overview</p>
              <div className="flex gap-1.5">
                {days.map((day) => {
                  const doneCount = habits.filter((h) => h.completions[day]).length;
                  const ratio = doneCount / habits.length;
                  const isToday = day === TODAY;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full h-12 bg-white/5 rounded-lg overflow-hidden flex items-end">
                        <div
                          className={`w-full rounded-lg transition-all duration-500 ${isToday ? "bg-violet-400" : "bg-white/25"}`}
                          style={{ height: `${Math.max(ratio * 100, ratio > 0 ? 10 : 0)}%` }}
                        />
                      </div>
                      <span className={`text-[9px] font-semibold ${isToday ? "text-violet-300" : "text-white/25"}`}>
                        {shortDay(day).slice(0, 1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && <AddHabitModal onAdd={addHabit} onClose={() => setShowModal(false)} />}
    </>
  );
}