import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIdBreed, clearDetail } from '../../actions/index.js';
import '../DogsList/DogsList.css';
import gif from '../../Images/PolishedNiceHairstreakbutterfly-max-1mb.gif';
import alt from '../../Images/dog-head-md.png';

export default function DogDetail(props){
    const DogDetail = useSelector(state => state.dogDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearDetail());
        const dogId = props.match.params.id;
        dispatch(getIdBreed(dogId));
    }, [])

    if(DogDetail && DogDetail.length === 0) return (
        <div className='cont-loading'>
        <div className = 'loading'>
        <h2>Loading...</h2>
        <img src={gif} alt="not found" />
        </div>
        </div>
    )
    return DogDetail ? (
        <div className='cont-detail'>
            { DogDetail[0].image ? <img className='img-detail' src={DogDetail[0].image}/>
                : <img className='img-detail' src={alt}/>
            }
            <div className='cont2'>
                <div className='detail-text'>
                    <h1>{DogDetail[0].name}</h1>
                    <div className='line'>
                    <label className='label2'>Height:</label>
                    <div className='card2'>{`${DogDetail[0].height} cm`}</div>
                    </div>
                    <div className='line'>
                    <label className='label2'>Weight:</label>
                    <div className='card2'>{`${DogDetail[0].weight} Kg`}</div>
                    </div>
                    <div className='line'>
                    <label className='label2'>Lifespan:</label>
                    <div className='card2'>{DogDetail[0].life_span}</div>
                    </div>
                    <label className='label2'>Temperaments</label>
                    <div className='div-card2'>
                    {DogDetail[0].temperaments && DogDetail[0].temperaments.map(e => (
                        <div className='card2' key={DogDetail[0].id}>{e.temperament}</div>
                    ))}
            </div>
                </div>
           </div>
       </div>
    ) : ""
    
}