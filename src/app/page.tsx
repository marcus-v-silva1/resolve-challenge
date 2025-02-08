"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/FetchProducts";
import Link from "next/link";
import { useState } from "react";
import { Pagination, Container, Card, CardMedia, CardContent, Typography, Grid, Button, Select, MenuItem } from "@mui/material";
import { useSearch } from "../context/SearchContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  description: string;
  image_url: string;
  created_at: string;
  sales: number;
}

export default function Home() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const { searchTerm } = useSearch();
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("goods");
  const productsPerPage = 12;

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro ao carregar produtos: {error.message}</p>;

  const filteredProducts = data.allProducts.filter((product: Product) => {
    const matchesCategory = categoryFilter ? product.category.toLowerCase() === categoryFilter.toLowerCase() : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  switch (sortOption) {
    case "newest":
      filteredProducts.sort((a: Product, b: Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
    case "price_high":
      filteredProducts.sort((a: Product, b: Product) => b.price_in_cents - a.price_in_cents);
      break;
    case "price_low":
      filteredProducts.sort((a: Product, b: Product) => a.price_in_cents - b.price_in_cents);
      break;
    case "best_selling":
      filteredProducts.sort((a: Product, b: Product) => b.sales - a.sales);
      break;
    default:
      filteredProducts.sort((a: Product, b: Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  const handleCategoryClick = (category: string | null) => {
    setCategoryFilter(category);
    setPage(1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center"}}>
          {[ 
            { label: "Todos os produtos", value: null },
            { label: "Camisas", value: "t-shirts" },
            { label: "Canecas", value: "mugs" },
          ].map(({ label, value }) => (
            <div
              key={value}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Saira",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "#41414D",
              }}
            >
            <Button
              variant="text"
              onClick={() => handleCategoryClick(value)}
              style={{
                color: categoryFilter === value ? "#FFA585" : "#41414D",
                textTransform: "none",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography style={{fontWeight: categoryFilter === value ? "bold" : "normal"}} variant="h6">
                  {label}
                </Typography>
                {categoryFilter === value && (
                  <svg width="168" height="4" viewBox="0 0 168 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="168" height="4" fill="#FFA585"/>
                  </svg>
                )}
              </div>
            </Button>
              
            </div>
          ))}
        </div>


        <Select
          variant="standard"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          sx={{
            width: 121,
            height: 24,
            fontFamily: "Saira",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: "0%",
            color: "#41414D",
            "&::before": { borderBottom: "none !important" },
            "&::after": { borderBottom: "none !important" }
          }}
        >
          <MenuItem value="goods" disabled>Organizar por</MenuItem>
          <MenuItem value="newest">Novidades</MenuItem>
          <MenuItem value="price_high">Preço: Maior - menor</MenuItem>
          <MenuItem value="price_low">Preço: Menor - maior</MenuItem>
          <MenuItem value="best_selling">Mais vendidos</MenuItem>
        </Select>


      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem" }}>
        <br/>
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
      </div>

      <Grid container spacing={4}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id} component={Link} href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <Card sx={{backgroundColor: "#FFFFFF",boxShadow: 0 }}>
                  <CardMedia component="img" height={300} width={256} image={product.image_url} alt={product.name} />
                  <CardContent sx={{height: 78, width: 256}}>
                    <Typography style={{ fontFamily: "Saira", fontWeight: "300", fontSize: "16px", lineHeight: "22px", letterSpacing: "0%", color: "#41414D"}}>{product.name}</Typography>
                    <svg width="228" height="1" viewBox="0 0 228 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M228 0.99998L8.74228e-08 1L0 0L228 -1.99324e-05L228 0.99998Z" fill="#DCE2E6"/>
                    </svg>
                    <Typography style={{ fontFamily: "Saira", fontWeight: "600", fontSize: "16px", lineHeight: "21px", letterSpacing: "0%", color: "#41414D"}}>R$ {(product.price_in_cents / 100).toFixed(2)}</Typography>
                  </CardContent>
                </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 3 }}>
            Nenhum produto encontrado.
          </Typography>
        )}
      </Grid>

       <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem" }}>
        <br/>
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
      </div>
    </Container>
  );
}
