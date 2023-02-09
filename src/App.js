import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import MyHeader from "./components/MyHeader";
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Todo from './pages/Todo';

import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Router>
    <div className="App">
      <MyHeader className="App-header" isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
