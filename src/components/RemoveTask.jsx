/* eslint-disable react/prop-types */


const RemoveTask = ({ Task,id, setTaskList}) => {

    const handleRemove = (id) => {
        const remainingTask = Task.filter((task) => {
            return task.id != id;
        })
        setTaskList(remainingTask)
    }

    return (
        <span>
            <button onClick={()=>handleRemove(id)}>
            ⛔
            </button>
        </span>
    )
}

export default RemoveTask
