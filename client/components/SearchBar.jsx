import React, { useRef, useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import {
  DispatchContext as OverlayDispatchContext,
  StateContext as OverlayFormContext,
} from '../contexts/contexts.jsx';

export default function SearchBar(props) {
  const query = useRef();
  const dispatch = useContext(OverlayDispatchContext);

  

  const handleSearch = async e => {
    // const dispatch = useContext(OverlayDispatchContext); // you may need to import the context
    // which may mean we want the contexts to be in a separate file to import in home as well

    
    e.preventDefault();
    let queryVal = query.current.value;
    queryVal = queryVal.replace(/\s/g, '+');
    console.log('queryVal', queryVal);
    //clear form ref

    const fetchData = await fetch(`/api/tech/search/?keywords=${queryVal}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    query.current.value = ''

    if (fetchData.status !== 200) {
      return 'This was an error in the fetch';
    }
    const data = await fetchData.json();

    // subscribe the search bar to the dispatch context from the home
    dispatch({ type: 'NEW_DATA', payload: data });

    // console.log('data', data);
  };

  return (
    <form onSubmit={handleSearch}  className='search-bar'>
      <TextField
        className='search-bar'
        label='Search Apis'
        variant='standard'
        inputRef={query}
      />
      <Button className='searchBtn' variant='outlined' type='submit' 
      >
        Search
      </Button>
    </form>
  );
}

// export default class SearchContainer extends Component {
//   state = {
//     searchString: ''
//   }

//   fetchNames = (query) => {

//     fetch ('/api/tech/search')
//       .then((res) => res.json())
//       .then((data)=> {
//         this.setState({
//           searchString: data
//         })
//       })
//   }

// }
//use onChange
//handle onChange
//then need to prop drill
//searchString
//then use an useEffect after receviing postman, IF IT exists

// export default function searchBar () {
//   return  (
//     <input type='text' placeholder='Submit your search here...'></input>
//   )
// }
