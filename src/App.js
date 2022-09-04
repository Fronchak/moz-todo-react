import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  
  const taskList = tasks.map((task) => (
    <Todo 
      id={ task.id }
      name={ task.name }
      completed={ task.completed }
      key={ task.id }
      toggleTaskCompleted={ toggleTaskCompleted }
      deleteTask={ deleteTask }
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaning`;

  const buttons = props.buttons.map((button) => (
    <FilterButton
      name={ button.name }
      pressed={ button.pressed }
      key={ button.name }
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