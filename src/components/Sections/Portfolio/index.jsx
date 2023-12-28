import React from 'react';
import {PortfolioWrapper} from "./styles";
import portfolio from "../../../data/portfolio";
import PortfolioItem from "../../PortfolioItem";

function Index(props) {
		return (
			<PortfolioWrapper {...props} itemsQty={portfolio.length}>
					<div className="title-green">Portfólio</div>
					<div className="text-bg-reverse">Em breve projetos reais em que trabalhei...</div>
					<div className="portfolio__items">
							{ portfolio.map((item,index)=><PortfolioItem item={item} key={index} />)}
					</div>
				</PortfolioWrapper>
		);
}

export default Index;