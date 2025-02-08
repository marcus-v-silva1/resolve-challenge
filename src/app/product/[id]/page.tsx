"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../utils/FetchProducts";
import Image from "next/image";
import { Button, Container, Typography, CircularProgress } from "@mui/material";
import { Back } from "@/components/Back";
import { CartIcon } from "@/utils/Icons";
import styled from "styled-components";

const ProductContainer = styled(Container)`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  flex-direction: column;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
`
const ProductImage = styled(Image)`
  width: 640px;
  height: 580px;
  object-fit: contain;
  border-radius: 4px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Font600 = styled(Typography)`
  font-family: "Saira";
  font-weight: 600;
`;
const Font500 = styled(Typography)`
  font-family: "Saira";
  font-weight: 500;
`;
const Font400 = styled(Typography)`
  font-family: "Saira";
  font-weight: 400;
`;

const ButtonAddToCart = styled(Button)`
  width: 100%;
  height: 44px;
  gap: 2px;
  background-color: #115D8C;
  color: white;
  display: flex;
  justify-content: center;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const Div1 = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
  `;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 400;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
  `;

const Div4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 580;
  gap: 1rem;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
    max-width: 300;
  }
  `;

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

  if (loading) return (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
    <CircularProgress size={100} />;
  </div>);
  if (error) return <p>Erro ao carregar produto: {error.message}</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  const product = data.allProducts.find((p: Product) => p.id === id);

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <ProductContainer>
      <Back href="/" color="#115D8C" />
      <Div1 style={{ display: "flex", gap: "2rem" }}>
        <ProductImage width={640} height={580} src={product.image_url} alt={product.name} />
        <Div2>
          <Div3>
            <Div4>
              <Font400 sx={{ fontSize: 16 }}>{product.category}</Font400>
              <Typography sx={{ fontSize: 32 }}>{product.name}</Typography>
              <Font600 sx={{ fontSize: 20 }}>Preço: R$ {(product.price_in_cents / 100).toFixed(2)}</Font600>
              <Font400 sx={{ fontSize: 12 }}>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</Font400>
              <Font500 sx={{ fontSize: 16, color: "#737380"}}>Descrição</Font500>
              <Font400 sx={{ fontSize: 14 }}>{product.description}</Font400>

            </Div4>
          </Div3>
          <div>
            <ButtonAddToCart
              onClick={addToCart}
            >
              <CartIcon color="white" />
              Adicionar ao Carrinho
            </ButtonAddToCart>
          </div>
        </Div2>
      </Div1>
    </ProductContainer>
  );
}
