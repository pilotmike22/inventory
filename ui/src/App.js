import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Homepage from './Home';
import GuestDetail from './Guest_details';
import GuestInventory from './Guest_inventory';
import LoginPage from './Login';
import ManagerInventory from './Manager_inventory';
import ManagerDetail from './Manager_detail';
import ManagerAdd from './Manager_add_form';


function App(){
return (
  <div>
    <Router>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/Guest_details" element={<GuestDetail />} />
        <Route path="/Guest_inventory" element={<GuestInventory />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Manager_inventory" element={<ManagerInventory />} />
        <Route path="/Manager_detail" element={<ManagerDetail />} />
        <Route path="/Manager_add_form" element={<ManagerAdd />} />
      </Routes>
    </Router>
  </div>

)

}

export default App;