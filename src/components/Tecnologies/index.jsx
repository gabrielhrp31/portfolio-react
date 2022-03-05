import React from 'react';
import {TecnologiesWrapper} from "./styles";

function Tecnologies({icons}) {
		return (
				<TecnologiesWrapper>
						{icons.map((icon, index)=>(
								<div className="icon-wrapper" key={index}>
										<i className={'devicon-' + icon + '-plain'}/>
								</div>
						))}
				</TecnologiesWrapper>
		);
}

export default Tecnologies;