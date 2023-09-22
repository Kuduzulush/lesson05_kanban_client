import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Column from './components/Column'
import CreateModal from './components/CreateModal';
import Loader from './utils/Loader';
import useFetching from './hooks/useFetching';
import { getStatuses } from './API/statusesServices';
import { getTasks } from './API/tasksServices';

function App() {

  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [fetchStatuses, isStatusesLoading, statusesError] = useFetching(async () => {
    const response = await getStatuses();
    setStatuses(response);
  })
  const [fetchTasks, isTaskLoading, taskError] = useFetching(async () => {
    const response = await getTasks();
    setTasks(response);
  })

  const changeTaskStatus = (task, direction) => {
    const newStatusesStringArray = statuses.map((status) => status.name);
    const currentStatusIndex = newStatusesStringArray.indexOf(task.status);
    const newStatusIndex = currentStatusIndex + (direction === 'right' ? +1 : -1);
    const newStatus = newStatusesStringArray[newStatusIndex];
    axios.patch(`http://localhost:3000/tasks/${task._id}`, { status: newStatus })
      .then(res => fetchTasks())
      .catch(error => alert('Failed'))
  }

  const createTask = (newTask) => {
    axios.post('http://localhost:3000/tasks', newTask)
      .then(res => fetchTasks())
      .catch(error => alert('Can not create task'))
  }

  const changeTask = (updatedTask, id) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, updatedTask)
      .then((res) =>
        fetchTasks()
      )
      .catch((error) =>
        alert('Failed')
      )
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(res => fetchTasks())
      .catch(error => alert('Can not delete task'))
  }

  const changeStatus = (updatedStatus, id) => {
    console.log(updatedStatus);
    axios.patch(`http://localhost:3000/statuses/${id}`, updatedStatus)
      .then((res) =>
        fetchStatuses()
      )
      .catch((error) =>
        console.log('Failed')
      )
  }

  const createStatus = (newStatus) => {
    axios.post('http://localhost:3000/statuses', newStatus)
      .then(function (response) {
        fetchStatuses();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        console.log('Get it done')
      })
  }

  const changePriority = (id, priority) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, {
      priority
    })
      .then(res => fetchTasks())
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchStatuses();
    fetchTasks();
  }, [])

  //console.log(tasks)

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      {isStatusesLoading || isTaskLoading &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh'
        }}>
          <Loader />
        </div>
      }
      <CreateModal
        createTask={createTask}
        statuses={statuses}
        priorities={priorities}
      />
      {taskError || statusesError ?
        <h3>{statusesError ?
          statusesError : taskError}
        </h3>
        :
        statuses.map((status) =>
          <Column
            changeTask={changeTask}
            changeTaskStatus={changeTaskStatus}
            createTask={createTask}
            deleteTask={deleteTask}
            key={status._id}
            priorities={priorities}
            status={status}
            statuses={statuses}
            tasks={tasks}
          />
        )

      }
    </div >
  );
}

export default App;
