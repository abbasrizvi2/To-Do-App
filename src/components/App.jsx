import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")
  ) || [])
  

  // console.log(todos)
  // we will make an array...but why?
  //bcoz we want to save same type of elements now
  // so for that we will make an array
  // in this array we will save them as an object for each task...why?
  // bocz [{value:{task}, isCompleted:false, id:time}] --> value jo task hai, iscompleted hone pe strikeout id-differentiate bteween task(will work as a key here)

  const handleChange = (e) => {
    
    setTask(e.target.value)
    
  }

   const handleAdd = () => { // what we want now is whatever we have written should be shown down with the all task
    // we will use map bcoz whatever item has been added it has to show one by one
     // here think like there is already object present in todos
     
   if(!task.trim()) return //mtlb empty hai toh false dega isko true krne k liye ! use kiya h
    const newTodos = todos.map((todo) => {
      
      return { ...todo } // returing as an object by spread operator --> [{},{},{}]
    })

     newTodos.push({ value: task, isCompleted: false, id: new Date().getTime() })
     
     // **             OR
    //  const newTodos = [...todos ,{ value: task, isCompleted: false, id: new Date().getTime() }]

   
    setTodos(newTodos)
    setTask("") // after clicking add button input box will be empty
  }


  const handleKey = (e) => {
    console.log(e) //==> jo bhi key hum press krenge input me yaha show hogi
    if (e.key === "Enter") {
     handleAdd() // humre is function ko call krna jo task add kr rha h
    }
  }

  const handleDelete = (id) => {
    const filteredTodo = todos.filter((todo) => {
      return todo.id != id
    })
    setTodos(filteredTodo)
  }

  const handleComplete = (id) => {
    // we have to loop through all and to markdown which one isCompleted is false or true through wwhich id has been passes
    const newTodos = todos.map((todo) => {
      // ***** 1st method 
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return {...todo}
      
    })

    // ***** 2nd method for writing if but 1st one is better
    // newTodos.forEach((todo) => { //newTodo array me hume object mile h un sab array k object me
    //   if (todo.id === id) {
    //     todo.isCompleted = !todo.isCompleted
    //   }
    // })
    setTodos(newTodos)
    
  }

  const handleEdit = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = task
      }
      return {...todo}
    })
    setTodos(newTodos)
  }

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  return (
    <div className='font-bold w-6/12 mx-auto  p-10 text-center  h-screen '>
      <div>
        <input className="border p-3"  onKeyDown={handleKey} type="name" placeholder='Add Task' value={task} onChange={handleChange}></input>
        <button className='ml-7 p-2 border hover:cursor-pointer'
          onClick={task.trim() ? handleAdd : () => { }} // trim takes out the whitespacing from end and beginning of the string
          disabled = {!task.trim()} //task.trim() = "" means it is false so in disable we have to make it true so we do !task.trim()
        >
          Add Task</button>
      </div>
      <div className='m-10'>
        {
        todos.map((todo) => {
          return <div key={todo.id}>
            <div className='text-2xl font-bold m-3'>
              {todo.isCompleted ? <span className='ml-10 line-through'>{todo.value}</span>  :
                <span className='ml-10'>{todo.value}</span>}
              <span className='ml-9 hover:cursor-pointer' onClick={()=>handleEdit(todo.id)}>✍️</span>
              <span className='ml-3 hover:cursor-pointer' onClick={()=>handleComplete(todo.id)}>✔️</span>
              <span className='ml-3 hover:cursor-pointer' onClick={()=>handleDelete(todo.id)}>🗑️</span>
            </div>
          </div>
      })
      }
    </div>
    </div>
  )
}

export default App
