import React from 'react';

function RecipeFilterList(props) { 
  return (
    <div className='filter-container'>
      <div className='filter-options'>
        <p>Dificulty</p>
        <input type='radio' name='difficulty' value='hard' onClick={ () => props.setFilterList('difficulty', 1) } />Hard<br/>
        <input type='radio' name='difficulty' value='medium' onClick={ () => props.setFilterList('difficulty', 2) } />Medium<br/>
        <input type='radio' name='difficulty' value='easy' onClick={ () => props.setFilterList('difficulty', 3) } />Easy<br/>
        <input type='radio' name='difficulty' value='all' defaultChecked onClick={ () => props.setFilterList('difficulty', 4) }/>All<br/>
        <p>Time</p>
        <input type='radio' name='time' value={40}  onClick={ () => props.setFilterList('time', 40) } />Less than 40 minutes<br/>
        <input type='radio' name='time' value={70} onClick={ () => props.setFilterList('time', 70) } />Less than 70 minutes<br/>
        <input type='radio' name='time' value={10000} defaultChecked onClick={ () => props.setFilterList('time', 10000) } />All<br/>
        <p>Categories</p>
        <input type='radio' name='category' value={1} onClick={ () => props.setFilterList('category', 1) } />First course<br/>
        <input type='radio' name='category' value={2} onClick={ () => props.setFilterList('category', 2) } />Second course<br/>
        <input type='radio' name='category' value={3} onClick={ () => props.setFilterList('category', 3) } />Dessert<br/>
        <input type='radio' name='category' value={10000} defaultChecked onClick={ () => props.setFilterList('category', 10000) } />All<br/>
      </div>
    </div>
  );
}

export default RecipeFilterList;