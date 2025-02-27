/* eslint-disable react/prop-types */
import './App.css'
import RemoveTask from './RemoveTask'
import EditTask from './EditTask'
import DoneTask from './DoneTask'
import Favourite from './Favourites'
import { useState } from 'react'

export function Task({ TaskList, TaskChange }) {
    
    // const [addFav, setAddFav] = useState(false) //--> wrong approach here
    const [selectedFavId, setSelectedFavId] = useState(null);

    return (
        <div>
                { 
                    TaskList.length === 0 ?
                        <div>No task</div>
                        : (
                            TaskList.map((task) => (
                                <div key={task.id} className="text-left p-2 m-2 flex justify-between">
                                    <div>
                                       
                                        {/* <button onClick={() => setAddFav(true)}>⭐</button>
                                        {addFav && 
                                            <Favourite id={task.id} Task={TaskList} setTaskList={TaskChange} />
                                        } * wrong here because on making addFav = true it will go on for each task.id coz upar Task.map h sab ko slect kr dega one by one  */}

                                        <button onClick={() => setSelectedFavId(task.id)}>⭐</button>
                                    {task.isCompleted  ?
                                        <span className='line-through'>{task.value}</span>
                                        :
                                            <span>{task.value}</span>}</div>
                                    <div>
                                    <EditTask id={task.id} Task={TaskList} setTaskList={TaskChange} value={task.value}  />
                                    <RemoveTask id={task.id} Task={TaskList} setTaskList={TaskChange} />
                                    <DoneTask id={task.id} Task={TaskList} setTaskList={TaskChange} /></div>
                                </div>))
                        )
                }
            {selectedFavId && <Favourite id={selectedFavId} Task={TaskList} />}
            {/* selectedFavId stores only one ID at a time.
             When you click the ⭐ on any task, setSelectedFavId(task.id) updates the state.
             Since state is in the Task component, React re-renders the entire component.
             During re-render:
             The map() function runs again for all tasks.
             selectedFavId updates for every task, not just the clicked one.
             This causes all tasks to check selectedFavId and behave incorrectly. */}
        </div>
    )

}