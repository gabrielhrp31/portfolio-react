"use client";

import React, { useContext } from "react";
import { PortfolioWrapper } from "./styles";
import PortfolioItem from "@/components/PortfolioItem";
import BlurText from "@/components/react-bits/BlurText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import FadeContent from "@/components/react-bits/FadeContent";
import { CustomThemeContext } from "@/components/CustomThemeProvider";
import QuoteCta from "@/components/Contact/QuoteCta";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

function Portfolio({ items = [] }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const settings = useSiteSettings();
  const spotlight =
    currentTheme === "light"
      ? "rgba(29, 185, 84, 0.16)"
      : "rgba(72, 197, 88, 0.22)";
  const title = settingValue(settings, "section_portfolio_title");
  const intro = settingValue(settings, "section_portfolio_intro");
  const ctaLabel = settingValue(settings, "cta_quote_label");

  return (
    <PortfolioWrapper id="portfolio">
      <div className="portfolio__intro">
        <BlurText
          text={title}
          className="title-green"
          delay={50}
          animateBy="letters"
          direction="top"
        />
        <FadeContent blur duration={900} delay={120}>
          <div className="text-bg-reverse">{intro}</div>
        </FadeContent>
        <div style={{ marginTop: 18 }}>
          <QuoteCta source="portfolio" label={ctaLabel} />
        </div>
      </div>
      <div className="portfolio__items">
        {items.map((item, index) => (
          <FadeContent
            key={item.id || item.name}
            blur
            duration={800}
            delay={100 + index * 90}
          >
            <SpotlightCard
              className="portfolio-spotlight"
              spotlightColor={spotlight}
            >
              <PortfolioItem item={item} />
            </SpotlightCard>
          </FadeContent>
        ))}
      </div>
    </PortfolioWrapper>
  );
}

export default Portfolio;
