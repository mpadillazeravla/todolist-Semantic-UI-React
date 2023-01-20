import { useEffect , useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import Container from './components/Container';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TaskContent from './components/TaskContent';

function App() {

  // primero pasamos las tareas a localstorage para no perderlas
  let initialTasks = JSON.parse(localStorage.getItem("tasks"));

  // ! si no tenemos tareas en initial task en el localstorage, lo creamos como array vacio
  if (!initialTasks){
    initialTasks = []
  }

  const [tasks, setTasks] = useState(initialTasks);


  // ! si INITIALTASKS contiene algo, mandamos a localstorage esa tarea
  useEffect(() => {
    if(initialTasks){
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify([]))
    }
  }, [initialTasks, tasks]);

  // ** creamos la funcion CREATETASK y unas lineas mas abajo la pasamos al componente INPUTTASK por props
  // ** hacemos un seteo de TASKS incluyendo las que ya tiene más la nueva tarea que le estamos pasando desde el input
  const createTask = (task) => {
    setTasks([...tasks, task])
  };

  const deleteTask = (id) => {
    // ! le decimos que nos filtre y que nos guarde las tareas que son diferentes del id que le pasamos
    // ! es decir, deja todas las que tiene ese id. Y despues setea las tasks con esas que deja.
    const currentTask = tasks.filter((task)=> task.idTask !== id)
    setTasks(currentTask)
  }

  // console.log(tasks)
  

  return (<>
    <Container>
      <Header/>
      <InputTask createTask={createTask}/>
      <TaskContent tasks = {tasks} deleteTask={deleteTask}/>
    </Container>
  </>
  );
}

export default App;
