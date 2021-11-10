import React from 'react';
import Navbar from "../components/Navbar";
import {Container} from "./styles";

//sending changeTheme via props without store, because in my vision we don't need to kill an ant with war tanks
function Home({changeTheme}) {
    return (
        <div >
            <Navbar changeTheme={changeTheme}/>
            <Container>

            </Container>
        </div>
    );
}

export default Home;