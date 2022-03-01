import React from 'react';
import {TecnologiesWrapper} from "./styles";

function Tecnologies({icons}) {
		return (
				<TecnologiesWrapper>
						{icons.map((icon)=>(
								<div className="icon-wrapper">
										<i className={'devicon-' + icon + '-plain'}/>
								</div>
						))}
				</TecnologiesWrapper>
		);
}

export default Tecnologies;