import React, { useState } from "react";
import './SortBox.css';

export default function SortBox(props){
    const [value, setValue] = useState("");

    function handleChangeValue(event) {
        setValue(event.target.value);
        props.handleSubmit(event,props.filtered,props.searched,event.target.value);
    }

    return(
        
        <select className= 'select' value={value} onChange={handleChangeValue} >
            <option value="" disabled>Pick Sorting</option>
            <option className='option' value="name_A" >Name a-z</option>
            <option className='option' value="name_D" >Name z-a</option>
            <option className='option'  value="weight_A">Weight ↑</option>
            <option className='option'  value="weight_D">Weight ↓</option>
        </select>
    )
}