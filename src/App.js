import index from './index';
import logo from './logo.svg';
import Register from './components/Register';
import Userdash from './components/Userdash';

import ForgotPass from "./components/ForgotPass";
import Signin from './components/Signin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  const loggedIn = window.localStorage.getItem('loggedIn');
  return (
    <main className="App">
      {/* <p>{!data ? "Loading..." : data}</p> */}

      <Router>
        <Routes>
          <Route path="/" element={loggedIn ? <Userdash /> : <Signin />} />
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="forgotpass" element={<ForgotPass />} />
          <Route path="signin" element={<Signin />} />

          <Route path="register" element={<Register />} />

          <Route path="userDash" element={<Userdash />} />
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Navigate replace to="/" /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;