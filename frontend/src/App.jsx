import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="h-full px-5">
      <BrowserRouter>
      <Login />
      </BrowserRouter>
    </div>
  );
}

export default App
