import React from 'react';
import {TecnologiesWrapper} from "./styles";

function Tecnologies({icons , size=40 ,padding=15, bgColor=""}) {
		return (
				<TecnologiesWrapper size={size} padding={padding} bgColor={bgColor}>
						{icons.map((icon, index)=>(
								<div className="icon-wrapper" key={index}>
										<i className={'devicon-' + icon + '-plain'}/>
								</div>
						))}
				</TecnologiesWrapper>
		);
}

export default Tecnologies;