"use client";

import { AppBar, Toolbar, Typography, InputBase, Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";
import { CartIcon, Logo } from "@/utils/Icons";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F3F5F6",
  "&:hover": {
    backgroundColor: "#E1E5E6",
  },
  marginRight: 30,
  width: 352,
  height: 42,
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6B7280",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  minWidth: "350px",
  paddingRight: `calc(1em + ${theme.spacing(5)})`,
  paddingLeft: theme.spacing(2),
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("md")]: {
    width: "30ch",
    "&:focus": {
      width: "40ch",
    },
  },
}));

export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]").length;
      setCartCount(cart);
    }
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", padding: 1 , width: "100%", boxShadow: 0}}>
      <Toolbar sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 0 },
        }}>
        <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
          <Logo />
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Procurando por algo específico?"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
        <IconButton size="large" component={Link} href="/cart" edge="end" color="inherit">
          <Badge badgeContent={cartCount} color="error">
            <CartIcon color="#737380" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
