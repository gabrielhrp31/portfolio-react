import "devicon/devicon.min.css";
import StyledComponentsRegistry from "@/lib/registry";
import CustomThemeProvider from "@/components/CustomThemeProvider";
import GlobalStyles from "@/styles/globalStyles";
import QuoteModalProvider from "@/components/Contact/QuoteModalContext";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Gabriel Rodrigues | Portfolio",
  description: "Portfólio pessoal de Gabriel Henrique Rodrigues Pinto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <CustomThemeProvider>
            <GlobalStyles />
            <QuoteModalProvider>
              {children}
              <SiteFooter />
            </QuoteModalProvider>
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
