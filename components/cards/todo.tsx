"use client";

import { useEffect, useState } from "react";

import SectionTitle from "../sectionTitle";
import Card from "./card";

export default function TodoCard() {
  const [todos, setTodos] = useState<any>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data.data));
  }, []);

  const toggle = (id: number) =>
    setTodos((t: any[]) => t.map((item) => item.id === id ? { ...item, done: !item.done } : item));

  const add = () => {
    if (!input.trim()) return;
    setTodos((t: any[]) => [...t, { id: Date.now(), text: input.trim(), done: false, priority: "medium" }]);
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
        {todos?.map((t: any) => (
          <div key={t.id} className={`todo-item ${t.done ? "done" : ""}`} onClick={() => toggle(t.id)}>
            <div className="todo-checkbox">{t.done ? "✓" : ""}</div>
            <span className="todo-text">{t.text}</span>
            <div className="todo-dot" style={{ background: priorityColor[t.priority] }} />
          </div>
        ))}
      </div>
      <div className="todo-summary">
        {todos?.filter((t: any) => t.done).length}/{todos?.length} concluídas
      </div>
    </Card>
  );
}