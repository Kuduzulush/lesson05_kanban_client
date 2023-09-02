import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Column from './components/Column'

function App() {

  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState(['To do', 'In progress', 'Review', 'Done']);

  const getTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then((res) =>
        setTasks(res.data)
      )
      .catch((error) =>
        console.log(error)
      )
  }

  const getExampleFromServer = () => {
    axios.post('http://localhost:3000/tasks', {
      name: 'Try JS',
      description: 'Very iportant',
      priority: 2,
      status: 'In progress'
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
    //getExampleFromServer();
  }, [])

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className="container text-center">
        <div className="row align-items-start">
          {statuses.map((status) =>
            <Column status={status}
              tasks={tasks}
              key={(Math.random() + Date.now())}
            />
          )}

        </div>
      </div>


    </div>
  );
}

export default App;
