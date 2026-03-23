"use client";

import { useDashboard } from "@/hooks/useDashboard";
import Card from "../card";

const NewsCard = () => {
  const { news } = useDashboard();

  if (!news.data?.length) return null;

  return (
    <Card>
      <h2 className="section-title">📰 Últimas Notícias</h2>
      <div className="news-list">
        {news.data.map((n: any) => (
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