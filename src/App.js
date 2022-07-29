import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Apply from './Pages/Apply';
import Profile from './Pages/Profile';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"
import "./App.css";
function App() {

  return (

    <div className="App">
      <div className='overlay-1' ></div>

    <Router>

      <Navbar/>

        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/apply' element={<Apply/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>

    </Router>



    </div>

  );
}

export default App;
