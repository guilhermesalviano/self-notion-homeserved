"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../sectionTitle";
import Card from "./card";


export default function NewsCard() {
  const [news, setNews] = useState<any>(null);
  
  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data.data));
  }, []);

  return (
    <Card>
      <SectionTitle>📰 Últimas Notícias</SectionTitle>
      <div className="news-list">
        {news?.map((n: any) => (
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