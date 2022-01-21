import React from 'react';
import Navbar from "../../components/Navbar";
import Presentation from "../../components/Presentation";

//sending changeTheme via props without store, because in my vision we don't need to kill an ant with war tanks
function Index({changeTheme}) {
    return (
        <div >
            <Presentation />
            <Navbar changeTheme={changeTheme}/>
        </div>
    );
}

export default Index;
