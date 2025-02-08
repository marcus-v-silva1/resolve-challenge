"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../utils/FetchProducts";
import Image from "next/image";
import { Button, Grid, Container, Link, Typography } from "@mui/material";

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
    <Container sx={{ py: 4, display:"flex", gap: "2rem" }}>
      {/* Botão de Voltar alinhado à esquerda */}
      <div style={{ display: "flex", flexDirection: "column" , alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem"}}>
          <Link style={{ color: "#617480", textDecoration: "none", gap: "0.5rem", display: "flex", alignItems: "center" }} href="/">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3639 5.63604C21.8787 9.15076 21.8787 14.8492 18.3639 18.3639C14.8492 21.8787 9.15074 21.8787 5.63604 18.3639C2.12132 14.8492 2.12132 9.15074 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.3639 5.63604" stroke="#617480" />
              <path d="M10 13L7.5 10.5L10 8" stroke="#617480" />
              <path d="M11.5 16H12.75C14.269 16 15.5 14.769 15.5 13.25V13.25C15.5 11.731 14.269 10.5 12.75 10.5H11.5H7.5" stroke="#617480" />
            </svg>
            Voltar
          </Link>
        
        </div>
          <Image  width={640} height={580} style={{ objectFit: "contain", borderRadius: "4px" }} src={product.image_url} alt={product.name} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" , justifyContent: "center" }}>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" , marginBottom: "2.5rem", gap: "1.5rem" }}>
          <Typography sx={{ marginBottom: "0.5rem"}}>{product.category}</Typography>
          <Typography sx={{ marginBottom: "1rem", fontSize: 32, fontWeight: "300" }}>{product.name}</Typography>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "3rem" }}>Preço: R$ {(product.price_in_cents / 100).toFixed(2)}</Typography>
          <Typography sx={{ marginBottom: "2rem" }}>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</Typography>
          <Typography sx={{ color: "#617480"}}>Descrição</Typography>
          <Typography>{product.description}</Typography>

        </Grid>
        <Button
          onClick={addToCart}
          sx={{
            width: "100%",
            height: 44,
            gap: 2,
            backgroundColor: "#115D8C",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7" stroke="white" />
            <path d="M20 7H4C3.44772 7 3 7.44772 3 8V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8C21 7.44772 20.5523 7 20 7Z" stroke="white" />
            <path d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11" stroke="white" />
          </svg>
          Adicionar ao Carrinho
        </Button>
      </div>
    </Container>
  );
}
