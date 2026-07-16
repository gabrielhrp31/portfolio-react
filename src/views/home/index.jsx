"use client";

import React, { useContext } from "react";
import Navbar from "@/components/Sections/Navbar";
import Presentation from "@/components/Sections/Presentation";
import About from "@/components/Sections/About";
import Services from "@/components/Sections/Services";
import Experience from "@/components/Sections/Experience";
import Courses from "@/components/Sections/Courses";
import Portfolio from "@/components/Sections/Portfolio";
import SideNav from "@/components/SideNav";
import ClickSpark from "@/components/react-bits/ClickSpark";
import { CustomThemeContext } from "@/components/CustomThemeProvider";

export default function HomeView({
  portfolio = [],
  services = [],
  technologies = [],
  experiences = [],
  courses = [],
}) {
  const { currentTheme } = useContext(CustomThemeContext);
  const sparkColor = currentTheme === "light" ? "#129E28" : "#48c558";

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkCount={8}
      sparkRadius={18}
      duration={450}
    >
      <div className="global-wrapper">
        <SideNav />
        <Presentation />
        <Navbar />
        <About technologies={technologies} />
        <Services items={services} />
        <Experience items={experiences} />
        <Courses items={courses} />
        <Portfolio items={portfolio} />
      </div>
    </ClickSpark>
  );
}
