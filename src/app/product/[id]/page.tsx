"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../utils/FetchProducts";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  description: string;
  image_url: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>Erro ao carregar produto: {error.message}</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto adicionado ao carrinho!");
  };

  // Filtrando o produto pelo ID
  const product = data.allProducts.find((p: Product) => p.id === id);

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <main style={{ display: "flex"}}>
      <div>
        <Image width={640} height={580} src={product.image_url} alt={product.name} />
      </div>
      <div>
        <p>{product.category}</p>
        <h1>{product.name}</h1>
        <p>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</p>
        <p>{product.description}</p>
        <p>Preço: R$ {(product.price_in_cents / 100).toFixed(2)}</p>
        <button onClick={addToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </main>
  );
}
