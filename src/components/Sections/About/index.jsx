import React from 'react';
import {AboutContent, AboutWrapper} from "./styles";
import profile from "../../../assets/images/profile.jpg";
import id1 from "../../../assets/images/id1.png";
import id2 from "../../../assets/images/id2.png";
import id3 from "../../../assets/images/id3.png";
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
												21 Anos
										</p>
										<button><FaChevronDown/> Baixar Curriculum</button>
								</div>
								<div className="text-and-infos">
										{
												about.topics.map((item)=>(
														<>
																<h1 className="title">
																		{item.title}
																</h1>
																<p className="text">
																		{item.text}
																</p>
																{item.after || null}
														</>
												))
										}
								</div>
						</AboutContent>
				</AboutWrapper>
		);
}

export default About;
