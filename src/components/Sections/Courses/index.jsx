"use client";

import React, { useContext } from "react";
import { CourseCard, CoursesWrapper } from "./styles";
import BlurText from "@/components/react-bits/BlurText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { CustomThemeContext } from "@/components/CustomThemeProvider";

const KIND_LABELS = {
  formation: "Formação",
  course: "Curso",
  certificate: "Certificado",
};

function Courses({ items = [] }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const spotlight =
    currentTheme === "light"
      ? "rgba(29, 185, 84, 0.18)"
      : "rgba(72, 197, 88, 0.25)";

  return (
    <CoursesWrapper id="cursos">
      <BlurText
        text="Formação & Cursos"
        className="title-green"
        delay={50}
        animateBy="words"
        direction="top"
      />
      <div className="text-bg-reverse">
        Trajetória acadêmica, especializações e certificações.
      </div>
      {items.length === 0 ? (
        <p className="text-bg-reverse" style={{ marginTop: 24 }}>
          Nenhum curso cadastrado ainda.
        </p>
      ) : (
        <div className="courses__grid">
          {items.map((item) => (
            <SpotlightCard
              key={item.id}
              className="course-spotlight"
              spotlightColor={spotlight}
            >
              <CourseCard>
                <span className="course__kind">
                  {KIND_LABELS[item.kind] || item.kind}
                </span>
                <h3 className="course__title">{item.title}</h3>
                {item.institution ? (
                  <div className="course__institution">{item.institution}</div>
                ) : null}
                <span className="course__meta">
                  {[item.period, item.location].filter(Boolean).join(" · ")}
                </span>
                {item.description ? (
                  <p className="course__description">{item.description}</p>
                ) : null}
                {item.link ? (
                  <a
                    className="course__link"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver certificado
                  </a>
                ) : null}
              </CourseCard>
            </SpotlightCard>
          ))}
        </div>
      )}
    </CoursesWrapper>
  );
}

export default Courses;
