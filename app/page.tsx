"use client";
import { useState, useEffect } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockWeather = {
  city: "São Paulo",
  temp: 24,
  feels: 22,
  condition: "Parcialmente nublado",
  hours: [
    { time: "14h", temp: 24, icon: "⛅" },
    { time: "15h", temp: 25, icon: "☀️" },
    { time: "16h", temp: 23, icon: "🌦️" },
    { time: "17h", temp: 21, icon: "🌧️" },
    { time: "18h", temp: 20, icon: "🌧️" },
    { time: "19h", temp: 19, icon: "🌙" },
  ],
};

const mockCalendar = [
  { id: 1, time: "09:00", title: "Daily standup", color: "#6EE7B7" },
  { id: 2, time: "11:30", title: "Review PR — frontend", color: "#93C5FD" },
  { id: 3, time: "14:00", title: "Call com cliente XYZ", color: "#FCA5A5" },
  { id: 4, time: "16:00", title: "Sprint planning", color: "#FDE68A" },
];

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

function WeatherCard() {
  return (
    <Card className="weather-card">
      <div className="weather-main">
        <div>
          <div className="weather-city">{mockWeather.city}</div>
          <div className="weather-temp">{mockWeather.temp}°</div>
          <div className="weather-condition">{mockWeather.condition}</div>
          <div className="weather-feels">Sensação {mockWeather.feels}°C</div>
        </div>
        <div className="weather-icon-big">🌤</div>
      </div>
      <div className="weather-hours">
        {mockWeather.hours.map((h) => (
          <div key={h.time} className="weather-hour">
            <span className="weather-hour-time">{h.time}</span>
            <span>{h.icon}</span>
            <span className="weather-hour-temp">{h.temp}°</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CalendarCard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  return (
    <Card>
      <SectionTitle>📅 Calendário</SectionTitle>
      <div className="calendar-date">{dateStr}</div>
      <div className="calendar-events">
        {mockCalendar.map((ev) => (
          <div key={ev.id} className="calendar-event" style={{ borderLeft: `3px solid ${ev.color}` }}>
            <span className="event-time">{ev.time}</span>
            <span className="event-title">{ev.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

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

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0d0d0d;
          --surface: #141414;
          --surface2: #1c1c1c;
          --border: #2a2a2a;
          --text: #e8e8e8;
          --muted: #555;
          --accent: #c8f135;
          --font-mono: 'Space Mono', monospace;
          --font-body: 'DM Sans', sans-serif;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          min-height: 100vh;
        }

        /* HEADER */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px;
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          background: rgba(13,13,13,0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
        }
        .header-brand {
          font-family: var(--font-mono);
          font-size: 15px;
          letter-spacing: 0.15em;
          color: var(--accent);
          text-transform: uppercase;
        }
        .header-clock {
          font-family: var(--font-mono);
          font-size: 18px;
          letter-spacing: 0.1em;
          color: var(--text);
        }
        .header-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--muted);
          font-family: var(--font-mono);
        }
        .status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
          padding: 24px 32px;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* CARD */
        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          transition: border-color 0.2s;
        }
        .card:hover {
          border-color: #3a3a3a;
        }

        .section-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
          margin-bottom: 16px;
          font-family: var(--font-mono);
        }

        /* WEATHER */
        .col-4 { grid-column: span 4; }
        .col-3 { grid-column: span 3; }
        .col-5 { grid-column: span 5; }
        .col-6 { grid-column: span 6; }
        .col-7 { grid-column: span 7; }
        .col-8 { grid-column: span 8; }
        .col-12 { grid-column: span 12; }

        .weather-card {
          background: linear-gradient(135deg, #141414 0%, #1a1f14 100%);
        }
        .weather-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .weather-city {
          font-size: 11px;
          color: var(--muted);
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .weather-temp {
          font-size: 56px;
          font-weight: 300;
          line-height: 1;
          color: var(--accent);
          font-family: var(--font-mono);
        }
        .weather-condition {
          font-size: 14px;
          color: var(--text);
          margin-top: 6px;
        }
        .weather-feels {
          font-size: 12px;
          color: var(--muted);
          margin-top: 2px;
        }
        .weather-icon-big {
          font-size: 52px;
          opacity: 0.8;
        }
        .weather-hours {
          display: flex;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .weather-hour {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .weather-hour-time {
          font-size: 10px;
          color: var(--muted);
          font-family: var(--font-mono);
        }
        .weather-hour-temp {
          font-size: 13px;
          color: var(--text);
          font-family: var(--font-mono);
        }

        /* CALENDAR */
        .calendar-date {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 14px;
          text-transform: capitalize;
        }
        .calendar-events {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .calendar-event {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: var(--surface2);
          border-radius: 6px;
          border-left-width: 3px;
          border-left-style: solid;
        }
        .event-time {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          min-width: 38px;
        }
        .event-title {
          font-size: 13px;
          color: var(--text);
        }

        /* STOCKS */
        .stocks-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .stock-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }
        .stock-row:last-child { border-bottom: none; }
        .stock-ticker {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          min-width: 60px;
        }
        .stock-price {
          font-size: 13px;
          color: var(--text);
          font-family: var(--font-mono);
          flex: 1;
          text-align: center;
        }
        .stock-change {
          font-size: 12px;
          font-family: var(--font-mono);
          font-weight: 700;
          min-width: 60px;
          text-align: right;
        }
        .pos { color: #6EE7B7; }
        .neg { color: #FCA5A5; }

        /* NEWS */
        .news-list { display: flex; flex-direction: column; gap: 10px; }
        .news-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .news-item:last-child { border-bottom: none; padding-bottom: 0; }
        .news-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          background: var(--surface2);
          border: 1px solid var(--border);
          padding: 2px 6px;
          border-radius: 3px;
          color: var(--muted);
          white-space: nowrap;
          margin-top: 2px;
          letter-spacing: 0.05em;
        }
        .news-title {
          font-size: 13px;
          color: var(--text);
          line-height: 1.4;
          margin-bottom: 3px;
        }
        .news-source {
          font-size: 11px;
          color: var(--muted);
        }

        /* FLIGHTS */
        .flights-list { display: flex; flex-direction: column; gap: 10px; }
        .flight-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }
        .flight-row:last-child { border-bottom: none; }
        .flight-route {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          color: var(--accent);
        }
        .flight-meta {
          font-size: 11px;
          color: var(--muted);
          margin-top: 2px;
        }
        .flight-price {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text);
          text-align: right;
        }

        /* PRODUCTS */
        .products-list { display: flex; flex-direction: column; gap: 10px; }
        .product-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }
        .product-row:last-child { border-bottom: none; }
        .product-name { font-size: 13px; color: var(--text); }
        .product-store { font-size: 11px; color: var(--muted); margin-top: 2px; }
        .product-right { text-align: right; }
        .product-price {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent);
        }
        .product-alert {
          font-size: 10px;
          color: var(--muted);
          margin-top: 3px;
        }

        /* GOALS */
        .goals-list { display: flex; flex-direction: column; gap: 18px; }
        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .goal-label { font-size: 13px; color: var(--text); }
        .goal-pct {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
        }
        .goal-bar-bg {
          height: 4px;
          background: var(--surface2);
          border-radius: 2px;
          overflow: hidden;
        }
        .goal-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1s ease;
        }
        .goal-values {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--muted);
          margin-top: 4px;
          font-family: var(--font-mono);
        }

        /* ALERTS */
        .alerts-card {
          border-color: rgba(200, 241, 53, 0.15);
        }
        .alerts-list { display: flex; flex-direction: column; gap: 10px; }
        .alert-item {
          display: flex;
          gap: 12px;
          padding: 10px;
          background: var(--surface2);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .alert-icon { font-size: 18px; }
        .alert-msg { font-size: 13px; color: var(--text); line-height: 1.4; }
        .alert-time { font-size: 11px; color: var(--muted); margin-top: 3px; font-family: var(--font-mono); }

        /* TODO */
        .todo-input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }
        .todo-input {
          flex: 1;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px 12px;
          color: var(--text);
          font-size: 13px;
          font-family: var(--font-body);
          outline: none;
          transition: border-color 0.2s;
        }
        .todo-input:focus { border-color: var(--accent); }
        .todo-input::placeholder { color: var(--muted); }
        .todo-add-btn {
          background: var(--accent);
          border: none;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          font-size: 20px;
          color: #0d0d0d;
          cursor: pointer;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }
        .todo-add-btn:hover { opacity: 0.85; }
        .todo-list { display: flex; flex-direction: column; gap: 6px; }
        .todo-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: var(--surface2);
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s;
          user-select: none;
        }
        .todo-item:hover { background: #222; }
        .todo-item.done { opacity: 0.4; }
        .todo-item.done .todo-text { text-decoration: line-through; }
        .todo-checkbox {
          width: 18px; height: 18px;
          border: 1.5px solid var(--border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: var(--accent);
          flex-shrink: 0;
        }
        .todo-text { font-size: 13px; color: var(--text); flex: 1; }
        .todo-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .todo-summary {
          font-size: 11px;
          color: var(--muted);
          margin-top: 12px;
          font-family: var(--font-mono);
          text-align: right;
        }

        @media (max-width: 1100px) {
          .grid { grid-template-columns: repeat(6, 1fr); padding: 16px; }
          .col-4, .col-3, .col-5, .col-6, .col-7, .col-8 { grid-column: span 6; }
        }
        @media (max-width: 700px) {
          .grid { grid-template-columns: 1fr; padding: 12px; }
          .col-4, .col-3, .col-5, .col-6, .col-7, .col-8, .col-12 { grid-column: span 1; }
        }
      `}</style>

      <div className="header">
        <div className="header-brand">⬡ CTRL Dashboard</div>
        <div className="header-clock">{timeStr}</div>
        <div className="header-status">
          <div className="status-dot" />
          all systems live
        </div>
      </div>

      <div className="grid">
        {/* Row 1 */}
        <div className="col-4">
          <WeatherCard />
        </div>
        <div className="col-4">
          <CalendarCard />
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