import React ,{useEffect,useState} from 'react';
import './componets/characters/Character.css'
import './App.css';
import Navbar from './componets/Navbar/Navbar';
import CharacterTable from './componets/characters/CharacterTable';
import axios from 'axios'
import Search from './componets/characters/Search'



const hash =  "bd0722d5750b6362d5ba0212ca36726b"
const timeStamp = '1634386711';


function App() {
  <div className="App">
 
  </div>

  const[items,setItems] = useState([])
  const[isLoading,setLoading] = useState(false)
  const [query,setQuery] = useState('false')

  useEffect(()=>{
      const fetch = async()=>{
        if(query===''){
          // checking if favorites array is empty or does not exist
          if(localStorage.getItem('favorites')==='[]' || !localStorage.getItem('favorites')){
            localStorage.setItem('favorites', '[]')
            const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${hash}`)
            console.log(result.data.data.results)
            setItems(result.data.data.results)
            setLoading(false) 
          }else{
            let favorite = JSON.parse(localStorage.getItem('favorites'))
            setItems(favorite)
            setLoading(true)
          }
          
          
        }else{
          const result = await axios(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${hash}`)
          console.log(result.data.data.results)
          setItems(result.data.data.results)
          setLoading(false)
        }
      
    }

    fetch()
  },[query])

  return (
    <div className="container">
      <Navbar/>
      <Search search={(q)=>setQuery(q)}></Search>
      <CharacterTable items={items} isLoading={isLoading}/>
    </div>
    
  );
  
}

 
export default App
