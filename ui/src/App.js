import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const baseUrl = `http://localhost:5080/users`;

function App() {
  let [users, setUser] = useState([]);

  useEffect( () => {
    fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
    });
  });
  return (
    <div className="App">
      {JSON.stringify(users)};
    </div>
  );
}

export default App;
