import React from 'react';

export default function Todo(props) {
  const task = props.name;
  const { id } = props;
  return (
    <li className='todo stack-small'>
      <div className='c-cb'>
        <input id={ id } type='checkbox' defaultChecked={ props.completed } />
        <label className='todo-label' htmlFor={ id }>
          { task }
        </label>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn'>
          Edit <span className='visually-hidden'>{ task }</span>
        </button>
        <button type='button' className='btn btn-primary'>
          Delete <span className='visually-hidden'>{ task }</span>
        </button>
      </div>
    </li>
  );
}