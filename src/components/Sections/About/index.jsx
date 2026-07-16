"use client";

import React from "react";
import { AboutContent, AboutWrapper } from "./styles";
import about from "@/data/about";
import IdentityDescription from "@/components/IdentityDescription";
import Tecnologies from "@/components/Tecnologies";
import BlurText from "@/components/react-bits/BlurText";

function About({ technologies = [] }) {
  const techSlugs = technologies.map((item) => item.slug).filter(Boolean);

  return (
    <AboutWrapper id="sobre">
      <AboutContent>
        <div className="infos-and-picture">
          <img src="/assets/images/profile.jpg" alt="Imagem de Gabriel" />
          <p className="text">Gabriel Henrique Rodrigues Pinto</p>
          <p className="text">{about.xp} Anos de Experiência</p>
          <p className="text">{about.english}</p>
          <p className="text">Belo Horizonte/MG</p>
          <p className="text">{about.age} Anos</p>
          <a
            href="https://www.linkedin.com/in/gabrielhrp31/"
            target="_blank"
            rel="noreferrer"
          >
            Ver Linkedin
          </a>
        </div>
        <div className="text-and-infos">
          {about.topics.map((item, index) => (
            <div key={index}>
              <BlurText
                text={item.title}
                className="title"
                delay={40}
                animateBy="words"
                direction="top"
              />
              {item.text ? <p className="text">{item.text}</p> : null}
              {item.showIdentity ? <IdentityDescription /> : null}
              {item.showTechnologies ? (
                techSlugs.length > 0 ? (
                  <Tecnologies size={80} padding={25} icons={techSlugs} />
                ) : (
                  <p className="text">Nenhuma tecnologia cadastrada ainda.</p>
                )
              ) : null}
            </div>
          ))}
        </div>
      </AboutContent>
    </AboutWrapper>
  );
}

export default About;
