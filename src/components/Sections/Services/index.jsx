import React from 'react';
import {ParallaxWaves} from "./styles";
import {FaCode, FaMobileAlt, FaServer} from "react-icons/all";
import Service from "../../Service";

function Services(props) {
    return (
        <ParallaxWaves >
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1440 320">
                <path fill="#0099ff"  d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
            <div className="services-wrapper">
                <Service name="Web" icon={<FaCode />} description="Desenvolvimento de sistemas em nuvem e sites ambos responsivos" />
                <Service name="Mobile" icon={<FaMobileAlt />} description="Desenvolvimento de aplicações android" />
                <Service name="API's" icon={<FaServer />} description="Desenvolvimentos de serviços para aplicações através de API’s" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0099ff" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </ParallaxWaves>
    );
}

export default Services;