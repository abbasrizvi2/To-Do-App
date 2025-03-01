/* eslint-disable react/prop-types */
import { useEffect,useState } from 'react'
import './App.css'



const Favourite = ({ Task, id }) => {
    const [favourites, setFavourites] = useState([])
    const [showfav, setShowFav] = useState(false)
    
    const handleShow = () => {
        setShowFav(!showfav)
    };

    const toggleFavourite = (id) => {                                    
        setFavourites((prevFavs) => {
            if (prevFavs.some((task) => task.id === id)) {
                // Remove if already in favourites
                return prevFavs.filter((task) => task.id !== id); //--> false krdo return yaha
            } else {
                // Add if not in favourites
                const favouriteOnes = Task.filter((task) => task.id === id); //filter because ye ek particular item deta hai
                return [...favouriteOnes ,...prevFavs];
            }
        });
    };
    // console.log(favourites)

/*
   * How toggleFavouriteWorks?
   * Assume  [{doctor, id:23} , {mango, id:29} , {nurse, id:76} , {apple, id:49} ]
   *           
   *    We have dummy data value and id
   *    now suppose ur favourites is empty at first []       
   *    wwhen u click on that id toggleFav call with that id         
   *     than setfav(prev) ==> setfav ko direct change toh nhi kr skte so we are using callBack fn here          
   *     setFav(prev) ==> means pehle kya item h isme so initial it is empty []                 
   *      prev.some() --> ye check krega ki ye id wala item already h ki nhi favourites array me  
   *      initial array empty h so ye return false krega mtlb else me jao
   *     jaha pe ye check krega ki click id wale ko id se match krega and usko prev jo ki empty h usme
   *    daal dega [...prev,favouriteOnes] and ye return kr dega setFavourites ko 
   * 
   *   now when u clkick again on that star button of selected fav task
   *    ye check krega [23] prev me rhegi
   *    [23].sum() --> dkhega ki h jo click kiya h uski id ye id same h
   *    ye if wale me jaega and [23].filter 23!=23 isme mtlb false h kyuki 23==23 true hota hai value toh return kch hnhi krega
   *   agar true hota toh ye value prev[] isme chli jati yahi se humri value hat gyi
   * 
*/

    useEffect(() => {
        toggleFavourite(id)
    }, [id]); 
  
    return (
        <div>
            <h2 onClick={handleShow} className='hover:cursor-pointer'>Favourites</h2>
            {showfav && (favourites.map((task) => {
                return <div key={task.id} className='text-red-400'>{task.value}</div>
            }))}
                
        </div> 
)            
}

export default Favourite