// app/not-found.tsx
import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container sx={{ py: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="50vh"
        textAlign="center"
      >
        <Typography variant="h1" fontSize={80} fontWeight="bold" color="primary">
          404
        </Typography>
        <Typography variant="h5" marginBottom={2}>
          Oops! Página não encontrada.
        </Typography>
        <Typography variant="body1" marginBottom={3}>
          A página que você está tentando acessar não existe ou foi removida.
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/">
          Voltar para a Home
        </Button>
      </Box>
    </Container>
  );
}
