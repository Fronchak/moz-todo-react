import React, { useState } from 'react';

export default function Todo(props) {
  const task = props.name;
  const { id } = props;
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(task);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.updateTask(id, name);
    setEditing(false);
  }

  function handleCancel() {
    setName(task);
    setEditing(false);
  }

  const editingTamplate = (
    <form className='stack-small' onSubmit={ handleSubmit }>
      <div className='form-group'>
        <label className='todo-label' htmlFor={ id }>
          New name for {task}
        </label>
        <input
          id={ id }
          className='todo-text'
          type='text'
          value={ name }
          onChange={ handleChange }
        />
      </div>
      <div className='btn-group'>
        <button type='button' className='btn todo-cancel' onClick={ handleCancel }>
          Cancel
          <span className='visually-hidden'> remaining { task }</span>
        </button>
        <button
          type='submit'
          className='btn btn__primary todo-edit'
        >
          Save
          <span className='visually-hidden'> new name for { task }</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input 
          id={ id }
          type='checkbox'
          defaultChecked={ props.completed }
          onChange={ () => props.toggleTaskCompleted(id) }
        />
        <label className='todo-label' htmlFor={ id }>
          { task }
        </label>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn' onClick={ () => setEditing(true) }>
          Edit <span className='visually-hidden'>{ task }</span>
        </button>
        <button type='button' className='btn btn-primary' onClick={ () => props.deleteTask(id) }>
          Delete <span className='visually-hidden'>{ task }</span>
        </button>
      </div>
  </div>
  );

  return (
    <li className='todo stack-small'>
      { isEditing ? editingTamplate : viewTemplate }
    </li>
  );
}