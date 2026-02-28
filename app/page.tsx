"use client";
import { useState, useEffect } from "react";
import WeatherCard from "./components/cards/weather";
import CalendarCard from "./components/cards/calendar";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockNews = [
  { id: 1, source: "Valor Econômico", title: "Selic mantida em 10,5% pelo Copom pela terceira reunião", tag: "MACRO" },
  { id: 2, source: "TechCrunch", title: "OpenAI anuncia novo modelo GPT-5 com raciocínio avançado", tag: "TECH" },
  { id: 3, source: "Folha", title: "Brasil registra superávit primário de R$12bi em outubro", tag: "BRASIL" },
  { id: 4, source: "Reuters", title: "S&P 500 atinge nova máxima histórica impulsionado por tech", tag: "MERCADO" },
];

const mockStocks = [
  { ticker: "PETR4", price: 38.72, change: +1.23, pct: +3.28 },
  { ticker: "VALE3", price: 62.10, change: -0.88, pct: -1.40 },
  { ticker: "MGLU3", price: 9.45, change: +0.32, pct: +3.50 },
  { ticker: "BTC", price: 98420, change: +1820, pct: +1.89 },
  { ticker: "AAPL", price: 189.30, change: -0.55, pct: -0.29 },
];

const mockFlights = [
  { route: "GRU → LIS", date: "10 Jan", price: "R$ 3.240", airline: "TAP", trend: "▼" },
  { route: "GRU → MIA", date: "15 Jan", price: "R$ 4.100", airline: "LATAM", trend: "▲" },
  { route: "CGH → REC", date: "12 Jan", price: "R$ 580", airline: "GOL", trend: "▼" },
];

const mockProducts = [
  { name: 'iPhone 16 Pro 256GB', price: "R$ 9.499", store: "Apple Store", alert: true },
  { name: "Sony WH-1000XM5", price: "R$ 1.899", store: "Amazon", alert: false },
  { name: "MacBook Air M3", price: "R$ 12.799", store: "Kabum", alert: true },
];

const mockGoals = [
  { id: 1, label: "Reserva de Emergência", current: 18000, target: 30000, color: "#6EE7B7" },
  { id: 2, label: "Viagem para Europa", current: 4500, target: 12000, color: "#93C5FD" },
  { id: 3, label: "Curso de inglês", current: 8, target: 12, unit: "meses", color: "#FDE68A" },
];

const mockAlerts = [
  { id: 1, type: "price_drop", msg: "iPhone 16 Pro caiu R$ 300 na Kabum!", icon: "🔔", time: "há 2h" },
  { id: 2, type: "flight", msg: "Passagem GRU→LIS abaixo de R$ 3.500 disponível", icon: "✈️", time: "há 5h" },
  { id: 3, type: "stock", msg: "PETR4 ultrapassou alvo de R$ 38,00", icon: "📈", time: "há 1h" },
];

const mockTodos = [
  { id: 1, text: "Revisar pull request do auth module", done: false, priority: "high" },
  { id: 2, text: "Enviar proposta para cliente", done: true, priority: "high" },
  { id: 3, text: "Pagar fatura do cartão", done: false, priority: "medium" },
  { id: 4, text: "Academia", done: true, priority: "low" },
  { id: 5, text: "Comprar café", done: false, priority: "low" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const Card = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`card ${className}`} style={style}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="section-title">{children}</h2>
);


function StocksCard() {
  return (
    <Card>
      <SectionTitle>📊 Ativos</SectionTitle>
      <div className="stocks-list">
        {mockStocks.map((s) => (
          <div key={s.ticker} className="stock-row">
            <span className="stock-ticker">{s.ticker}</span>
            <span className="stock-price">
              {s.ticker === "BTC"
                ? `$${s.price.toLocaleString("pt-BR")}`
                : s.ticker === "AAPL"
                ? `$${s.price}`
                : `R$ ${s.price.toFixed(2)}`}
            </span>
            <span className={`stock-change ${s.change >= 0 ? "pos" : "neg"}`}>
              {s.change >= 0 ? "+" : ""}{s.pct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NewsCard() {
  return (
    <Card>
      <SectionTitle>📰 Últimas Notícias</SectionTitle>
      <div className="news-list">
        {mockNews.map((n) => (
          <div key={n.id} className="news-item">
            <span className="news-tag">{n.tag}</span>
            <div>
              <div className="news-title">{n.title}</div>
              <div className="news-source">{n.source}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FlightsCard() {
  return (
    <Card>
      <SectionTitle>✈️ Passagens Monitoradas</SectionTitle>
      <div className="flights-list">
        {mockFlights.map((f, i) => (
          <div key={i} className="flight-row">
            <div>
              <div className="flight-route">{f.route}</div>
              <div className="flight-meta">{f.date} · {f.airline}</div>
            </div>
            <div className="flight-price">
              {f.price} <span style={{ opacity: 0.5 }}>{f.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProductsCard() {
  return (
    <Card>
      <SectionTitle>🛒 Preços Monitorados</SectionTitle>
      <div className="products-list">
        {mockProducts.map((p, i) => (
          <div key={i} className="product-row">
            <div>
              <div className="product-name">{p.name}</div>
              <div className="product-store">{p.store}</div>
            </div>
            <div className="product-right">
              <div className="product-price">{p.price}</div>
              {p.alert && <div className="product-alert">🔔 alerta ativo</div>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function GoalsCard() {
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

function AlertsCard() {
  return (
    <Card className="alerts-card">
      <SectionTitle>🔔 Alertas Ativos</SectionTitle>
      <div className="alerts-list">
        {mockAlerts.map((a) => (
          <div key={a.id} className="alert-item">
            <span className="alert-icon">{a.icon}</span>
            <div className="alert-content">
              <div className="alert-msg">{a.msg}</div>
              <div className="alert-time">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TodoCard() {
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

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const timeStr = time.toLocaleTimeString("pt-BR", { 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit" 
  });

  const isLive = !!true;
  const statusColor = isLive ? "#6EE7B7" : "#F87171";
  const statusText = isLive ? "all systems live" : "systems partially down";

  return (
    <>
      <div className="header">
        <div className="header-brand">⬡ CTRL Dashboard</div>
        <div className="header-clock">{(!mounted) ? "loading" : timeStr}</div>
        <div className="header-status w-44">
          <span className="status-dot" style={{ background: statusColor }} />
          {statusText}
        </div>
      </div>

      <div className="grid">
        {/* Row 1 */}
        <div className="col-4">
          <WeatherCard />
        </div>
        <div className="col-4">
          <CalendarCard  />
        </div>
        <div className="col-4">
          <AlertsCard />
        </div>

        {/* Row 2 */}
        <div className="col-3">
          <StocksCard />
        </div>
        <div className="col-5">
          <NewsCard />
        </div>
        <div className="col-4">
          <GoalsCard />
        </div>

        {/* Row 3 */}
        <div className="col-4">
          <FlightsCard />
        </div>
        <div className="col-4">
          <ProductsCard />
        </div>
        <div className="col-4">
          <TodoCard />
        </div>
      </div>
    </>
  );
}