import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtonAppBar from './ButtonAppBar';
import Home from './pages/home';
import Signup from './pages/Signup';
import AddForm from './pages/addForm';
import Update from './pages/update';
import View from './pages/view';
import Login from './pages/Login';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
      
        <Routes>
          <Route path="/" element={<ButtonAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/addform" element={<AddForm />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/view/:id" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;   