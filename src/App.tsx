import './App.css';
import NavbarComponent from './components/common/NavbarComponent';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';
import ProjectsDataComponent from './components/project/ProjectsDataComponent';
import CreateProjectDataComponent from './components/project/CreateProjectDataComponent';
import HomeComponent from './components/common/HomeComponent';
import CreateLessonDataComponent from './components/lesson/CreateLessonDataComponent';
import ProjectDataDetailComponent from './components/project/ProjectDataDetailComponent';

function App() {

  return (
    <div className='app'>
      <NavbarComponent />
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/projeler/:lessonName/:lessonId' element={<ProjectsDataComponent />} />
          <Route path='/proje-detay/:projectId' element={<ProjectDataDetailComponent />} />
          <Route path='/projeler/yeni-kayit' element={<CreateProjectDataComponent />} />
          <Route path='/admin/login' element={<LoginComponent />} />
          <Route path='/admin/dersler/yeni-kayit' element={<CreateLessonDataComponent />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
