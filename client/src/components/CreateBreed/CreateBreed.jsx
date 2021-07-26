import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../actions/index.js';
import PopUp from './PopUp';
import './CreateBreed.css';
import img from '../../Images/istockphoto-1084635064-612x612.jpg';


export default function CreatedBreed(props) {
    const [input,setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperament: [],
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [missingFields, setmissingFields] = useState(false);
    const temperaments = useSelector(state => state.dogTemperaments);
    const postStatus = useSelector(state => state.postStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (temperaments && temperaments.length === 0) dispatch(getTemperaments());
    } , []);

    function handleInputChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
    }
    function handleUpload(e){
        setInput({
            ...input,
            image: e.target.files[0]
        })
    }

    function handleSelectChange(event) {
        if(!input.temperament.includes(event.target.value)) setInput({
            ...input,
            temperament: [...input.temperament , event.target.value],
        });
    }

    function handleClick(event) {
        setInput({
            ...input,
            temperament: input.temperament.filter(e => e !== event.target.name),
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!input.name || !input.height_min || !input.height_max || !input.weight_min || !input.weight_max) {
            setDisplayPopUp(true);
            setmissingFields(true);
        }else{
            const formData = new FormData();
            formData.append('image',input.image);
            formData.append('body',JSON.stringify({
                name: input.name,
                height: `${input.height_min} - ${input.height_max}`,
                weight: `${input.weight_min} - ${input.weight_max}`,
                life_span: input.life_span.toString(),
                temperament: input.temperament.map(e => e = temperaments.filter(elem => elem.temperament === e)[0].id
                ),
            }))
            setmissingFields(false);
            setDisplayPopUp(true);
            dispatch(postDog(formData))
            setInput({
                name: '',
                height_min: '',
                height_max: '',
                weight_min: '',
                weight_max: '',
                life_span: '',
                temperament: [],
                image: null
            });

        }
        
    }

    return(
        <div className='contCB'>
            <PopUp display={displayPopUp} setDisplay={setDisplayPopUp} missingFields={missingFields} postStatus ={postStatus}/>
            <form className='formCB' onSubmit={handleSubmit}>
                <h1 className='titleForm'>Create your Breed</h1>
                <div className='textImg'>
                    <img className='img-form' src={img} alt="" />
                    <div className='cont-inputs'>
                    <div className='lineForm'>
                        <label>Name:</label>
                        <input className='inputForm' type="text" name="name" onChange = {handleInputChange} value = {input.name}/>
                    </div>
                    {errors.name && (
                        <p className="danger">{errors.name}</p>
                        )}
                    <div className='lineForm'>
                        <label>Height:</label>
                        <div>
                        <input className='inputForm two ' type="number" min= "0" placeholder="min" name="height_min" onChange = {handleInputChange} value = {input.height_min}/>
                        </div>
                        <div>
                        <input className='inputForm two' type="number" placeholder="max" min= "0" name="height_max" onChange = {handleInputChange} value = {input.height_max}/>
                        </div>
                    </div>
                    <div className='lineForm'>
                        <label>Weight:</label>
                        <div>
                        <input className='inputForm two' type="number" placeholder="min" min= "0"  name="weight_min" onChange = {handleInputChange} value = {input.weight_min}/>
                        </div>
                        <div>
                        <input className='inputForm two' type="number" placeholder="max" min= "0"  name="weight_max" onChange = {handleInputChange} value = {input.weight_max}/>
                        </div>
                    </div>
                    <div className='lineForm'>
                        <label>Lifespan:</label>
                        <input className='inputForm' type="number" min= "0" name="life_span" onChange = {handleInputChange} value = {input.life_span}/>
                    </div>
                    <div className='lineForm'>
                        <label>Image:</label>
                        <input type='file' className='inputForm file'  name="image" onChange = {handleUpload}/>
                        {errors.image && (
                        <p className="danger">{errors.image}</p>
                        )}
                    </div>
                    <div className='lineForm'>
                        <label>Pick Temperaments:</label>
                        <select
                        className='inputFormS'  onChange={handleSelectChange} >
                            { temperaments && temperaments.map(element => (
                                <option key={element.id} value={element.temperament}
                                >{element.temperament}</option>
                            ))
                            }
                        </select>
                    </div>
                    </div>
                </div>
                <div className='divtemp2'>
                {input.temperament.map(element => (
                    <div key={element} className='tempCard2'>
                        <div className='tempText2'>
                            {element}
                        </div>
                        <input className='btnTemp2' type="button" name={element} value="X" onClick={e => handleClick(e)} />
                    </div>
                ))}
                </div>
                <div className='div-btnF'>
                    <input className='btn-form' type="submit" value="Create" />
                </div>
            </form>
        </div>
    )
}

function validate(input) {
    let errors = {};
    if (!/[a-zA-Z]/.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    return errors;
};