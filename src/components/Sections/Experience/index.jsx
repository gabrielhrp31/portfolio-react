"use client";

import React, { useContext } from "react";
import { ExperienceItem, ExperienceWrapper } from "./styles";
import BlurText from "@/components/react-bits/BlurText";
import FadeContent from "@/components/react-bits/FadeContent";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { CustomThemeContext } from "@/components/CustomThemeProvider";
import QuoteCta from "@/components/Contact/QuoteCta";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

function Experience({ items = [] }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const settings = useSiteSettings();
  const spotlight =
    currentTheme === "light"
      ? "rgba(29, 185, 84, 0.28)"
      : "rgba(72, 197, 88, 0.38)";
  const title = settingValue(settings, "section_experience_title");
  const intro = settingValue(settings, "section_experience_intro");
  const emptyText = settingValue(settings, "section_experience_empty");
  const ctaLabel = settingValue(settings, "cta_quote_label");

  return (
    <ExperienceWrapper id="experiencia">
      <BlurText
        text={title}
        className="title-green"
        delay={50}
        animateBy="letters"
        direction="top"
      />
      <FadeContent blur duration={850}>
        <div className="text-bg-reverse">{intro}</div>
      </FadeContent>
      {items.length === 0 ? (
        <p className="text-bg-reverse" style={{ marginTop: 24 }}>
          {emptyText}
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
        <QuoteCta source="experience" variant="outline" label={ctaLabel} />
      </div>
    </ExperienceWrapper>
  );
}

export default Experience;
