import { useState } from 'react'
import './App.css'
import {Task} from './Task'

export function Practice2() {
    const [task, setTask] = useState("")
    const [data, setData] = useState([])
    
    const addTask = () => {
        const newTask = data.map((task) => {
            return {...task}
        })
        newTask.push({ value: task, isCompleted: false, id: new Date().getTime() }) 
        setData(newTask)
        setTask('')
    }

    return (
        <div className='font-bold w-6/12 mx-auto  p-10 text-center  h-screen '>
        <div>
            <input type="text" value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="border p-2 m-3"
            />
           <button className="border p-1 m-2 hover:cursor-pointer" onClick={addTask}>Add Task</button>
        </div>
        <div>
                <Task TaskList={data} TaskChange={setData} />
            </div>
            </div>
    )
}