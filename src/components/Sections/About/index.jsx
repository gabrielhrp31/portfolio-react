"use client";

import React, { useMemo } from "react";
import { AboutContent, AboutWrapper } from "./styles";
import IdentityDescription from "@/components/IdentityDescription";
import Tecnologies from "@/components/Tecnologies";
import BlurText from "@/components/react-bits/BlurText";
import FadeContent from "@/components/react-bits/FadeContent";
import Magnet from "@/components/react-bits/Magnet";
import OptimizedImage from "@/components/OptimizedImage";
import { mediaAlt, mediaUrl } from "@/lib/media";
import { FaLinkedinIn } from "react-icons/fa";
import QuoteCta from "@/components/Contact/QuoteCta";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import {
  calculateAgeFromBirthdate,
  calculateYearsSince,
  settingValue,
} from "@/lib/settings";

function About({ technologies = [], media = null }) {
  const settings = useSiteSettings();
  const techSlugs = technologies.map((item) => item.slug).filter(Boolean);
  const profileSrc = mediaUrl(media, "profile");
  const profileAlt = mediaAlt(media, "profile", "Imagem de Gabriel");

  const aboutName = settingValue(settings, "about_name");
  const aboutEnglish = settingValue(settings, "about_english");
  const aboutLocation = settingValue(settings, "about_location");
  const linkedinUrl = settingValue(settings, "social_linkedin");
  const ctaLabel = settingValue(settings, "cta_quote_label");
  const techEmpty = settingValue(settings, "about_tech_empty");

  const xp = calculateYearsSince(
    settingValue(settings, "about_career_start"),
    1
  );
  const age = calculateAgeFromBirthdate(
    settingValue(settings, "about_birthdate")
  );

  const topics = useMemo(
    () => [
      {
        title: settingValue(settings, "about_topic_me_title"),
        text: settingValue(settings, "about_topic_me_text"),
      },
      {
        title: settingValue(settings, "about_topic_brand_title"),
        text: settingValue(settings, "about_topic_brand_text"),
        showIdentity: true,
      },
      {
        title: settingValue(settings, "about_topic_tech_title"),
        showTechnologies: true,
      },
    ],
    [settings]
  );

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
              sizes="(max-width: 1023px) 56vw, 280px"
              quality={82}
              priority={false}
            />
          </div>
          <p className="text">{aboutName}</p>
          <p className="text">
            {xp} {settingValue(settings, "about_xp_label")}
          </p>
          <p className="text">{aboutEnglish}</p>
          <p className="text">{aboutLocation}</p>
          <p className="text">
            {age} {settingValue(settings, "about_age_label")}
          </p>
          <Magnet padding={12} magnetStrength={2.5}>
            <a
              className="linkedin-btn"
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn aria-hidden size={18} />
              <span>LinkedIn</span>
            </a>
          </Magnet>
          <div style={{ marginTop: 14 }}>
            <QuoteCta source="about" variant="soft" label={ctaLabel} />
          </div>
        </FadeContent>
        <div className="text-and-infos">
          {topics.map((item, index) => (
            <FadeContent
              key={item.title || index}
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
                    <Tecnologies size={64} padding={18} icons={techSlugs} />
                  ) : (
                    <p className="text">{techEmpty}</p>
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
