import './App.css';
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import Routes from './Routes'
import jwt from 'jsonwebtoken'
import {useState} from 'react'
import JoblyApi from './axios'

function App() {

  
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
