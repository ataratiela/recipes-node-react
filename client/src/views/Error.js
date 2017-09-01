import React from 'react';

function Error (props){
    const errors = props.errors.map((error, i)=>{
        return <li key={i}>{error}</li>
    });
    return(
        <div className='error-message'>
            <h2>{props.name}</h2>
            <ul>{ errors }</ul>
        </div>
    );
}

export default Error;