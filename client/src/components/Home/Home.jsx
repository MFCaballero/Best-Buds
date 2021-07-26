import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import { getDogs, filterDogs, sortDogs, searchDogs, resetSearch, resetFilter } from '../../actions/index.js';
import SearchBox from '../SearchBox/SearchBox';
import FilterBox from '../FilterBox/FilterBox';
import SortBox from '../SortBox/SortBox';
import DogsList from '../DogsList/DogsList';


export default function Home (props) {
    const dogs = useSelector(state => state.dogsAll);
    const dogsFiltered = useSelector(state => state.dogsFiltered);
    const dogsSearch = useSelector(state => state.dogsSearch);
    const dispatch = useDispatch();

    const[localState,setlocalState] = useState({
      name: "",
      filtered: false,
      searched: false
    });
    
    function handleSubmitSearchBox(event) {
      event.preventDefault();
      dispatch(resetSearch());
      dispatch(searchDogs(localState.name));
      setlocalState({
        ...localState,
        searched: true,
      })
    }

    function handleSubmitFilterBox(event, value, display, searched) {
      event.preventDefault();
      if(value.length === 0 && display === "all") {
        dispatch(resetFilter())
        setlocalState({
          ...localState,
          filtered: false
        })
      }else{
        dispatch(filterDogs({value,display,searched}));
        setlocalState({
          ...localState,
          filtered: true
        })        
      }
    }

    function handleSubmitSortBox(event, filtered, searched, value) {
      event.preventDefault();
      dispatch(sortDogs({
        filtered,
        searched,
        value,
      }));
    }


    useEffect(() => {
      dispatch(getDogs());
    },[])



    return (
      <div className  = "cont">
        <div className='contBoxes' >
          <SearchBox handleChange={event => setlocalState({...localState, name: event.target.value})} handleSubmit={handleSubmitSearchBox}/>
          <SortBox handleSubmit={handleSubmitSortBox} filtered={localState.filtered} searched={localState.searched}/>
          <FilterBox handleSubmit={handleSubmitFilterBox} searched={localState.searched}/>
        </div>
        <div id="dogsList">
            <DogsList dogs={dogs} dogsFiltered={dogsFiltered} filtered={localState.filtered} searched={localState.searched} dogsSearch={dogsSearch} />
        </div>
      </div>
    );
  
}
  
  