import React from 'react';

const Contract = (props) => {
  return (
    <div class="list">
      <li>{props.name} {props.number}</li>
      <button>delete</button> 
    </div>
  )
}

export default Contract;