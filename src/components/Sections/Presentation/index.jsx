import React, {useEffect, useState} from 'react';

import {Parallax, TransitionLogo} from './styles';
import logoverde from '../../../assets/logos/Isologoverde.png';
import logoMescla from '../../../assets/logos/Isologomescla.png';
import {FaChevronDown, ImMail4, SiGithub, SiLinkedin, SiTelegram} from "react-icons/all";

function Presentation(props) {
		const [writting, setWritting] = useState(false);
		const [writed, setWrited] = useState(false);

		useEffect(()=>{
				writeText();
				return ()=>{
						clearText();
				}
		// eslint-disable-next-line
		},[])

		async function writeText() {
				if(!writting && !writed){
						setWritting(true)
						await typeSentence("Olá sou ","sentence")
						await typeSentence("Gabriel Rodrigues ","sentence-name")
						await typeSentence("lorem ipsum sit amet","sentence-final")
						setWritting(false)
						setWrited(true)
				}
		}

		async function clearText() {
				await deleteSentence("sentence-final", 0)
				await deleteSentence("sentence-name", 0)
				await deleteSentence("sentence", 0);
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
										image={logoverde}
										hoverImage={logoMescla}
								/>
								<div className="p-content__text">
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
								</div>
								<div className="p-content__socials">
										<SiLinkedin className="p-content__socials__icon"/>
										<SiGithub className="p-content__socials__icon"/>
										<ImMail4 className="p-content__socials__icon"/>
										<SiTelegram className="p-content__socials__icon"/>
								</div>
								<FaChevronDown className="p-content__arrow" onClick={handleArrowClick}/>
						</div>
				</Parallax>
		);
}

export default Presentation;
