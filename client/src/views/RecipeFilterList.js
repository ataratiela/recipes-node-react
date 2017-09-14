import React from 'react';

function RecipeFilterList(props) { 
  console.log(props); 
  return (
    <div className='filter-container'>
      <div className='filter-options'>
        <p>Dificulty</p>
        <input type='radio' name='difficulty' value='hard' onClick={ () => props.setFilterList('difficulty', 'hard') } />Hard<br/>
        <input type='radio' name='difficulty' value='medium' onClick={ () => props.setFilterList('difficulty', 'medium') } />Medium<br/>
        <input type='radio' name='difficulty' value='easy' onClick={ () => props.setFilterList('difficulty', 'easy') } />Easy<br/>
        <input type='radio' name='difficulty' value='all' defaultChecked onClick={ () => props.setFilterList('difficulty', 'all') }/>All<br/>
        <p>Time</p>
        <input type='radio' name='time' value='less40' onClick={ () => props.setFilterList('time','less40') } />Less than 40 minutes<br/>
        <input type='radio' name='time' value='less70' onClick={ () => props.setFilterList('time','less70') } />Less than 70 minutes<br/>
        <input type='radio' name='time' value='all' defaultChecked onClick={ () => props.setFilterList('time','all') } />All<br/>
        <p>Categories</p>
        <input type='radio' name='category' value='first' onClick={ () => props.setFilterList('category','first') } />First course<br/>
        <input type='radio' name='category' value='second' onClick={ () => props.setFilterList('category', 'second') } />Second course<br/>
        <input type='radio' name='category' value='dessert' onClick={ () => props.setFilterList('category', 'dessert') } />Dessert<br/>
        <input type='radio' name='category' value='all' defaultChecked onClick={ () => props.setFilterList('category', 'all') } />All<br/>
      </div>
    </div>
  );
}

export default RecipeFilterList;