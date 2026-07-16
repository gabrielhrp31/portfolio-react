"use client";

import React, { useContext } from "react";
import { PortfolioWrapper } from "./styles";
import PortfolioItem from "@/components/PortfolioItem";
import BlurText from "@/components/react-bits/BlurText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import FadeContent from "@/components/react-bits/FadeContent";
import { CustomThemeContext } from "@/components/CustomThemeProvider";

function Portfolio({ items = [] }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const spotlight =
    currentTheme === "light"
      ? "rgba(29, 185, 84, 0.16)"
      : "rgba(72, 197, 88, 0.22)";

  return (
    <PortfolioWrapper id="portfolio">
      <div className="portfolio__intro">
        <BlurText
          text="Portfólio"
          className="title-green"
          delay={50}
          animateBy="letters"
          direction="top"
        />
        <FadeContent blur duration={900} delay={120}>
          <div className="text-bg-reverse">
            Em breve mais projetos em que trabalhei e dediquei meu amor e
            carinho para oferecer o melhor das minhas ideias...
          </div>
        </FadeContent>
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
