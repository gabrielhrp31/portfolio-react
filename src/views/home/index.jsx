"use client";

import React from "react";
import Navbar from "@/components/Sections/Navbar";
import Presentation from "@/components/Sections/Presentation";
import About from "@/components/Sections/About";
import Services from "@/components/Sections/Services";
import Experience from "@/components/Sections/Experience";
import Courses from "@/components/Sections/Courses";
import Portfolio from "@/components/Sections/Portfolio";

export default function HomeView({
  portfolio = [],
  services = [],
  technologies = [],
  experiences = [],
  courses = [],
}) {
  return (
    <div className="global-wrapper">
      <Presentation />
      <Navbar />
      <About technologies={technologies} />
      <Services items={services} />
      <Experience items={experiences} />
      <Courses items={courses} />
      <Portfolio items={portfolio} />
    </div>
  );
}
