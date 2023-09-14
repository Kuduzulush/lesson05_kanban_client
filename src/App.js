import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Column from './components/Column'
import CreateModal from './components/CreateModal';

function App() {

  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const changeTaskStatus = (task, direction) => {
    const newStatusesStringArray = statuses.map((status) => status.name);
    const currentStatusIndex = newStatusesStringArray.indexOf(task.status);
    const newStatusIndex = currentStatusIndex + (direction === 'right' ? +1 : -1);
    const newStatus = newStatusesStringArray[newStatusIndex];
    axios.patch(`http://localhost:3000/tasks/${task._id}`, { status: newStatus })
      .then(res => getTasks())
      .catch(error => alert('Failed'))
  }

  const createTask = (newTask) => {
    axios.post('http://localhost:3000/tasks', newTask)
      .then(res => getTasks())
      .catch(error => alert('Can not create task'))
  }


  const getTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then(res =>
        setTasks(res.data)
      )
      .catch(error =>
        console.log(error)
      )
  }

  const changeTask = (updatedTask, id) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, updatedTask)
      .then((res) =>
        getTasks()
      )
      .catch((error) =>
        alert('Failed')
      )
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(res => getTasks())
      .catch(error => alert('Can not delete task'))
  }

  const getStatuses = () => {
    axios.get('http://localhost:3000/statuses')
      .then((res) =>
        setStatuses(res.data)
      )
      .catch((error) =>
        console.log(error)
      )
  }

  const changeStatus = (updatedStatus, id) => {
    console.log(updatedStatus);
    axios.patch(`http://localhost:3000/statuses/${id}`, updatedStatus)
      .then((res) =>
        getStatuses()
      )
      .catch((error) =>
        console.log('Failed')
      )
  }

  const createStatus = (newStatus) => {
    axios.post('http://localhost:3000/statuses', newStatus)
      .then(function (response) {
        getStatuses();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        console.log('Get it done')
      })
  }


  const postTasksFromServer = () => {
    axios.post('http://localhost:3000/tasks', {
      name: 'Try JS',
      description: 'Very iportant',
      priority: 2,
      status: 'Progress'
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log('Get request Success')
      });
  }

  const postStatusesFromServer = () => {
    axios.post('http://localhost:3000/statuses', {
      name: 'Done'
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log('Get request Success')
      });
  }

  useEffect(() => {
    getTasks();
    getStatuses();
    //getExampleFromServer();
  }, [])

  //console.log(tasks)

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      {/* <button onClick={postTasksFromServer}>Change Task</button>
      <button onClick={postStatusesFromServer}>Change Status</button> */}
      <CreateModal 
      createTask={createTask}
      statuses={statuses}
      priorities={priorities}
      />&nbsp;
      {/* <button onClick={getStatuses}>Get Statuses</button> */}
      <div className="container text-center">
        <div className="row align-items-start">
          {statuses.map((status) =>
            <Column status={status}
              tasks={tasks}
              key={status._id}
              createTask={createTask}
              changeTask={changeTask}
              priorities={priorities}
              changeTaskStatus={changeTaskStatus}
              deleteTask={deleteTask}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
