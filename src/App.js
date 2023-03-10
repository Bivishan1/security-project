import index from './index';
import logo from './logo.svg';
import Register from './components/Register';

import ForgotPass from "./components/ForgotPass";
import Signin from './components/Signin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://bivishan8686:jsxvH01MtNg46E5v@cluster0.y5o1jak.mongodb.net/?retryWrites=true&w=majority";

function App() {

  mongoose.connect(mongoURL, {
    useNewUrlParser: true
  }).then(() => {
    console.log("Connected to database.");
  }).catch((e) => console.log(e));

  // require("./userDetails");

  const User = mongoose.model("UserInfo");

  app.post("/register", async (req, res) => {
    const { uname, email, password } = req.body;

    try {
      await User.create({
        username: uname,
        email,
        password,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: 'Error' })
    }
  })

  app.listen(5000, () => {
    console.log("server started");
  })

  return (
    <main className="App">
      {/* <p>{!data ? "Loading..." : data}</p> */}

      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="forgotpass" element={<ForgotPass />} />
          <Route path="signin" element={<Signin />} />

          <Route path="register" element={<Register />} />
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