import React, {useState} from 'react';
import './Pagination.css';
import ReactPaginate from 'react-paginate';


export default function Pagination(props){
    let pageNumbers;

    if(props.filtered){
        pageNumbers = Math.ceil(props.totalFiltered / props.dogsPerPage);
    }else{
        pageNumbers = Math.ceil(props.totalDogs / props.dogsPerPage);
    }
    
    return(
       <div className ='divPagination'>
           <ReactPaginate 
           previousLabel={"Previous"}
           nextLabel={"Next"}
           pageCount={pageNumbers}
           onPageChange={props.Paginate}
           containerClassName={'contPag'}
           previousLinkClassName={'previous'}
           nextLinkClassName={'next'}
           activeClassName={'active'}
           />
       </div>
    )
}