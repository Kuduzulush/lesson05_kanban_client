import React from 'react';
import Card from "./Card";

export default function Column({status, tasks}) {
  return (
    <div className='col'>
        <h2>{status}</h2>
        {tasks.filter((task) => task.status === status).map((task) =>
        <Card task={task} />
        )}
    </div>
  )
}
