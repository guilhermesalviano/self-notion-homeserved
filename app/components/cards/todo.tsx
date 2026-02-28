"use client";
import { useState } from "react";

import SectionTitle from "../sectionTitle";
import Card from "./card";

const mockTodos = [
  { id: 1, text: "Revisar pull request do auth module", done: false, priority: "high" },
  { id: 2, text: "Enviar proposta para cliente", done: true, priority: "high" },
  { id: 3, text: "Pagar fatura do cartão", done: false, priority: "medium" },
  { id: 4, text: "Academia", done: true, priority: "low" },
  { id: 5, text: "Comprar café", done: false, priority: "low" },
];


export default function TodoCard() {
  const [todos, setTodos] = useState(mockTodos);
  const [input, setInput] = useState("");

  const toggle = (id: number) =>
    setTodos((t) => t.map((item) => item.id === id ? { ...item, done: !item.done } : item));

  const add = () => {
    if (!input.trim()) return;
    setTodos((t) => [...t, { id: Date.now(), text: input.trim(), done: false, priority: "medium" }]);
    setInput("");
  };

  const priorityColor: Record<string, string> = { high: "#FCA5A5", medium: "#FDE68A", low: "#6EE7B7" };

  return (
    <Card>
      <SectionTitle>✅ Tarefas do Dia</SectionTitle>
      <div className="todo-input-row">
        <input
          className="todo-input"
          placeholder="Nova tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button className="todo-add-btn" onClick={add}>+</button>
      </div>
      <div className="todo-list">
        {todos.map((t) => (
          <div key={t.id} className={`todo-item ${t.done ? "done" : ""}`} onClick={() => toggle(t.id)}>
            <div className="todo-checkbox">{t.done ? "✓" : ""}</div>
            <span className="todo-text">{t.text}</span>
            <div className="todo-dot" style={{ background: priorityColor[t.priority] }} />
          </div>
        ))}
      </div>
      <div className="todo-summary">
        {todos.filter((t) => t.done).length}/{todos.length} concluídas
      </div>
    </Card>
  );
}