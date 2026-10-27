import StyledComponentsRegistry from "@/lib/registry";
import CustomThemeProvider from "@/components/CustomThemeProvider";
import GlobalStyles from "@/styles/globalStyles";
import QuoteModalProvider from "@/components/Contact/QuoteModalContext";
import SiteFooter from "@/components/SiteFooter";
import SiteSettingsProvider from "@/components/SiteSettingsProvider";
import { listSiteMedia, listSiteSettings } from "@/lib/db";
import { buildMediaMap, DEFAULT_MEDIA } from "@/lib/media";
import { buildSettingsMap, settingValue } from "@/lib/settings";

/** Shared with page.js — keep homepage HTML cacheable for PageSpeed TTFB. */
export const revalidate = 60;

async function loadSettingsMap() {
  try {
    return buildSettingsMap(await listSiteSettings());
  } catch (error) {
    console.error("Failed to load site settings:", error.message);
    return buildSettingsMap([]);
  }
}

async function loadFooterLogo() {
  try {
    const media = buildMediaMap(await listSiteMedia());
    const logo = media.logo_navbar || DEFAULT_MEDIA.logo_navbar;
    return {
      logoUrl: logo.url,
      logoAlt: logo.altText || "Logo",
    };
  } catch (error) {
    console.error("Failed to load footer logo:", error.message);
    return {
      logoUrl: DEFAULT_MEDIA.logo_navbar.url,
      logoAlt: DEFAULT_MEDIA.logo_navbar.altText || "Logo",
    };
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
  const [settings, footerLogo] = await Promise.all([
    loadSettingsMap(),
    loadFooterLogo(),
  ]);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/assets/fonts/Outfit-VariableFont_wght.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <CustomThemeProvider>
            <GlobalStyles />
            <SiteSettingsProvider initialSettings={settings}>
              <QuoteModalProvider>
                {children}
                <SiteFooter
                  logoUrl={footerLogo.logoUrl}
                  logoAlt={footerLogo.logoAlt}
                />
              </QuoteModalProvider>
            </SiteSettingsProvider>
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
