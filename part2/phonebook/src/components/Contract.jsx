import React from 'react';

const Contract = ({ name, number, destroyContact, id }) => {

  return (
    <div className="list">
      <li>{name} {number}</li>
      <button onClick={(event) => destroyContact(event, id)}>delete</button> 
    </div>
  )
}

export default Contract;