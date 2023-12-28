import React from 'react';
import {AboutContent, AboutWrapper} from "./styles";
import profile from "../../../assets/images/profile.jpg";
import {FaChevronDown} from "react-icons/all";
import about from "../../../data/about";


function About(props) {
		return (
				<AboutWrapper>
						<AboutContent>
								<div className="infos-and-picture">
										<img src={profile} alt="Imagem de Gabriel"/>
										<p className="text">
												Gabriel Henrique Rodrigues Pinto
										</p>
										<p className="text">
											{about.xp} Anos de Experiência
										</p>
										<p className="text">
											{about.english}
										</p>
										<p className="text">
												Arcos/MG
										</p>
										<p className="text">
												{about.age} Anos
										</p>
										<a><button>Ver Linkedin</button></a>
								</div>
								<div className="text-and-infos">
										{
												about.topics.map((item, index)=>(
														<div key={index}>
																<h1 className="title">
																		{item.title}
																</h1>
																<p className="text">
																		{item.text}
																</p>
																{item.after || null}
														</div>
												))
										}
								</div>
						</AboutContent>
				</AboutWrapper>
		);
}

export default About;
