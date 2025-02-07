"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/FetchProducts";
import Link from "next/link";
import { useState } from "react";
import { Pagination, Container, Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { useSearch } from "../context/SearchContext"; // Importa o contexto

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  description: string;
  image_url: string;
  created_at: string;
}

export default function Home() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const { searchTerm } = useSearch(); // Obtém o termo de pesquisa do contexto
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro ao carregar produtos: {error.message}</p>;

  // Filtra os produtos com base no termo de pesquisa vindo do Header
  const filteredProducts = data.allProducts.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <Container sx={{ py: 4 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          "& .Mui-selected": {
            color: "#FFA585",
          },
        }}
        shape="rounded"
      />

      <Typography variant="h4" gutterBottom align="center">
        Produtos
      </Typography>

      <Grid container spacing={4}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link href={`/product/${product.id}`} passHref>
                <Card>
                  <CardMedia component="img" height="200" image={product.image_url} alt={product.name} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      R$ {(product.price_in_cents / 100).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 3 }}>
            Nenhum produto encontrado.
          </Typography>
        )}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          "& .Mui-selected": {
            color: "#FFA585",
          },
        }}
        shape="rounded"
      />
    </Container>
  );
}
