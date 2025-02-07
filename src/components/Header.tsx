"use client";

import { AppBar, Toolbar, Typography, InputBase, Badge, IconButton } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("md")]: {
    width: "20ch",
    "&:focus": {
      width: "30ch",
    },
  },
}));
const countCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.length;
};
export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2", padding: 1 }}>
      <Toolbar>
        <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
          🛍️ Minha Loja
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar produtos..."
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>

        <IconButton component={Link} href="/cart" color="inherit">
          <Badge badgeContent={countCart()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
