import React, {useState} from 'react';

import {Parallax} from './styles';
import logoverde from '../../assets/logos/Isologoverde.png';
import logoMescla from '../../assets/logos/Isologomescla.png';
import {ImMail4, SiGithub, SiTelegram, SiLinkedin, FaChevronDown} from "react-icons/all";

function Presentation(props) {

		const [hover, setHover] = useState(false);

		return (
				<Parallax>
						<div className="p-content">
								<img className="p-content__logo"
										 src={hover?logoMescla:logoverde}
										 onMouseEnter={()=>setHover(true)}
										 onMouseLeave={()=>setHover(false)}
										 alt="Gabriel Rodrigues Logo"
								/>
								<h1 className="p-content__text" >
										Olá,  sou
										<span className="p-content__text__name"> Gabriel Rodrigues </span>
										lorem ipsum sit amet
								</h1>
								<div className="p-content__socials">
										<SiLinkedin className="p-content__socials__icon"/>
										<SiGithub className="p-content__socials__icon"/>
										<ImMail4 className="p-content__socials__icon"/>
										<SiTelegram className="p-content__socials__icon"/>
								</div>
								<FaChevronDown className="p-content__arrow" />
						</div>
				</Parallax>
		);
}

export default Presentation;
