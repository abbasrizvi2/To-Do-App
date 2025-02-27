/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useState } from "react"


const EditTask = ({value,id, Task, setTaskList }) => {
    const [editText, setEditText] = useState(value)
    const [isEditId, IsSetEditId] = useState(null)
    
    const handleEdit = (id) =>{
        IsSetEditId(id)
    }

    const saveEditedText = (id) => {
        if (!editText.trim()) return;
        const updatedTasks = Task.map((task) => {
            if (task.id === id) {
               return {...task, value:editText}
            }
            return task
        })
        
        setTaskList(updatedTasks)
        IsSetEditId(null)    
    }

    return (
        <span>
            {isEditId === id ? (
                <div>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEditedText(id)}
                        aria-label="Edit task"
                           
                    />
                    <button className="m-2" onClick={()=>saveEditedText(id)} aria-label="Save">Save 💾</button>
                    <button className="m-2" onClick={()=>IsSetEditId(null)} aria-label="Cancel">Cancel ❌</button>
                </div>
            ) : (
                     
                        <span onClick={()=>handleEdit(id)} >✍️</span>
    
            )}
        </span>
    )
}


export default EditTask



