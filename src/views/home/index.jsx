import React from 'react';
import Navbar from "../../components/Sections/Navbar";
import Presentation from "../../components/Sections/Presentation";
import About from "../../components/Sections/About";
import Services from "../../components/Sections/Services";

//sending changeTheme via props without store, because in my vision we don't need to kill an ant with war tanks
function Index({changeTheme}) {
		return (
				<div>
						<Presentation/>
						<Navbar changeTheme={changeTheme}/>
						<About/>
						<Services/>
				</div>
		);
}

export default Index;
