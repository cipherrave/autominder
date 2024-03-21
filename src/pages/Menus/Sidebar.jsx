import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();
  function navDash() {
    nav("/dashboard");
  }
  function navGarage() {
    nav("/garage");
  }
  function navService() {
    nav("/service");
  }

  return (
    <div className="flex-row flex">
      <div className="text-blue-500 flex items-center justify-center">
        <img></img>
      </div>
    </div>
  );
}
