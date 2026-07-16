import "devicon/devicon.min.css";
import StyledComponentsRegistry from "@/lib/registry";
import CustomThemeProvider from "@/components/CustomThemeProvider";
import GlobalStyles from "@/styles/globalStyles";

export const metadata = {
  title: "Gabriel Rodrigues | Portfolio",
  description: "Portfólio pessoal de Gabriel Henrique Rodrigues Pinto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <CustomThemeProvider>
            <GlobalStyles />
            {children}
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
