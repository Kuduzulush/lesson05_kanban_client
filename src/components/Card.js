import React from 'react'

export default function Card ({task}) {
    return (
        <div className="card">
            <h5 className="card-header">{task.name}</h5>
            <div className="card-body">
                <h5 className="card-title">{task.description}</h5>
                <p className="card-text">{task.status}</p>
                <p className="card-text">{task.priority} {' '}
                <button type="button" class="btn btn-primary btn-sm">&uarr;</button>{' '}
                <button type="button" class="btn btn-primary btn-sm">&darr;</button></p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}
