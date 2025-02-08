import { BackIcon } from "@/utils/Icons";
import { Link } from "@mui/material";

interface BackProps {
  color?: string;
  href: string;
}

export function Back({ color = "#617480", href }: BackProps) {
  return (
    <Link
      style={{
        color,
        textDecoration: "none",
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
      href={href}
    >
      <BackIcon color={color} />
      Voltar
    </Link>
  );
}
