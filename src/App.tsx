import './App.css';
import NavbarComponent from './components/common/NavbarComponent';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';
import ProjectsDataComponent from './components/project/ProjectsDataComponent';
import CreateProjectDataComponent from './components/project/CreateProjectDataComponent';
import HomeComponent from './components/common/HomeComponent';
import CreateLessonDataComponent from './components/lesson/CreateLessonDataComponent';
import ProjectDataDetailComponent from './components/project/ProjectDataDetailComponent';
import UsersDataComponent from './components/user/UsersDataComponent';
import UserDataDetailComponent from './components/user/UserDataDetailComponent';

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
          <Route path='/kullanicilar' element={<UsersDataComponent />} />
          <Route path='/kullanicilar/:userId' element={<UserDataDetailComponent />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
