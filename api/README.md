Steps to make the app run
- Make a folder to contain PG db via docker volumes:
    - mkdir -p $Home/docker/volume/postgres
-Spin up a postgres DBMS on your local docker environment with a command such as:

-Update the knexfile.js with your PG DBMS connection details






*********************************
import './App.css';
import React, { useEffect, useState } from 'react';

const baseUrl = `http://localhost:5080/item`;

function App() {
  let [item, setItem] = useState([]);

  useEffect( () => {
    fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      setItem(data);
    });
  }, []);
  return (
  <div className='App'> 
      <h1>Home</h1>
  </div>
  )

}
export default App;
