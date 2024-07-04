//import * as React from 'react';
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
const List = ({ list }) => {
  return(
   <ul>
        {list.map((item) => (
           <Item key={item.objectID} item={item} />
         ))}
  </ul>
  );
};
const Item = ({ item }) => (
   <li>
      <span> <a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
  </li>
);
  
//component declared
const Search=({search,onSearch})=>{
console.log("search renders");
  return( 
    <div>
    <label htmlFor='search'> Search </label>
    {/* value is used to display curent value on search */}
    <input id ='search' type='text' value={search} onChange={onSearch}/>
    {/* <p>We are searching for <strong>{props.search}</strong> </p> */}
    </div>
 );
}
//component declared
const App=()=>{
console.log("app renders");
  const stories=[
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
  const stories2=[
    {
      title: 'mans',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
  
    {
      title: 'abd',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,    
    },
  ];


//call back handler concept (but here it is event handler in app component)

  const[searchTerm,setSearchTerm]=React.useState(
    localStorage.getItem('search') || 'React'
  )
  //a side effect refers to the interaction with outside world, we use reacts useeffect state to encounter it
  // useEfeect hook is useed to perform sideeffects
  //the dependancy array basically specify when side eeffect should run
  React.useEffect(
    ()=>{localStorage.setItem('search',searchTerm)},[searchTerm]
  )

  const handleSearch=(event)=>{
    setSearchTerm(event.target.value);
    //first it was used here but the problem was 
    //we dont have acces to setSearchterm function here its out of scope
    // localStorage.setItem('search',event.target.value)
  };

  const searchStories=stories.filter((story)=>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return(
    <div>
      <h1> Hey {getTitle('React')} </h1>
{/* component instantiated */}
     <Search onSearch={handleSearch} search={searchTerm}/>
      <hr />
{/* component instantiated */}
      <List list={searchStories} />
      {/* component instantiated */}
      {/* <Lists list={list2}/> */}
    </div>
  )
}
export default App
