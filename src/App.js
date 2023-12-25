
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, BrowserRouter } from 'react-router-dom';

import { urlBackend } from './helpers/credentials';
import HeaderBlock from './components/HeaderBlock';
import Home from './pages/home';
import InfosContact from './pages/infosContact';
import Login from './pages/Login';
import { user } from './helpers/credentials';
import CreateContact from './pages/createContact';
import SignUp from './pages/SignUp';


function App() {

  // const navigate = useNavigate()
  const [user, setUser] = useState()

  return (
    <div>
      {user && <HeaderBlock username={user.nom} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home setUser={setUser} />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/about" element={<InfosContact />} />
          <Route path="/createContact" element={<CreateContact />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<div><h1>404 page not found</h1></div>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
