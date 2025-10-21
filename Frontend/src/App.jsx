import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Login from './components/Login';
import Register from "./components/Register";
import Home from './components/Home';
import FavoriteMeals from './components/FavoriteMeals';
import ProtectedRoute from './components/ProtectedRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return(
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
               path='/home'
               element={<ProtectedRoute>
                <Home />
               </ProtectedRoute>} 
          />
           <Route
                 path='/favorites'
                 element={<ProtectedRoute>
                  <FavoriteMeals />
                 </ProtectedRoute>}
            />
        </Routes>
      </Router>
      <ToastContainer hideProgressBar={true} autoClose={2000} position='bottom-right' />
    </>
  )
};

export default App;