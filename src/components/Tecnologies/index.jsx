"use client";

import React, { useEffect, useRef, useState } from "react";
import { TecnologiesWrapper } from "./styles";

let deviconCssPromise = null;

function loadDeviconCss() {
  if (!deviconCssPromise) {
    // Defer the ~775KB icon font off the critical path (PageSpeed: font-display + payload).
    deviconCssPromise = import("devicon/devicon.min.css").then(() => {
      if (typeof document === "undefined") return;
      // Reinforce font-display for the injected face when the browser allows overrides.
      const style = document.createElement("style");
      style.setAttribute("data-devicon-display", "swap");
      style.textContent =
        '@font-face{font-family:"devicon";font-display:swap;src:local("devicon")}';
      document.head.appendChild(style);
    });
  }
  return deviconCssPromise;
}

function Tecnologies({ icons, size = 40, padding = 15, bgColor = "" }) {
  const rootRef = useRef(null);
  const [cssReady, setCssReady] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;

    let cancelled = false;
    const start = () => {
      loadDeviconCss().then(() => {
        if (!cancelled) setCssReady(true);
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => {
        cancelled = true;
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return (
    <TecnologiesWrapper
      ref={rootRef}
      $size={size}
      $padding={padding}
      $bgColor={bgColor}
      aria-hidden={!cssReady}
    >
      {(icons || []).map((icon, index) => (
        <div className="icon-wrapper" key={`${icon}-${index}`}>
          <i className={"devicon-" + icon + "-plain"} />
        </div>
      ))}
    </TecnologiesWrapper>
  );
}

export default Tecnologies;
