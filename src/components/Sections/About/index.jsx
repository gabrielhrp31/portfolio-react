"use client";

import React from "react";
import { AboutContent, AboutWrapper } from "./styles";
import about from "@/data/about";
import IdentityDescription from "@/components/IdentityDescription";
import Tecnologies from "@/components/Tecnologies";
import BlurText from "@/components/react-bits/BlurText";
import FadeContent from "@/components/react-bits/FadeContent";
import Magnet from "@/components/react-bits/Magnet";
import OptimizedImage from "@/components/OptimizedImage";
import { mediaAlt, mediaUrl } from "@/lib/media";

function About({ technologies = [], media = null }) {
  const techSlugs = technologies.map((item) => item.slug).filter(Boolean);
  const profileSrc = mediaUrl(media, "profile");
  const profileAlt = mediaAlt(media, "profile", "Imagem de Gabriel");

  return (
    <AboutWrapper id="sobre">
      <AboutContent>
        <FadeContent blur duration={900} className="infos-and-picture">
          <div className="profile-image">
            <OptimizedImage
              src={profileSrc}
              alt={profileAlt}
              width={480}
              height={480}
              sizes="(max-width: 1196px) 40vw, 280px"
              quality={82}
              priority={false}
            />
          </div>
          <p className="text">Gabriel Henrique Rodrigues Pinto</p>
          <p className="text">{about.xp} Anos de Experiência</p>
          <p className="text">{about.english}</p>
          <p className="text">Belo Horizonte/MG</p>
          <p className="text">{about.age} Anos</p>
          <Magnet padding={16} magnetStrength={3}>
            <a
              href="https://www.linkedin.com/in/gabrielhrp31/"
              target="_blank"
              rel="noreferrer"
            >
              Ver Linkedin
            </a>
          </Magnet>
        </FadeContent>
        <div className="text-and-infos">
          {about.topics.map((item, index) => (
            <FadeContent
              key={index}
              blur
              duration={850}
              delay={120 + index * 120}
            >
              <div>
                <BlurText
                  text={item.title}
                  className="title"
                  delay={40}
                  animateBy="words"
                  direction="top"
                />
                {item.text ? <p className="text">{item.text}</p> : null}
                {item.showIdentity ? (
                  <IdentityDescription media={media} />
                ) : null}
                {item.showTechnologies ? (
                  techSlugs.length > 0 ? (
                    <Tecnologies size={80} padding={25} icons={techSlugs} />
                  ) : (
                    <p className="text">Nenhuma tecnologia cadastrada ainda.</p>
                  )
                ) : null}
              </div>
            </FadeContent>
          ))}
        </div>
      </AboutContent>
    </AboutWrapper>
  );
}

export default About;
