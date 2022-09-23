import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoutes';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Explore/>}></Route>
        <Route path="/offers" element={<Offers/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      </Routes>
      <Navbar/>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
