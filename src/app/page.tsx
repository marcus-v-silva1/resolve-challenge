"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/FetchProducts";
import Link from "next/link";
import { useState } from "react";
import { Pagination, Container, Card, CardMedia, CardContent, Typography, Grid, Button, Select, MenuItem, CircularProgress } from "@mui/material";
import { useSearch } from "../context/SearchContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BarHome } from "@/utils/Icons";
import styled from "styled-components";


const Text300 = styled(Typography)`
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
  color: #41414D;
  font-family: Saira;
`;

const Text600 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
  color: #41414D;
  font-family: Saira;
`;

const DivPagination = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Div1 = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
  `;


const Div2 = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
  `;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Saira;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
  color: #41414D;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-height: 300;
  }
  `;

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

  if (loading) return (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
    <CircularProgress size={100} />;
  </div>);
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
      <Div1 style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>
        <Div2 style={{ display: "flex", gap: "1rem", justifyContent: "center"}}>
          {[ 
            { label: "Todos os produtos", value: null },
            { label: "Camisas", value: "t-shirts" },
            { label: "Canecas", value: "mugs" },
          ].map(({ label, value }) => (
            <Div3
              key={value}
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
              
            </Div3>
          ))}
        </Div2>


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


      </Div1>
      <DivPagination>
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
      </DivPagination>

      <Grid container spacing={4}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id} component={Link} href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <Card sx={{backgroundColor: "#FFFFFF",boxShadow: 0 }}>
                  <CardMedia component="img" height={300} width={256} image={product.image_url} alt={product.name} />
                  <CardContent sx={{height: 78, width: 256}}>
                    <Text300>{product.name}</Text300>
                    <BarHome color="#DCE2E6" />
                    <Text600>R$ {(product.price_in_cents / 100).toFixed(2)}</Text600>
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

       <DivPagination>
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
      </DivPagination>
    </Container>
  );
}
