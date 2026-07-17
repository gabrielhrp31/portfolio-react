import "devicon/devicon.min.css";
import StyledComponentsRegistry from "@/lib/registry";
import CustomThemeProvider from "@/components/CustomThemeProvider";
import GlobalStyles from "@/styles/globalStyles";
import QuoteModalProvider from "@/components/Contact/QuoteModalContext";
import SiteFooter from "@/components/SiteFooter";
import SiteSettingsProvider from "@/components/SiteSettingsProvider";
import { listSiteSettings } from "@/lib/db";
import { buildSettingsMap, settingValue } from "@/lib/settings";

export const dynamic = "force-dynamic";

async function loadSettingsMap() {
  try {
    return buildSettingsMap(await listSiteSettings());
  } catch (error) {
    console.error("Failed to load site settings:", error.message);
    return buildSettingsMap([]);
  }
}

export async function generateMetadata() {
  const settings = await loadSettingsMap();
  return {
    title: settingValue(settings, "seo_title"),
    description: settingValue(settings, "seo_description"),
  };
}

export default async function RootLayout({ children }) {
  const settings = await loadSettingsMap();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <CustomThemeProvider>
            <GlobalStyles />
            <SiteSettingsProvider initialSettings={settings}>
              <QuoteModalProvider>
                {children}
                <SiteFooter />
              </QuoteModalProvider>
            </SiteSettingsProvider>
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
