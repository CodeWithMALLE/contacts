import React, { useRef, useState } from 'react';

const HeaderBlock = (props) => {

    return (
        <div classNameName="header">
            <h1>Contact de {props.username}</h1>
        </div>
    );
}

export default HeaderBlock;
