
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import Login from '../components/Login';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateRouters';
import NotFound from './NotFound';

const AppRouters = () => {
    return(
        <>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route 
                path='/users'
                element={
                    <PrivateRoute >
                        <TableUsers/>
                    </PrivateRoute>
                }
              ></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </>
    )
}

export default AppRouters;