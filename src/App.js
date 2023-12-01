import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from 'pages/login/Index.jsx'
import Dashboard from 'pages/dashboard/index.jsx'
import ProjectView from 'pages/projectView/index.jsx'
import 'dayjs/locale/pt-br'

const App = () => (
  <div style={{ backgroundColor: 'white', height: '100vh'}} className="App" >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='projectview/:id' element={<ProjectView />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
