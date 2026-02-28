"use client";

import SectionTitle from "../sectionTitle";
import Card from "./card";

const mockGoals = [
  { id: 1, label: "Reserva de Emergência", current: 18000, target: 30000, color: "#6EE7B7" },
  { id: 2, label: "Viagem para Europa", current: 4500, target: 12000, color: "#93C5FD" },
  { id: 3, label: "Curso de inglês", current: 8, target: 12, unit: "meses", color: "#FDE68A" },
];

export default function GoalsCard() {
  return (
    <Card>
      <SectionTitle>🎯 Metas</SectionTitle>
      <div className="goals-list">
        {mockGoals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <div key={g.id} className="goal-item">
              <div className="goal-header">
                <span className="goal-label">{g.label}</span>
                <span className="goal-pct" style={{ color: g.color }}>{pct}%</span>
              </div>
              <div className="goal-bar-bg">
                <div
                  className="goal-bar-fill"
                  style={{ width: `${pct}%`, background: g.color }}
                />
              </div>
              <div className="goal-values">
                <span>
                  {g.unit ? g.current : `R$ ${g.current.toLocaleString("pt-BR")}`}
                  {g.unit ? ` ${g.unit}` : ""}
                </span>
                <span style={{ opacity: 0.4 }}>
                  {g.unit ? g.target : `R$ ${g.target.toLocaleString("pt-BR")}`}
                  {g.unit ? ` ${g.unit}` : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}