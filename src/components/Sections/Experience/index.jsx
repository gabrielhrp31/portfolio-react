"use client";

import React, { useContext } from "react";
import { ExperienceItem, ExperienceWrapper } from "./styles";
import BlurText from "@/components/react-bits/BlurText";
import FadeContent from "@/components/react-bits/FadeContent";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { CustomThemeContext } from "@/components/CustomThemeProvider";
import QuoteCta from "@/components/Contact/QuoteCta";

function Experience({ items = [] }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const spotlight =
    currentTheme === "light"
      ? "rgba(29, 185, 84, 0.14)"
      : "rgba(72, 197, 88, 0.2)";

  return (
    <ExperienceWrapper id="experiencia">
      <BlurText
        text="Experiência"
        className="title-green"
        delay={50}
        animateBy="letters"
        direction="top"
      />
      <FadeContent blur duration={850}>
        <div className="text-bg-reverse">
          Resumo de papéis, responsabilidades e evolução na carreira.
        </div>
      </FadeContent>
      {items.length === 0 ? (
        <p className="text-bg-reverse" style={{ marginTop: 24 }}>
          Nenhuma experiência cadastrada ainda.
        </p>
      ) : (
        <div className="experience__list">
          {items.map((item, index) => (
            <FadeContent
              key={item.id}
              blur
              duration={750}
              delay={80 + index * 80}
            >
              <ExperienceItem>
                <SpotlightCard
                  className="experience-spotlight"
                  spotlightColor={spotlight}
                >
                  <div className="experience__card">
                    <h3 className="experience__company">{item.company}</h3>
                    <span className="experience__role">{item.position}</span>
                    <span className="experience__meta">
                      {[item.period, item.location].filter(Boolean).join(" · ")}
                    </span>
                    {item.description ? (
                      <p className="experience__description">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </SpotlightCard>
              </ExperienceItem>
            </FadeContent>
          ))}
        </div>
      )}
      <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
        <QuoteCta source="experience" variant="outline" />
      </div>
    </ExperienceWrapper>
  );
}

export default Experience;
