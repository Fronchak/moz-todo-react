import React from 'react'

export default function FilterButton(props) {
  return(
    <button type='button' className='btn toggle-btn' aria-pressed={false} onClick={ () => props.filterTasks(props.name) }>
      <span className='visually-hidden'>Show </span>
      <span>{ props.name }</span>
      <span className='visually-hidden'> Tasks</span>
    </button>
  );
}