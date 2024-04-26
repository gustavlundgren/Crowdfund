import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Register = () => {
  const USER_REGEX = /^(?=.*[A-Z])[A-Za-z]{4,10}$/;
  const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);

  const [errText, setErrText] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validUsername || !validPassword) {
      setErrText("Se till att ditt användarnamn och lösenord uppfyller kraven");
      return;
    }

    try {
      const res = await axios.post("/user/register", { username, password });
      console.log(res.data.token);

      localStorage.setItem("token", res.data.token);

      navigate("/login");
    } catch (err) {
      console.log(err);

      if (err.response?.status == 409) {
        setErrText("Användarnament är redan taget");
      } else if (err.response?.status == 500) {
        setErrText("Server fel");
      }
    }
  };

  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result, "user");
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PASS_REGEX.test(password);
    console.log(result, "pass");
    setValidPassword(result);
  }, [password]);

  return (
    <div className='container'>
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

        <button onClick={(e) => handleRegister(e)}>Register</button>
      </form>
    </div>
  );
};

export default Register;
