import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import Logo from '../../Images/Logo2.png';
import LogoResponsive from '../../Images/Logo-responsive.png';
import ReorderIcon from '@material-ui/icons/Reorder';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function NavBar() {
    const[links,setLinks] = useState(false);
    return (
        <header className="navbar">
            <div className="left">
                <NavLink exact to ="/home">
                <img id= "logo" src={Logo} alt="Logo" />
                </NavLink>
                <NavLink exact to ="/">
                <img id= "logo-responsive" src={LogoResponsive} alt="Logo" />
                </NavLink>
            </div>
            <nav id="nav"> 
                <button onClick={()=> setLinks(!links)}><ReorderIcon style={{ fontSize: 50 , color: "white"}}className="icon"/></button>
                <div className="links" id={links ? "hidden" : ""}>
                    <NavLink onClick={()=> setLinks(!links)}className="list-item aa" exact to="/home" >Home</NavLink>
                    <NavLink onClick={()=> setLinks(!links)}className="list-item aa" to="/createBreed" >Create Breed</NavLink>
                    <a className= "ld" href="https://www.linkedin.com/in/maria-florencia-caballero/" target="_blank"><LinkedInIcon style={{ fontSize: 50 , color: "white"}}/></a>
                </div>
            </nav>
        </header>
    )
}