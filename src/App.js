import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Todo from './pages/Todo';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header"/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
