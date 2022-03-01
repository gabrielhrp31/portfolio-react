import React from 'react';
import id1 from "../../assets/images/id1.png";
import id3 from "../../assets/images/id3.png";
import id2 from "../../assets/images/id2.png";

function IdentityDescription(props) {
		return (
				<>
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
				</>
		);
}

export default IdentityDescription;