"use client";

import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { PortfolioItemWrapper } from "./styles";
import Tecnologies from "@/components/Tecnologies";
import ShinyText from "@/components/react-bits/ShinyText";
import Magnet from "@/components/react-bits/Magnet";
import OptimizedImage from "@/components/OptimizedImage";

function PortfolioItem({ item }) {
  const theme = useContext(ThemeContext);

  return (
    <PortfolioItemWrapper className="portfolio__item">
      <div className="portfolio__item__img-wrapper">
        {item.image ? (
          <OptimizedImage
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            quality={78}
            objectFit="cover"
          />
        ) : null}
        <div className="portfolio__item__techs-wrapper">
          <Tecnologies bgColor="titles" icons={item.technologies || []} />
        </div>
      </div>
      <ShinyText
        text={item.name}
        className="portfolio__item__title"
        color={theme?.titles || "#EBF4F8"}
        shineColor={theme?.softAccent || "#48c558"}
        speed={2.8}
      />
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
          <Magnet padding={12} magnetStrength={2}>
            <a
              href={item.urlDemo}
              className="text-green"
              target="_blank"
              rel="noreferrer"
            >
              demo
            </a>
          </Magnet>
        ) : null}
        {item.urlGithub ? (
          <Magnet padding={12} magnetStrength={2}>
            <a
              href={item.urlGithub}
              className="text-green"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
          </Magnet>
        ) : null}
      </div>
    </PortfolioItemWrapper>
  );
}

export default PortfolioItem;
