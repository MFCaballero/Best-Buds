import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getTemperaments} from '../../actions/index.js';
import '../SortBox/SortBox.css';

export default function FilterBox(props){
    const [value,setValue] = useState([]);
    const [display, setDisplay] = useState("");
    const temperaments = useSelector(state => state.dogTemperaments);
    const dispatch = useDispatch();

    useEffect(() => {
        if (temperaments && temperaments.length === 0) dispatch(getTemperaments());
    } , []);

    function handleChange(event) {
        let temps;
        if(!value.includes(event.target.value)) temps=[...value , event.target.value]
        setValue(temps);
        props.handleSubmit(event,temps,display,props.searched)
    }

    function handleChangeDisplay(event) {
        setDisplay(event.target.value);
        props.handleSubmit(event,value,event.target.value,props.searched)
    }

    function handleClick(event) {
        let clear=value.filter(e => e !== event.target.name);
        setValue(clear);
        props.handleSubmit(event,clear,display,props.searched)
    }

    return(
       <div className= 'contFilter'>
           <form className='formFilter'>
            <div className='selectBox'>
            <select className= 'select' defaultValue="all" value={display} onChange={handleChangeDisplay} >
                <option value="" disabled>Display</option>
                <option className='option' value="all" selected>All</option>
                <option className='option'value="created">Your Breeds</option>
            </select>
            </div>
            <div className='selectBox'>
            <select className= 'select' value={""}onChange={handleChange} >
                <option value="" disabled>Pick Temperaments</option>
                { temperaments && temperaments.map(element => (
                    <option className='option' key={element.id} value={element.temperament}>{element.temperament}</option>
                ))
                }
            </select>
            </div>
            </form>
            <div className='divtemp'>
                {value.map(element => (
                    <div className='tempCard'>
                        <div className='tempText'>
                            {element}
                        </div>
                        <input className='btnTemp' type="button" name={element} value="X" onClick={e => handleClick(e)} />
                    </div>
                ))}
            </div>
       </div>
    )
}