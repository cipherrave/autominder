import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const nav = useNavigate();
  function navSignup() {
    nav("/signup");
  }
  function navDashboard() {
    nav("/dashboard");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());

    try {
      const response = await axios.post("localhost", values);
      const token = response.data.jwt;
      // Save the token to local storage to call private APIs
      localStorage.setItem("token", token);

      navDashboard();
      alert("Logged in successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or username"
            name="identifier"
          />
          <input type="password" placeholder="Password" name="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
