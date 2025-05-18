import "./App.css";
import { useState,useEffect } from "react";

const Practice = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState(JSON.parse(localStorage.getItem("lists"))|| []);
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])
    
  console.log(favourites)
  
  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
    // console.log(e)
  };
  const addTask = () => {
    const addedItem = [
      ...list,
      { value: item, isDone: false, id: new Date().getTime() },
    ];
    setList(addedItem);
    setItem("");
  };

  const doneTask = (id) => {
    const selectedItem = list.map((task) => { //--> here we need same number of items that why we use map
      if (task.id === id) {
        task.isDone = !task.isDone;
        }
        return {...task}  // ***      ___ Remember it to return
        // return task     same thing as above
    });
    setList(selectedItem);
  };

    //*** Don't use map */
    // const removeTask = (id) => {
    //     const removeItem = list.map((task) => { // wrong can't do map bcoz it returns same amount of items
    //         if (task.id != id) return {...task} // here which task.id = id that means undefined and u r returning it to list
    //     })
    //     setList(removeItem)
    // }

    const removeTask = (id) => {
        const removeItem = list.filter((task) => {
            return task.id != id
        })
        setList(removeItem)
    }


    const handleEdit = (id, value) => {
        setEditText(value)
        setEditingId(id) //bocz when you click on that task so taht task won't remove it has to be there
    }

  
    const saveEditedText = (id) => {
        if (!editText.trim()) return
        
        const changeTask = list.map((task) => {
          if (task.id === id) {
            return { ...task, value: editText } //updated task value  task is an object that's why {} // remember to return an object
          }
          
          return task // ==> final task
        })
        // console.log(changeTask) --> all 3 array will be received including the changed ones
        
        setList(changeTask)
        setEditingId(null) //exit from there after saving
    }

  const favourTask = (id) => {
    if (!favourites.some((task) => task.id === id)) { //***** .some() checks if an element pass the test or not */
      const favouriteOnes = list.filter((task) => {
        return task.id === id
      })
    
      setFavourites([...favouriteOnes, ...favourites])
    }
  }
  

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(list))
        localStorage.setItem("favourites", JSON.stringify(favourites))
    },[list,favourites])
    
  return (
    <div className="font-bold w-6/12 mx-auto  p-10 text-center  h-screen ">
      <div>
        <input
          className="border p-3"
          type="text"
          onKeyDown={handleEnter}
          value={item}
          onChange={handleChange}
        ></input>
        <button className="border p-2 ml-3" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div>
      {favourites.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">⭐ Favourite Tasks</h2>
          {favourites.map((task) => (
            <div key={task.id} className="text-lg mt-2">
              {task.value}
            </div>
          ))}
        </div>
      )}
        {list.map((task) => {
          return (
            <div key={task.id}>
              
              <div className="font-bold text-2xl m-6">
                {editingId === task.id ? (
                  <div>
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEditedText(task.id)} />
                    <button className="m-2" onClick = {()=>saveEditedText(task.id)}>Save 💾</button>
                    <button className="m-2" onClick = {()=>setEditingId(null)}>Cancel ❌</button>
                  </div>
                ) : (
                  <div>
                      {task.isDone ? (
                       
                        
                      <span className="mr-9 line-through">{task.value}</span>
                ) : (
                  <>
                        <span className="hover:cursor-pointer" onClick={()=>favourTask(task.id)}>⭐</span>
                      <span className="mr-9">{task.value}</span></>
                    )}
                    <span className="m-2 hover:cursor-pointer" onClick={() => handleEdit(task.id, task.value)}>✍️</span>
                    <span
                      className="m-2 hover:cursor-pointer"
                      onClick={() => doneTask(task.id)}
                    >
                      ✔️
                    </span>
                      <span className="m-2 hover:cursor-pointer" onClick={() => removeTask(task.id)}>🗑️</span>
                      
                  </div>)}  
              </div>
              
            </div>
            
          );
        })}
      </div>
    </div>
  );
};

export default Practice;
