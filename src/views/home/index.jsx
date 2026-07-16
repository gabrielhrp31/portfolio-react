"use client";

import React from "react";
import Navbar from "@/components/Sections/Navbar";
import Presentation from "@/components/Sections/Presentation";
import About from "@/components/Sections/About";
import Services from "@/components/Sections/Services";
import Portfolio from "@/components/Sections/Portfolio";

export default function HomeView({
  portfolio = [],
  services = [],
  technologies = [],
}) {
  return (
    <div className="global-wrapper">
      <Presentation />
      <Navbar />
      <About technologies={technologies} />
      <Services items={services} />
      <Portfolio items={portfolio} />
    </div>
  );
}
