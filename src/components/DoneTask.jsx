/* eslint-disable react/prop-types */



const DoneTask = ({id,Task,setTaskList}) => {
    
    const handleDone = (id) => { //will use map here coz it will return the same array here we want the same list
        const done = Task.map((task) => {
            if (task.id === id) {
            task.isCompleted = !task.isCompleted
            }
            return{...task}   //*****    ---> remember to written an object jo bhi abhi loop karaye h}
        })
        setTaskList(done)
    }

    return (
        <span>
            
            <button onClick={()=>handleDone(id)}>
                ✔️
            </button>
        </span>
    )
}

export default DoneTask