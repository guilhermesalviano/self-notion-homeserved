"use client";

import SectionTitle from "../sectionTitle";
import Card from "./card";

const mockProducts = [
  { name: 'iPhone 16 Pro 256GB', price: "R$ 9.499", store: "Apple Store", alert: true },
  { name: "Sony WH-1000XM5", price: "R$ 1.899", store: "Amazon", alert: false },
  { name: "MacBook Air M3", price: "R$ 12.799", store: "Kabum", alert: true },
];

export default function ProductsCard() {
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
