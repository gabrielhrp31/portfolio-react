import React from 'react';
import Navbar from "../../components/Sections/Navbar";
import Presentation from "../../components/Sections/Presentation";
import About from "../../components/Sections/About";
import Services from "../../components/Sections/Services";
import Portfolio from "../../components/Sections/Portfolio";
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed, changeTheme }) => {
	if (completed) {
		return (
				<div className="global-wrapper">
					<Presentation completed={completed} />
					<Navbar changeTheme={changeTheme} />
					<About />
					<Services />
					<Portfolio />
				</div>
			);
	} else {
		return <Presentation days={days} hours={hours} minutes={minutes} seconds={seconds} completed={completed}/>;
	}
};

//sending changeTheme via props without store, because in my vision we don't need to kill an ant with war tanks
function Index({ changeTheme }) {
		const newYearDate = new Date('2024-01-01T00:00:00');

	return (
		<Countdown
			date={newYearDate}
			renderer={(props) => renderer({ ...props, changeTheme })}
		/>
	);
}

export default Index;
