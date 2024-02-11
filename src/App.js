import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

import Search from './components/search/search';
import Restaurants from './components/restaurants/restaurants';

function App() {
  const [searched, setSearch] = useState("");
  const [data, setData] = useState([])

  const searchedInput = (value) => {
    setSearch(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        let response = await axios.get('http://localhost:3001/restaurant')
        setData(response.data)
      }catch(err){
        console.log(err);
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <Search cb = {searchedInput} />
      <Restaurants searchedValue = {searched} data = {data}/>
    </div>
  );
}

export default App;
