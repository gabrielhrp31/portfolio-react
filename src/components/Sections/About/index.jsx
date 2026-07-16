"use client";

import React from "react";
import { AboutContent, AboutWrapper } from "./styles";
import about from "@/data/about";
import IdentityDescription from "@/components/IdentityDescription";
import Tecnologies from "@/components/Tecnologies";

function About() {
  return (
    <AboutWrapper>
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
              <h1 className="title">{item.title}</h1>
              {item.text ? <p className="text">{item.text}</p> : null}
              {item.showIdentity ? <IdentityDescription /> : null}
              {item.technologies ? (
                <Tecnologies size={80} padding={25} icons={item.technologies} />
              ) : null}
            </div>
          ))}
        </div>
      </AboutContent>
    </AboutWrapper>
  );
}

export default About;
