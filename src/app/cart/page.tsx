"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  image_url: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  return (
    <main>
      <h1>Meu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Categoria: {product.category}</p>
              <Image width={300} height={300} src={product.image_url} alt={product.name} />
              <p>Preço: R$ {(product.price_in_cents / 100).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
