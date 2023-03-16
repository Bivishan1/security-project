import index from './index';
import logo from './logo.svg';
import Register from './components/Register';
import Userdash from './components/Userdash';
import Verify from './components/Verify';
import ForgotPass from "./components/ForgotPass";
import Signin from './components/Signin';
import { useParams } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const { userId } = useParams();
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
          {/* <Route path="/verify" render={(props) => <Verify {...props} userId={userId} />} /> */}
          <Route exact path="verify/:id" element={<Verify />} />
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