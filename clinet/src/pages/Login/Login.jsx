import axios from "../../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errText, setErrText] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/user/login", { username, password });
      console.log(res.data);

      localStorage.setItem("id", res.data.user.id);

      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.response?.status == 400) {
        setErrText("Felaktiga inloggningsuppgifter");
      }

      if (err.response?.status == 401) {
        setErrText("Fel lösenord");
      }

      if (err.response?.status == 404) {
        setErrText("Ingen användare hittades med det användarnament");
      }

      if (err.response?.status == 500) {
        setErrText("Server fel");
      }
    }
  };

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Användarnamn'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type='password'
          placeholder='Lösenord'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <p>{errText}</p>
        <button onClick={(e) => handleLogin(e)}>Login</button>
      </form>
    </div>
  );
};

export default Login;
