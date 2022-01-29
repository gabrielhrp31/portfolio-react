import React from 'react';
import {AboutContent, AboutWrapper} from "./styles";
import profile from "../../assets/images/profile.jpg";
import id1 from "../../assets/images/id1.png";
import id2 from "../../assets/images/id2.png";
import id3 from "../../assets/images/id3.png";
import {FaChevronDown} from "react-icons/all";
import about from "../../data/about";


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
										<h1 className="title">
												Sobre Mim
										</h1>
										<p className="text">
												Elit et mattis velit potenti tempor quam lacinia luctus, quisque aliquam mi gravida sapien cras
												est nec, sagittis vulputate lobortis molestie urna porttitor suspendisse. ultricies sed leo at
												orci sit curabitur pulvinar dictum, semper curae nibh tempor mi cras mollis, commodo nulla
												adipiscing blandit metus amet leo. venenatis inceptos eget habitant dictum cubilia curabitur
												tellus massa nullam conubia sagittis vulputate etiam at, suscipit fermentum nisi dapibus
												elementum volutpat porttitor sapien torquent rutrum curae adipiscing vehicula. maecenas amet
												curae ut quisque sapien commodo dui massa, sed himenaeos tempor tortor interdum volutpat commodo
												nam amet, dictumst tempus libero scelerisque mi purus ante.
										</p>
										<h1 className="title">
												Minha Logo e Identidade Visual
										</h1>
										<p className="text">
												Todo o trabalho da logo foi desenvolvido pelo designer Breno Ribeiro após uma longa conversa
												sobre gostos e a imagem que eu queria passar aos clientes com a mesma, foram discutidas
												semelhanças com logos de grandes empresas e minhas inspirações.
										</p>
										<p className="text-and-image">
												<img src={id1} alt="Descrição 1 da Identidade Visual"/>
												Em grande parte das linguagens as chaves “{"{}"}” determinam
												o início e o fim de uma determinada função.
										</p>
										<p className="text-and-image">
												<img src={id3} alt="Descrição 2 da Identidade Visual"/>
												Alusão ao conjunto “ => ” usado para
												declarar uma “arrow function” na linguagem javascript na qual utilizo bastante em projetos que
												trabalho grande parte do tempo.
										</p>
										<p className="text-and-image">
												<img src={id2} alt="Descrição 3 da Identidade Visual"/>
												A junção dos dois símbolos formam a letra
												“G” remetendo ao nome “Gabriel”.
										</p>
								</div>
						</AboutContent>
				</AboutWrapper>
		);
}

export default About;
