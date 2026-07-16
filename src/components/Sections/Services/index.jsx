"use client";

import React from "react";
import { ParallaxWaves } from "./styles";
import Service from "@/components/Service";
import { getServiceIcon } from "@/lib/serviceIcons";

function Services({ items = [] }) {
  return (
    <ParallaxWaves>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
      <div className="services-wrapper">
        {items.length === 0 ? (
          <p style={{ color: "#EBF4F8", textAlign: "center", width: "100%" }}>
            Nenhum serviço cadastrado ainda.
          </p>
        ) : (
          items.map((item) => (
            <Service
              key={item.id}
              name={item.name}
              icon={getServiceIcon(item.iconKey)}
              description={item.description}
            />
          ))
        )}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </ParallaxWaves>
  );
}

export default Services;
