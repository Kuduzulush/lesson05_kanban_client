import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([])

  const getTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then((res) =>
        setTasks(res.data)
      )
      .catch((error) =>
        console.log(error)
        )
  }

  // const getExampleFromServer = () => {
  //   axios.post('http://localhost:3000/tasks', {
  //     name: 'Learn Express JS',
  //     description: 'Very iportant',
  //     status: 'Todo'
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
    getTasks()
  }, [])

  return (
    <div className="App">
      <h1>Kanban Board</h1>
    </div>
  );
}

export default App;
