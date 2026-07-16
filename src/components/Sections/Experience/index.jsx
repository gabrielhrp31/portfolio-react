"use client";

import React from "react";
import { ExperienceItem, ExperienceWrapper } from "./styles";
import BlurText from "@/components/react-bits/BlurText";

function Experience({ items = [] }) {
  return (
    <ExperienceWrapper id="experiencia">
      <BlurText
        text="Experiência"
        className="title-green"
        delay={50}
        animateBy="letters"
        direction="top"
      />
      <div className="text-bg-reverse">
        Resumo de papéis, responsabilidades e evolução na carreira.
      </div>
      {items.length === 0 ? (
        <p className="text-bg-reverse" style={{ marginTop: 24 }}>
          Nenhuma experiência cadastrada ainda.
        </p>
      ) : (
        <div className="experience__list">
          {items.map((item) => (
            <ExperienceItem key={item.id}>
              <h3 className="experience__company">{item.company}</h3>
              <span className="experience__role">{item.position}</span>
              <span className="experience__meta">
                {[item.period, item.location].filter(Boolean).join(" · ")}
              </span>
              {item.description ? (
                <p className="experience__description">{item.description}</p>
              ) : null}
            </ExperienceItem>
          ))}
        </div>
      )}
    </ExperienceWrapper>
  );
}

export default Experience;
