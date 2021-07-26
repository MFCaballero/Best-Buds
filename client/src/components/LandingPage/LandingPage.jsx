import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className='extLanding'>
        <div className='contLanding'>
            <div className='divLT'>
                <h1 className='LPText'>
                    Find Your Best Bud
                </h1>
            </div>
            <div className='divLT'>
                <NavLink clasName='btnLP' exact to="/home" >Lets Go!</NavLink>
            </div>
        </div>
        <div>
            <h4>Made with ❤ by MFCaballero</h4>
        </div>
        </div>
    )
}