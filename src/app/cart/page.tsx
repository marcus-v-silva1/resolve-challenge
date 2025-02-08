"use client";

import { Back } from "@/components/Back";
import { DeleteIcon } from "@/utils/Icons";
import { Button, Container, IconButton, Link, MenuItem, Select, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CartContainer = styled(Container)`
  padding: 2rem 0;
  display: flex;
  gap: 2rem;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CartItem = styled.li`
  display: flex;
  width: 736px;
  height: 211px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 1rem;
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  @media (max-width: 600px) {
    width: 80%;
    peding: 1rem;
  }
  
`;

const ProductImage = styled(Image)`
  border-radius: 4px 0px 0px 4px;
  margin-right: 1rem;
  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
  }

`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
  }
`;

const ProductDescription = styled(Typography)`
  max-width: 429px;
  max-height: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
  }
  
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 352px;
  height: 700px;
  background-color: #ffffff;
  padding: 1rem;
  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

const Divider = styled.hr`
  width: 100%;
  border: 1px solid #dce2e6;
`;

const FooterLinks = styled.div`
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-weight: 400;
`;

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  image_url: string;
  description: string;
  quantity?: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = storedCart.map((product) => ({
      ...product,
      quantity: product.quantity || 1,
    }));
    setCart(updatedCart);
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, quantity } : product
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const calculateSubtotal = () =>
    cart.reduce((total, product) => total + (product.price_in_cents / 100) * (product.quantity || 1), 0);

  return (
    <CartContainer>
      <div>
        <Back href="/" color="#115D8C" />
        <h1>Seu Carrinho</h1>
        <Typography style={{ fontSize: "16px", fontWeight: "300" }}>
          Total ({cart.length} produtos) <strong> R$ {calculateSubtotal().toFixed(2)}</strong>
        </Typography>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <CartItem key={product.id}>
                <ProductImage width={256} height={211} src={product.image_url} alt={product.name} />
                <ProductInfo>
                  <ProductHeader>
                    <h2>{product.name}</h2>
                    <IconButton onClick={() => removeFromCart(product.id)}>
                      <DeleteIcon color="#DE3838" />
                    </IconButton>
                  </ProductHeader>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductActions>
                    <Select
                      value={product.quantity}
                      style={{ width: 65, height: 40, borderRadius: "8px", color: "#737380", backgroundColor: "#F3F5F6" }}
                      onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <MenuItem key={q} value={q}>
                          {q}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography>R$ {((product.price_in_cents / 100) * (product.quantity || 1)).toFixed(2)}</Typography>
                  </ProductActions>
                </ProductInfo>
              </CartItem>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <SummaryContainer>
          <SummaryDetails>
            <Typography style={{ fontWeight: "700" }}>Resumo do pedido</Typography>
            <SummaryText>
              <Typography>Subtotal de produtos</Typography>
              <Typography>R$ {calculateSubtotal().toFixed(2)}</Typography>
            </SummaryText>
            <SummaryText>
              <Typography>Entrega</Typography>
              <Typography>R$ {cart.length > 0 ? 40 : 0.0}</Typography>
            </SummaryText>
            <Divider />
            <SummaryText>
              <Typography style={{ fontWeight: "700" }}>Total</Typography>
              <Typography style={{ fontWeight: "700" }}>R$ {(calculateSubtotal() + 40).toFixed(2)}</Typography>
            </SummaryText>
            <Button variant="contained" style={{ backgroundColor: "#51B853", marginTop: "1rem", width: "100%", height: 44 }}>Finalizar compra</Button>
          </SummaryDetails>
          <FooterLinks>
            <Link href="/404">Ajuda</Link>
            <Link href="/404">Reembolsos</Link>
            <Link href="/404">Entregas e frete</Link>
            <Link href="/404">Trocas e devoluções</Link>
          </FooterLinks>
        </SummaryContainer>
      )}
    </CartContainer>
  );
}
