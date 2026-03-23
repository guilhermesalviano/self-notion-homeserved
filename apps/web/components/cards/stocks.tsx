"use client";

import { useEffect, useRef, useState } from "react";
import { useStatus } from "@/contexts/statusContext";
import Card from "../card";
import { ONE_MINUTE_IN_MS } from "@/constants";

const STALE_MS = ONE_MINUTE_IN_MS * 30;

export default function StocksCard() {
  const [stocks, setStocks] = useState<any>(null);
  const { reportStatus } = useStatus();
  const lastFetchedAt = useRef<number>(0);

  const fetchStocks = async () => {
    try {
      const res = await fetch("/api/stocks");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setStocks(data.data);
      reportStatus("stocks", "success");
      lastFetchedAt.current = Date.now();
    } catch {
      setStocks({ error: "failed" });
      reportStatus("stocks", "error");
    }
  };
  
  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      const stale = Date.now() - lastFetchedAt.current > STALE_MS;
      if (stale) fetchStocks();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <Card>
      <h2 className="section-title">📊 Ativos Hoje</h2>
      <div className="stocks-list">
        <div className="stock-row">
          <span className="w-10 text-sm">Ticker</span>
          <span className="w-18 text-center text-sm">
            Price
          </span>
          <span className="w-26 text-center text-sm">
            Price Change
          </span>
          <span className="w-18 text-center text-sm">
            Percent
          </span>
        </div>
        {stocks?.map((s: any) => (
          <div key={s.ticker} className="stock-row">
            <span className="stock-ticker">{s.ticker}</span>
            <span className="stock-price">
              {`R$ ${s.price.toFixed(2)}`}
            </span>
            <span className="stock-price">
              {`R$ ${s.change?.toFixed(2)}`}
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