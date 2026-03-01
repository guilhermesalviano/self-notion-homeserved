"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../sectionTitle";
import Card from "../card";

export default function StocksCard() {
  const [stocks, setStocks] = useState<any>(null);
  
  useEffect(() => {
    fetch("/api/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data.data));
  }, []);

  return (
    <Card>
      <SectionTitle>📊 Ativos Hoje</SectionTitle>
      <div className="stocks-list">
        {stocks?.map((s: any) => (
          <div key={s.ticker} className="stock-row">
            <span className="stock-ticker">{s.ticker}</span>
            <span className="stock-price">
              {`R$ ${s.price.toFixed(2)}`}
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