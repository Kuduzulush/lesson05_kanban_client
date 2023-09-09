import React from 'react';

export default function Card({ task, changeTask, priorities }) {
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

                <a href="../" className="btn btn-primary">Go somewhere</a>
                
            </div>
        </div>
    )
}
