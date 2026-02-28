"use client";

import SectionTitle from "../sectionTitle";
import Card from "./card";

const mockStocks = [
  { ticker: "PETR4", price: 38.72, change: +1.23, pct: +3.28 },
  { ticker: "VALE3", price: 62.10, change: -0.88, pct: -1.40 },
  { ticker: "MGLU3", price: 9.45, change: +0.32, pct: +3.50 },
  { ticker: "BTC", price: 98420, change: +1820, pct: +1.89 },
  { ticker: "AAPL", price: 189.30, change: -0.55, pct: -0.29 },
];

export default function StocksCard() {
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