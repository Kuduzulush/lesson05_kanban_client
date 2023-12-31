import React from 'react';
import Card from "./Card";

export default function Column({ deleteTask, changeTaskStatus, status, tasks, changeTask, priorities,statuses }) {
    return (
        <div className='col'>
            <h2>{status.name}</h2>
            {tasks.filter((task) => task.status === status.name).map((task) =>
                <Card
                    key={task._id}
                    task={task}
                    changeTask={changeTask}
                    priorities={priorities}
                    changeTaskStatus={changeTaskStatus}
                    deleteTask={deleteTask}
                    statuses={statuses}
                />
            )}
        </div>
    )
}
