import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Column from './components/Column'

function App() {

  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const getTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then((res) =>
        setTasks(res.data)
      )
      .catch((error) =>
        console.log(error)
      )
  }

  const changeTask = (updatedTask, id) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, updatedTask)
      .then((res) =>
        getTasks()
      )
      .catch((error) =>
        console.log('Failed')
      )
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


  // const getExampleFromServer = () => {
  //   axios.post('http://localhost:3000/statuses', {
  //     name: 'Try JS',
  //     description: 'Very iportant',
  //     priority: 2,
  //     status: 'Review'
  //   })
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //       console.log('Get request Success')
  //     });
  // }

  useEffect(() => {
    getTasks();
    getStatuses();
    //getExampleFromServer();
  }, [])

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      {/* <button onClick={getExampleFromServer}>Create Status</button>&nbsp;
      <button onClick={getStatuses}>Get Statuses</button> */}
      <div className="container text-center">
        <div className="row align-items-start">
          {statuses.map((status) =>
            <Column status={status}
              tasks={tasks}
              key={status._id}
              changeTask={changeTask}
              priorities={priorities}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
