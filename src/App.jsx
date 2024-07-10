//import * as React from 'react';
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

const word='React';

const welcome={
  greeting:'hey',
  title:'React'
};

const getTitle =(title)=>{
  return title;
}

const myElement = <h1>Hello {word}</h1>;

const numbers=[1,2,3,4];
const exponential_numbers=numbers.map(function (number){
    return number*number;
});

 
// PRACTICE WITH JAVA FUNCTIONS

// const user={
//   id : 1,
//   name:{
//     first:abdullah,
//     last:masnoor
//   },
//   contact:{
//     home:'03xx',
//     work:'042xx'
//   }
//  };

//  const{
//   id,
//   name:{
//     first,
//     last
//   },
//   contact:{
//     home,
//     work
//   }

// }=user;
//..................END
 
// const list1=[
//   {
//     title: 'react',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },

//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,    
//   },
// ];

// const list2=[
//   {
//     title: 'ITU',
//     url: 'https://www.itu.edu.pk/',
//     author: 'abdullah',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },

//   {
//     title: 'fast',
//     url: 'https://www.fast.edu.pk/',
//     author: 'Mansoor',
//     num_comments: 22,
//     points: 51,
//     objectID: 12,    
//   },
// ];

//component declaration
const List = ({ list,onRemoveItem }) => {
  return(
   <ul>
        {list.map((item) => (
           <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
         ))}
  </ul>
  );
};
const Item = ({ item ,onRemoveItem}) => {
  //this event hanlder is used to obtain the callback handler adn used it is onClick
  // const handleremoveItem=()=>{
  //     onRemoveItem(item);
  // }

  return(
   <li>
      <span> <a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span><button type='button' onClick={()=>onRemoveItem(item)}>dismiss</button></span>
  </li>
      
  );
};

//component declared
// const Search=({search,onSearch})=>{
// console.log("search renders");
//   return( 
//     <>
//     <label htmlFor='search'> Search </label>
//     {/* value is used to display curent value on search */}
//     <input id ='search' type='text' value={search} onChange={onSearch}/>
//     {/* <p>We are searching for <strong>{props.search}</strong> </p> */}
//     </>
//  );
// }

//component declared
const InputwithLabel=({id,value,type='text',onInputchange,isFocused,children})=>{
  const inputRef=React.useRef()
  React.useEffect(()=>{
    if(isFocused && inputRef.current){
        inputRef.current.focus();
    }
  },[isFocused]);

  return(
  <>
  <label htmlFor={id}>{children} </label> &nbsp;
  <input ref={inputRef} id={id} type={type} value={value} onChange={onInputchange}/>
  </>
  );
}


// this is my custom hook, its using a sideeffect and a state (both are hooks)
const useStoragestate=(key,initialState)=>{
const[value,setValue]=React.useState(
  localStorage.getItem(key) || initialState
)

//a side effect refers to the interaction with outside world, we use reacts useeffect state to encounter it
// useEfeect hook is useed to perform sideeffects
//the dependancy array basically specify when side eeffect should run
  React.useEffect(
    ()=>{localStorage.setItem(key,value);},[value,key]
  );
  return [value,setValue];
};

const initialStories=[
  {
    title: 'react',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },

  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,    
  },
];

const getAsyncStories=()=>
  new Promise((resolve)=>
    setTimeout(()=>resolve({data: {stories: initialStories}}),
    2000
    )
  );

//reducer Function
const stroiesReducer=(state,action)=>{
  switch(action.type){
    case 'STORIES_FETCH_INIT':
      return {
          ...state,
          isLoading: true,
          isError:false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isError:false,
        isLoading:false,
        data: action.payload,

      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading:false,
        isError:true,
      };
    case 'REMOVE_STORIES':
      return{
        ...state,
        data: state.data.filter(
        (story)=>action.payload.objectID !== story.objectID
      )
    };
    default:
      throw new Error ()
  }
 
};

//decalring API endpoint
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';



//component decalred
const SearchForm=({searchTerm,onSearchInput,onSearchSubmit})=>(
<form onSubmit={onSearchSubmit}>
      <InputwithLabel id="search" value={searchTerm} isFocused onInputchange={onSearchInput} 
      > <strong>Search:</strong></InputwithLabel>

      <button type="submit" disabled={!searchTerm}> Submit </button>
      </form>
);

//component declared
const App=()=>{
console.log("app renders");

//reacts custom hook
const[searchTerm,setSearchTerm]=useStoragestate('search','React');

const [url,setUrl]=React.useState(
  `${API_ENDPOINT}${searchTerm}`  
)

const handleSearchSubmit=(event)=>{
  setUrl(`${API_ENDPOINT}${searchTerm}`);
  event.preventDefault();
};


//asynchronouse data fetching
const[stories,dispatchStories]=React.useReducer(stroiesReducer,
  {data:[], isLoading: false, isError: false});  

//conditioal Rendering setting load
//const[isLoading,setIsLoading]=useState(false);
//condition rendering setting error catching
//const[isError,setIsError]=useState(false);

const handleFetchStories= React.useCallback(async ()=> {
  
  if(!searchTerm)return;
  
  dispatchStories({type: 'STORIES_FETCH_INIT'});
  const result= await axios.get(url)
  try{
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits,
    });
  }
  catch{
    dispatchStories({type:'STORIES_FETCH_FAILURE'});
  }
  },[url]);

  React.useEffect(()=>{
    handleFetchStories();
  },[handleFetchStories]);


//eventHandler in app but actually its a callback handler
const handleRemoveStories=(item)=>{
  dispatchStories(
    {
      type:'REMOVE_STORIES',
      payload: item,
    });
  
};

  const handleSearchInput=(event)=>{
    setSearchTerm(event.target.value);
    //first it was used here but the problem was 
    //we dont have acces to setSearchterm function here its out of scope
    // localStorage.setItem('search',event.target.value)
  };

  // const searchStories=stories.data.filter((story)=>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  return(
    <div>
      <h1> Hey {getTitle('React')} </h1>

    <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} 
    onSearchSubmit={handleSearchSubmit}/>
      
{/* component instantiated */}
     {/* <Search onSearch={handleSearch} search={searchTerm}/> */}
    
      <hr />

      {stories.isError && <p>Something went wrong</p>}
{/* component instantiated */}
      {
        stories.isLoading ? (<p>loading........</p>) :
        (
          <List list={stories.data} onRemoveItem={handleRemoveStories}/>
        )
      };
      

      {/* component instantiated */}
      {/* <Lists list={list2}/> */}
    </div>
  )
}
export default App
