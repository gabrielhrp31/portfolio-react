import React from 'react';
import {ServiceWrapper} from "./styles";

function Service({name, icon, description}) {
    return (
        <ServiceWrapper>
            <div className="icon-wrapper">
                {icon}
                <span>{name}</span>
            </div>
            <p className="description">
                {description}
            </p>
        </ServiceWrapper>
    );
}

export default Service;