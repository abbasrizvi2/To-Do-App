import { useEffect, useState } from "react"
import "./App.css"
export function Practice3() {
    const [item, setItem] = useState("")
    const [task, setTask] = useState(JSON.parse(localStorage.getItem("tasks"))|| [])
    const [editTask, setEditTask] = useState("")
    const [editId, setEditId] = useState(null)
    const [favourites, setFavourites] = useState([])
    const [showFav, setShowFav] = useState(false)

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

    const handleEdit = (id,value) => {
        setEditId(id)
        setEditTask(value)
    }
   
    const saveEditText = (id) => {
        if (!editTask.trim()) return; // you can't let the input empty 

        const changeTask = task.map((data) => {
            if (data.id === id) {
                return {...data,value:editTask} //spread is used to create a new object based on data while updating one specific property
            }
            return data
        })
        setTask(changeTask)
        setEditId(null)
    }

    const handleFavourite = (id) => {
        setFavourites((prevFavs) => {
            if (prevFavs.some((task) => task.id === id)) {
                return prevFavs.filter((task)=>task.id!==id) //return new array without the selected task
            }else {
                // Add if not in favourites
                const favouriteOnes = task.filter((task) => task.id === id); //filter because ye ek particular item deta hai
                return [...favouriteOnes ,...prevFavs];
            }
        })
    }

    const handleFav = () => {
        setShowFav(!showFav)
    }


    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(task))
    },[task])
  

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
                            {editId === data.id ?
                                (<div key={data.id} className="flex justify-between items-center ">
                                    <div>
                                    <input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && saveEditText(data.id)} /></div>
                                    <div className="flex">
                                    <span className="m-2" onClick={() => saveEditText(data.id)} aria-label="Save">💾</span>
                                        <span className="m-2" onClick={() => setEditId(null)} aria-label="Cancel">❌</span> </div>
                                </div>) :
                                (data.isDone ? <div>
                                    <span className="line-through">{data.value}</span>
                                </div>
                                    : <div>
                                        <span>{data.value}</span>
                            </div>)}
                        <div>
                            
                            {editId !== data.id && (
                                    <>
                                        <span className="hover:cursor-pointer" onClick={() => handleFavourite(data.id)}>⭐</span>
                                        <span className="hover:cursor-pointer" onClick={() => handleEdit(data.id, data.value)}>✍️</span>
                                                <span className="hover:cursor-pointer mr-2" onClick={() => doneTask(data.id)}>✔️</span>
                                                <span className="hover:cursor-pointer" onClick={() => deleteTask(data.id)}>⛔</span>
                                            </>
                                )}
                                
                        </div>
                        
                    </div>
                )
                })}

                {task.length !==0 &&
                <h2 className="text-xl font-bold mt-5 mr-9 hover:cursor-pointer" onClick={handleFav}>⭐ Favourite Tasks</h2>}
             {showFav && 
                    favourites.length > 0 && (
        <div className="mt-6">
         
          {favourites.map((task) => (
            <div key={task.id} className="text-lg mt-2">
              {task.value}
            </div>
          ))}
        </div>
      )}
               
            </div>
        </div>
    )
}