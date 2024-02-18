import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import Order from './Orders';

export const serverRoute = 'http://localhost:8080'
// export const serverRoute = 'https://api.sds-pnu.net'
// export const serverRoute = 'https://abshr-server.onrender.com'
// export const serverRoute = 'https://abshr-server-slfr.onrender.com'
export const token = localStorage.getItem('token')
function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route element={<Main/>} path='/'/>
            <Route element={<Login/>} path='/login'/>
            <Route element={<Order/>} path='/order/:id'/>
          </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
