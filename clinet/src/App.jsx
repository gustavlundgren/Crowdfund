import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='login' element={<Login />} />
      <Route exact path='register' element={<Register />} />
      <Route exact path='profile' element={<Profile />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
