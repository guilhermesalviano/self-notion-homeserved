"use client";

import SectionTitle from "../sectionTitle";
import Card from "./card";

const mockFlights = [
  { route: "GRU → LIS", date: "10 Jan", price: "R$ 3.240", airline: "TAP", trend: "▼" },
  { route: "GRU → MIA", date: "15 Jan", price: "R$ 4.100", airline: "LATAM", trend: "▲" },
  { route: "CGH → REC", date: "12 Jan", price: "R$ 580", airline: "GOL", trend: "▼" },
];

export default function FlightsCard() {
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
