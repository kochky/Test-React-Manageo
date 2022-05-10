
import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import '../style/header.scss'

function Header(){

    return (
        <header className="header"> 
            <div className="header__container">
               <p className="header__container__title">REACT INTERVIEW</p>
                <div className="header__container__author">
                    <p>par Koch Christopher</p>
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button className="header__container__author__button-container__button" color="primary" href="https://www.linkedin.com/in/christopher-koch-frontend/">Linkedin</Button>
                        <Button className="header__container__author__button-container__button" color="primary"href="https://github.com/kochky">GitHub</Button>
                        <Button className="header__container__author__button-container__button" color="primary" href="https://kochky.github.io/portfolio/">Portfolio</Button>
                    </ButtonGroup>
                    
                </div>
            </div>
        </header>
    )
}
export default Header