"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../sectionTitle";
import Card from "../card";

export default function WishlistCard() {
  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <Card>
      <SectionTitle>📖 Preços da Wishlist :)</SectionTitle>
      <div className="products-list">
        {products?.map((p: any, i: any) => (
          <div key={i} className="product-row">
            <div>
              <div className="product-name">Livro: {p.name}</div>
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
