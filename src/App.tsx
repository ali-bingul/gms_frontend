import './App.css';
import NavbarComponent from './components/common/NavbarComponent';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';
import ProjectsDataComponent from './components/project/ProjectsDataComponent';
import CreateProjectDataComponent from './components/project/CreateProjectDataComponent';

function App() {

  return (
    <div className='app'>
      <NavbarComponent />
      <HashRouter>
        <Routes>
          <Route path='/' element={<ProjectsDataComponent />} />
          <Route path='/projeler/yeni-kayit' element={<CreateProjectDataComponent />} />
          <Route path='/admin/login' element={<LoginComponent />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
