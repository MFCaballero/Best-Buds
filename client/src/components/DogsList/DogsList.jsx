import React, {useState} from 'react';
import './DogsList.css';
import Dog from './Dog';
import Pagination from '../Pagination/Pagination';
import gif from '../../Images/Animated-Gif-Animals-Gif-Puppies-Gif-Puppy-Gif-Cute-Gif-Dogs-.gif';

export default function DogsList({dogs, filtered, dogsFiltered, searched, dogsSearch}){
    const[currentPage,setCurrentPage] = useState(0);
    const dogsPerPage = 8;
    const pagesVisited = currentPage * dogsPerPage;
    
    function Paginate({selected}) {
        setCurrentPage(selected);
    }


    if(filtered){
        if(dogsFiltered && dogsFiltered.length === 0)return(   
            <div className='divNF'>
            <div className='not-found'>
            <h2 className='NFtext'>
                We could not find your search...
            </h2>
            <h2 className='NFtext'>
                Please try again!
            </h2>
            </div>
            </div>
        )
        return(
            <div className='contExt'>
                <div className='contDogs'>
                {dogsFiltered && dogsFiltered.slice(pagesVisited, pagesVisited + dogsPerPage).map(dog => (
                
                    <Dog    
                        key={dog.id} 
                        id={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                    />
                
                ))}
                </div>
                <div>
                <Pagination Paginate={Paginate} filtered={filtered} dogsPerPage={dogsPerPage} totalDogs={dogs.length} totalFiltered={dogsFiltered.length}/>
                </div>
            </div>    
         )
    }
    if(searched){
        if(dogsSearch && dogsSearch === "error") return(   
            <div className='divNF'>
            <div className='not-found'>
            <h2 className='NFtext'>
                We could not find your search...
            </h2>
            <h2 className='NFtext'>
                Please try again!
            </h2>
            </div>
            </div>
        )
        if(dogsSearch && dogsSearch.length === 0) return(
            <div className='cont-loading'>
                <div className = 'loading'>
                <h2>
                    Loading...
                </h2>
                <img className='img-loading' src={gif} alt="" />
                </div>
            </div>
        )
        return(
            <div className='contExt'>
                <div className='contDogs'>
                {dogsSearch && dogsSearch.slice(pagesVisited, pagesVisited + dogsPerPage).map(dog => (
                
                    <Dog    
                        key={dog.id} 
                        id={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                    />
                
                ))}
                </div>
                <div>
                <Pagination Paginate={Paginate} filtered={searched} dogsPerPage={dogsPerPage} totalDogs={dogs.length} totalFiltered={dogsSearch.length}/>
                </div>
            </div>    
         )
    }
    if(dogs && dogs.length === 0) return(
        <div className='cont-loading'>
            <div className = 'loading'>
            <h2>
                Loading...
            </h2>
            <img className='img-loading' src={gif} alt="" />
            </div>
        </div>
    )
    return(
        <div className='contExt'>
            <div className='contDogs'>
                {dogs && dogs.slice(pagesVisited, pagesVisited + dogsPerPage).map(dog => (
                            <Dog    
                                key={dog.id} 
                                id={dog.id}
                                name={dog.name}
                                image={dog.image}
                                temperaments={dog.temperaments}
                            />
                ))}
            </div>
            <div className='contPag'>
                <Pagination Paginate={Paginate} filtered={filtered} dogsPerPage={dogsPerPage} totalDogs={dogs && dogs.length} totalFiltered={dogsFiltered && dogsFiltered.length}/>
            </div>
       </div>
    )
}