import React from 'react';

const ListEntry = (props) => {
  let {name, priority } = props.todo;
  let {handleDelete, notakey, changePriority} = props;
  return(
    <div>
      <button onClick={() => {changePriority(notakey, 1)}}>+</button>
      <button onClick={() => {changePriority(notakey, -1)}}>-</button> 
      {priority} : {name} 
      <button value={notakey} onClick={handleDelete}>Remove Todo</button>
    </div>
  )
};

export default ListEntry