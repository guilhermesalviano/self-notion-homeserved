"use client";

import { useEffect, useRef, useState } from "react";
import { useStatus } from "@/contexts/statusContext";
import Card from "../card";
import { ONE_MINUTE_IN_MS } from "@/constants";

const STALE_MS = ONE_MINUTE_IN_MS * 30;

const NewsCard = () => {
  const [news, setNews] = useState<any>(null);
  const { reportStatus } = useStatus();
  const lastFetchedAt = useRef<number>(0);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setNews(data.data);
      reportStatus("news", "success");
      lastFetchedAt.current = Date.now();
    } catch {
      setNews({ error: "failed" });
      reportStatus("news", "error");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      const stale = Date.now() - lastFetchedAt.current > STALE_MS;
      if (stale) fetchNews();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (news?.length === 0 || !news) return;

  return (
    <Card>
      <h2 className="section-title">📰 Últimas Notícias</h2>
      <div className="news-list">
        {news?.map((n: any) => (
          <div key={n.id} className="news-item cursor-pointer" onClick={() => window.open(n.url, "_blank")}>
            <span className="news-tag w-16">{n.tag}</span>
            <div>
              <div className="news-title max-w-82">{n.title}</div>
              <div className="news-source">{n.source}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewsCard;