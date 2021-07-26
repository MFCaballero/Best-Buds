import React from 'react';
import './Dog.css';
import { Link } from 'react-router-dom';
import alt from '../../Images/dog-head-md.png';

export default function Dog({id, name,image,temperaments}){
    return(
        <Link className='dogCard' to={`/dog/${id}`}>
            {image ? <img className='img' src={image}/> 
            : <img className='img' src={alt}/>
            }
            
            <div className='divProps'>
                <div className='divName'>
                <h3 className='name'>{name}</h3>
                </div>
                <div className='tempsDiv'>
                    {temperaments && temperaments.map(e => (
                        <label key={e.id} className='indvTemp'>{e.temperament || e}</label>
                    ))}
                </div>
            </div>
        </Link>
    )
}