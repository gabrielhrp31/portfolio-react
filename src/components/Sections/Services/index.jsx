"use client";

import React, { useContext } from "react";
import { ParallaxWaves } from "./styles";
import Service from "@/components/Service";
import { getServiceIcon } from "@/lib/serviceIcons";
import FadeContent from "@/components/react-bits/FadeContent";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import LetterGlitch from "@/components/react-bits/LetterGlitch";
import BlurText from "@/components/react-bits/BlurText";
import OptimizedImage from "@/components/OptimizedImage";
import { CustomThemeContext } from "@/components/CustomThemeProvider";
import { mediaUrl } from "@/lib/media";
import QuoteCta from "@/components/Contact/QuoteCta";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

function Services({ items = [], media = null }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const settings = useSiteSettings();
  const spotlight =
    currentTheme === "light"
      ? "rgba(255, 255, 255, 0.18)"
      : "rgba(72, 197, 88, 0.22)";
  const bgImage = mediaUrl(media, "services_bg");
  const title = settingValue(settings, "section_services_title");
  const emptyText = settingValue(settings, "section_services_empty");
  const ctaLabel = settingValue(settings, "cta_quote_label");

  return (
    <ParallaxWaves id="servicos">
      <div className="services-bg" aria-hidden="true">
        <OptimizedImage
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          objectFit="cover"
        />
      </div>
      <div className="services-glitch" aria-hidden="true">
        <LetterGlitch
          glitchSpeed={70}
          smooth
          outerVignette={false}
          centerVignette={false}
          backgroundColor="transparent"
          glitchColors={["#163524", "#2f8f4e", "#48c558", "#9dffb0"]}
          characters="01<>{}[]/=+*&$#@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        />
      </div>
      <div className="services-veil" aria-hidden="true" />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#0099ff"
          d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      <div className="services-heading">
        <BlurText
          text={title}
          className="services-title"
          delay={40}
          animateBy="letters"
          direction="top"
        />
      </div>

      <div className="services-grid">
        {items.length === 0 ? (
          <p style={{ color: "#EBF4F8", textAlign: "center", width: "100%" }}>
            {emptyText}
          </p>
        ) : (
          items.map((item, index) => (
            <FadeContent
              key={item.id}
              className="service-cell"
              blur
              duration={800}
              delay={100 + index * 100}
            >
              <SpotlightCard
                className="service-spotlight"
                spotlightColor={spotlight}
              >
                <Service
                  name={item.name}
                  icon={getServiceIcon(item.iconKey)}
                  description={item.description}
                />
              </SpotlightCard>
            </FadeContent>
          ))
        )}
      </div>

      <div className="services-cta">
        <QuoteCta source="services" variant="soft" label={ctaLabel} />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </ParallaxWaves>
  );
}

export default Services;
