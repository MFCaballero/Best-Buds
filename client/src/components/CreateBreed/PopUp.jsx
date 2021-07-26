import React from 'react';
import './CreateBreed.css';

export default function PopUp(props) {
    return (props.display) ? (
        (props.missingFields) ? (
            <div className='popup'>
                <div className='popup-inner'>
                <h3 className='text-popup'>
                    Fields Missing.
                </h3>
                <input className='close-btn' type="button" value="OK" onClick={() => props.setDisplay(false)}/>
                </div>
            </div>
        ) : ((props.postStatus === 200) ? (
            <div className='popup'>
                <div className='popup-inner'>
                <h3 className='text-popup'>
                    Breed Created Successfully!
                </h3>
                <input className='close-btn' type="button" value="OK" onClick={() => {
                    props.setDisplay(false);
                    }}/>
                </div>
            </div>
        ): ((props.postStatus === 500) ? (
            <div className='popup'>
                <div className='popup-inner'>
                <h3 className='text-popup'>
                    Breed Not Created. Please Try Again
                </h3>
                <input className='close-btn' type="button" value="OK" onClick={() => props.setDisplay(false)}/>
                </div>
            </div>
        ): "")

            
    )): "";
}
