"use client";

import React from "react";
import { PortfolioWrapper } from "./styles";
import PortfolioItem from "@/components/PortfolioItem";

function Portfolio({ items = [] }) {
  return (
    <PortfolioWrapper $itemsQty={items.length}>
      <div className="title-green">Portfólio</div>
      <div className="text-bg-reverse">
        Em breve mais projetos em que trabalhei e dediquei meu amor e carinho
        para oferecer o melhor das minhas ideias...
      </div>
      <div className="portfolio__items">
        {items.map((item) => (
          <PortfolioItem item={item} key={item.id || item.name} />
        ))}
      </div>
    </PortfolioWrapper>
  );
}

export default Portfolio;
