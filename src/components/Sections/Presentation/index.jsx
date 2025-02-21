import React, {useEffect, useState} from 'react';

import {Parallax, TransitionLogo} from './styles';
import logoverde from '../../../assets/logos/Isologoverde.png';
import logoMescla from '../../../assets/logos/Isologomescla.png';
import { FaChevronDown, ImMail4, SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/all";
import {zeroPad} from 'react-countdown';

function Presentation({ completed, days, hours, minutes, seconds, ...props}) {
		const [writting, setWritting] = useState(false);
		const [writed, setWrited] = useState(false);

		useEffect(() => {
			if(completed){
				clearText();
				writeText();
			}
			setInterval(() => {
				stutterLogo();
			}, 5000)
		// eslint-disable-next-line
		},[completed])

		async function writeText() {
				if(!writting && !writed){
						setWritting(true)
						await typeSentence("Olá me chamo","sentence")
						await typeSentence(" Gabriel Rodrigues ","sentence-name")
						await typeSentence(" desenvolvedor fullstack.", "sentence-final")
						setWritting(false)
						setWrited(true)
				}
		}

		const stutterLogo = () => {
			const logoElm = document.getElementById("logo");
			logoElm.classList.add("show");
			setTimeout(() => {
				logoElm.classList.remove("show");
			}, 2500);
		}

		async function clearText() {
				deleteSentence("sentence-final")
				deleteSentence("sentence-name")
				deleteSentence("sentence");
		}

		async function deleteSentence(eleRef) {
				document.getElementById(eleRef).innerHTML = "";
		}

		async function typeSentence(sentence, eleRef, delay = 100) {
				const letters = sentence.split("");
				let i = 0;
				while(i < letters.length) {
						await waitForMs(delay);
						document.getElementById(eleRef).append(letters[i]);
						i++
				}
				return Promise.resolve();
		}

		function waitForMs(ms) {
				return new Promise(resolve => setTimeout(resolve, ms))
		}

		function handleArrowClick() {
				window.scrollTo(0, (window.innerHeight + 50));
		}

		return (
				<Parallax>
						<div className="p-content">
								<TransitionLogo
										id="logo"
										image={logoverde}
										hoverImage={logoMescla}
								/>
								<div className="p-content__text">
										{ !completed ?
											<span id="sentence-countdown" >
												{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
											</span>
											:
											<>
												<span id="sentence">
													{/*Olá, sou*/}
												</span>
												<span id="sentence-name" className="p-content__text__name">
													{/*Gabriel Rodrigues*/}
												</span>
												<span id="sentence-final">
													{/*lorem ipsum sit amet*/}
												</span>
												<span className="p-content__input_cursor"></span>
											</>
										}
								</div>
								{ completed ?
									<>
										<div className="p-content__socials">
											<a href="https://www.linkedin.com/in/gabrielhrp31/" target="_blank" rel="noreferrer"><SiLinkedin className="p-content__socials__icon" /></a>
											<a href="https://github.com/gabrielhrp31" target="_blank" rel="noreferrer"><SiGithub className="p-content__socials__icon" /></a>
											<a href="mailto:gabrielws31@gmail.com?subject=Quero realizar um orçamento!" target="_blank" rel="noreferrer"><ImMail4 className="p-content__socials__icon" /></a>
											<a href="https://api.whatsapp.com/send?phone=5537991243949&text=Ol%C3%A1%20vi%20seu%20portf%C3%B3lio%20e%20quero%20realizar%20um%20or%C3%A7amento!" target="_blank" rel="noreferrer"><SiWhatsapp className="p-content__socials__icon"/></a>
										</div>
										<FaChevronDown className="p-content__arrow" onClick={handleArrowClick}/>
									</>
									:null
								}
						</div>
				</Parallax>
		);
}

export default Presentation;
