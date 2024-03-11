import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  function navLogin() {
    nav("/login");
  }

  function navSignup() {
    nav("/signup");
  }
  function navDashboard() {
    nav("/dashboard");
  }
  return (
    <div>
      <div class="content">
        <h1>AutoMinder</h1>
        <h4>Still a work in progress. Stay tuned!</h4>
        <button onClick={navLogin}>Login</button>
        <button onClick={navSignup}>Sign Up</button>
        <button onClick={navDashboard}>Dashboard</button>
      </div>
      <footer>
        Buatan Malaysia by <a href="https://cipherrave.github.io">cipherrave</a>
      </footer>
    </div>
  );
}

export default Home;
