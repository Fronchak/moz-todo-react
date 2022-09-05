import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo 
        id={ task.id }
        name={ task.name }
        completed={ task.completed }
        key={ task.id }
        toggleTaskCompleted={ toggleTaskCompleted }
        deleteTask={ deleteTask }
        updateTask={ updateTask }
      />
    ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const tasksType = (filter === 'All') ? '' : (filter === 'Active') ? 'remaning' : 'completed';
  const headingText = `${taskList.length} ${tasksNoun} ${tasksType}`;

  const buttons = FILTER_NAMES.map((name) => (
    <FilterButton
      name={ name }
      key={ name }
      filterTasks={ filterTasks }
    />
  ));

  function addTask(name) {
    const newTask = {
      id: `todo-${ nanoid() }`,
      name,
      completed: false
    };  
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => ((task.id === id) ? {...task, completed: !task.completed} : task));
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function updateTask(id, newName) {
    const changedTasks = tasks.map((task) => ((task.id === id) ? {...task, name: newName} : task));
    setTasks(changedTasks);
  }

  function filterTasks(filterString) {
    setFilter(filterString);
  }

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={ addTask } />
      <div className='filters btn-group stack-exception'>
        { buttons }
      </div>
      <h2 id='list-heading'>
        { headingText }
      </h2>
      <ul
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;