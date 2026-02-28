"use client";

import SectionTitle from "../sectionTitle";
import Card from "./card";

const mockNews = [
  { id: 1, source: "Valor Econômico", title: "Selic mantida em 10,5% pelo Copom pela terceira reunião", tag: "MACRO" },
  { id: 2, source: "TechCrunch", title: "OpenAI anuncia novo modelo GPT-5 com raciocínio avançado", tag: "TECH" },
  { id: 3, source: "Folha", title: "Brasil registra superávit primário de R$12bi em outubro", tag: "BRASIL" },
  { id: 4, source: "Reuters", title: "S&P 500 atinge nova máxima histórica impulsionado por tech", tag: "MERCADO" },
];

export default function NewsCard() {
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