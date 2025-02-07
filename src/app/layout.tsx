import CustomApolloProvider from "@/providers/ApolloProvider";
import Header from "@/components/Header";
import { SearchProvider } from "@/context/SearchContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
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
