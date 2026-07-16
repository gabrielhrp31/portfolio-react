"use client";

import React from "react";
import { CourseCard, CoursesWrapper } from "./styles";

const KIND_LABELS = {
  formation: "Formação",
  course: "Curso",
  certificate: "Certificado",
};

function Courses({ items = [] }) {
  return (
    <CoursesWrapper>
      <div className="title-green">Formação & Cursos</div>
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
            <CourseCard key={item.id}>
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
          ))}
        </div>
      )}
    </CoursesWrapper>
  );
}

export default Courses;
