import { useState } from 'react';
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import { Routes, Route, HashRouter, BrowserRouter } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path='/admin/login' element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
