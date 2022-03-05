import React from 'react';
import {PortfolioWrapper} from "./styles";
import portfolio from "../../../data/portfolio";
import PortfolioItem from "../../PortfolioItem";

function Index(props) {
		return (
				<PortfolioWrapper {...props}>
					<div className="title-green">Portfólio</div>
					<div className="text-bg-reverse">A mairoia dos projetos abaixo está em transição para layouts melhores e adaptados a paleta de cor do desenvolvedor, incluindo este portfólio que foi refeito para acessa o antigo <a
							href="http://gabrielhrp31.com/" className="text-green" target="_blank" rel="noreferrer">clique aqui</a>.</div>
					<div className="portfolio__items">
							{ portfolio.map((item,index)=><PortfolioItem item={item} key={index} />)
							}
					</div>
				</PortfolioWrapper>
		);
}

export default Index;