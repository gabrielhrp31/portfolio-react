"use client";

import React from "react";
import { PortfolioItemWrapper } from "./styles";
import Tecnologies from "@/components/Tecnologies";

function PortfolioItem({ item }) {
  return (
    <PortfolioItemWrapper className="portfolio__item">
      <div className="portfolio__item__img-wrapper">
        {item.image ? <img src={item.image} alt={item.name} /> : null}
        <div className="portfolio__item__techs-wrapper">
          <Tecnologies bgColor="titles" icons={item.technologies || []} />
        </div>
      </div>
      <span className="portfolio__item__title">{item.name}</span>
      <span className="portfolio__item__description">
        {item.description}
        <br />
        {item.user ? (
          <>
            <b>Usuario: </b>
            {item.user} <br />
            <b>Senha: </b>
            {item.password}
          </>
        ) : null}
        {item.roles ? (
          <>
            <br />
            <b>Cargos: </b>
            {item.roles} <br />
          </>
        ) : null}
      </span>
      <div className="portfolio__item__links">
        {item.urlDemo ? (
          <a
            href={item.urlDemo}
            className="text-green"
            target="_blank"
            rel="noreferrer"
          >
            demo
          </a>
        ) : null}
        {item.urlGithub ? (
          <a
            href={item.urlGithub}
            className="text-green"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        ) : null}
      </div>
    </PortfolioItemWrapper>
  );
}

export default PortfolioItem;
