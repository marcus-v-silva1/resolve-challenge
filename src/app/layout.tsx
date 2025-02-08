import CustomApolloProvider from "@/providers/ApolloProvider";
import Header from "@/components/Header";
import { SearchProvider } from "@/context/SearchContext";
import { Saira } from "next/font/google";
import "./globals.css";

const saira = Saira({
  subsets: ["latin"],
  weight: ["300","400", "600"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={saira.className}>
      <body>
        <CustomApolloProvider>
          <SearchProvider>
            <Header />
            {children}
          </SearchProvider>
        </CustomApolloProvider>
      </body>
    </html>
  );
}
