import { useState } from "react"
import "./App.css"
export function Practice3() {
    const [item, setItem] = useState("")
    const [task, setTask] = useState([])


    // console.log(task)

    const handleAdd = ()=>{
        const newTask = task.map((prev) => {
            return {...prev} 
        })
        newTask.push({value:item , isDone:false , id:new Date().getTime()})
        setTask(newTask)
        setItem("")
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            return handleAdd()
        }
    }

    const doneTask = (id) => {
        const done = task.map((data) => {
            if (data.id === id) {
                data.isDone = !data.isDone    
            }
            return data
        })
       setTask(done)
    }

    const deleteTask = (id) => {
        const deletes = task.filter((data) => {
            if (data.id !== id) {
            return data
            }
        })
        setTask(deletes)
    }

    const editTask = (id) => {
        const edited = task.map((data) => {
            if (data.id === id) {
                return data.value = "hohoho"
            }
        })
        // console.log(edited)
    }

    return (
        <div className="font-bold w-6/12 mx-auto  p-10 text-center h-screen">
            <div>
                <span>
                    <input type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        onKeyDown={handleEnter}
                        className="border p-2" />
                </span>
                <span><button className="border p-3 mx-2" onClick={handleAdd}>Add Task</button></span>
            </div>
            <div className="w-[400px] mx-40 mt-2.5 text-2xl ">
                {task.map((data) => {
                return (
                    <div key={data.id} className="flex justify-between items-center ">
                        {data.isDone ? <div>
                            <span className="line-through">{data.value}</span>
                        </div>
                            : <div>
                                <span>{data.value}</span>
                            </div>}
                        
                        <div>
                            <span className="hover:cursor-pointer" onClick = {()=>editTask(data.id)}>✍️</span>
                        <span className="hover:cursor-pointer" onClick={()=>doneTask(data.id)}>✔️</span>
                            <span className="hover:cursor-pointer" onClick={()=>deleteTask(data.id)}>⛔</span>
                            </div>
                    </div>
                )
                })}
            </div>
        </div>
    )
}