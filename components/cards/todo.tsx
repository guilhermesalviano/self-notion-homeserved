"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../sectionTitle";
import Card from "./card";

type Priority = "high" | "medium" | "low";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
}

interface NewTaskForm {
  text: string;
  priority: Priority;
}

const priorityColor: Record<Priority, string> = {
  high: "#FCA5A5",
  medium: "#FDE68A",
  low: "#6EE7B7",
};

const priorityLabel: Record<Priority, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

function TaskModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (form: NewTaskForm) => void;
}) {
  const [form, setForm] = useState<NewTaskForm>({ text: "", priority: "medium" });

  const handleSubmit = () => {
    if (!form.text.trim()) return;
    onAdd(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4! p-6! flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 px-4 py-2">Nova Tarefa</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <input
            autoFocus
            className="w-full border border-gray-200 rounded-lg px-3! py-2.5! text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            placeholder="Descreva a tarefa..."
            value={form.text}
            onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Prioridade</label>
          <div className="flex gap-2">
            {(["high", "medium", "low"] as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => setForm((f) => ({ ...f, priority: p }))}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2! rounded-lg text-sm font-medium border transition-all ${
                  form.priority === p
                    ? "border-transparent shadow-sm scale-105"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
                style={
                  form.priority === p
                    ? { backgroundColor: priorityColor[p], color: "#374151" }
                    : {}
                }
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: priorityColor[p] }}
                />
                {priorityLabel[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1!">
          <button
            onClick={onClose}
            className="flex-1 py-2.5! rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!form.text.trim()}
            className="flex-1 py-2.5! rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TodoCard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data.data));
  }, []);

  const toggle = (id: number) =>
    setTodos((t) => t.map((item) => item.id === id ? { ...item, done: !item.done } : item));

  const add = (form: NewTaskForm) => {
    setTodos((t) => [...t, { id: Date.now(), text: form.text.trim(), done: false, priority: form.priority }]);
  };

  const done = todos.filter((t) => t.done).length;

  return (
    <>
      {modalOpen && (
        <TaskModal onClose={() => setModalOpen(false)} onAdd={add} />
      )}

      <Card>
        <div className="flex items-center justify-between mb-5!">
          <SectionTitle>✅ Tarefas do Dia</SectionTitle>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3! py-1.5! bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Nova tarefa
          </button>
        </div>

        <div className="todo-list">
          {todos.map((t) => (
            <div
              key={t.id}
              className={`todo-item ${t.done ? "done" : ""}`}
              onClick={() => toggle(t.id)}
            >
              <div className="todo-checkbox">{t.done ? "✓" : ""}</div>
              <span className="todo-text">{t.text}</span>
              <div
                className="todo-dot"
                style={{ background: priorityColor[t.priority] }}
              />
            </div>
          ))}

          {todos.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              Nenhuma tarefa ainda. Crie a primeira!
            </p>
          )}
        </div>

        <div className="todo-summary">
          {done}/{todos.length} concluídas
        </div>
      </Card>
    </>
  );
}