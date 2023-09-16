import React from 'react';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

export default function Card({ deleteTask, task, changeTask, priorities, changeTaskStatus, statuses }) {
    //console.log(task);
    return (
        <div className="card">
            <h5 className="card-header">{task.name}</h5>
            <div className="card-body">
                <h5 className="card-title">{task.description}</h5>
                <p className="card-text">{task.status}</p>
                <p className="card-text">Priority: {task.priority} {' '}
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => changeTask({ priority: task.priority + 1 }, task._id)}
                        disabled={priorities[priorities.length - 1] === task.priority}
                    >&uarr;
                    </button>{' '}
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => changeTask({ priority: task.priority - 1 }, task._id)}
                        disabled={priorities[0] === task.priority}
                    >&darr;
                    </button>
                </p>


                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => changeTaskStatus(task, 'left')}
                    //disabled={statuses[0].name === task.status}
                >
                    &larr;
                </button>
                {' '}
                <UpdateModal 
                statuses={statuses}
                priorities={priorities}
                task={task}
                changeTask={changeTask}
                />{' '}
                <DeleteModal
                    task={task}
                    deleteTask={deleteTask}
                />
                {' '}
                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => changeTaskStatus(task, 'right')}
                //disabled={}
                >
                    &rarr;
                </button>

            </div>
        </div>
    )
}
