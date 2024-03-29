import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModeToggle from "../components/mode-toggle";
import AutominderLogo from "../assets/icons/autominder";

function LoginAdmin() {
  const nav = useNavigate();

  function navHome() {
    nav("/");
  }

  function navRegisterAdmin() {
    nav("/admin/register");
  }

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      const response = await axios.post(
        "https://autominder-backend.onrender.com/admin/login",
        values
      );
      const token = response.data.token;
      // Save the token to local storage to call private APIs
      localStorage.setItem("token", token);
      nav("/admin/dashboard");
    } catch (error) {
      alert(
        "Login failed. Make sure email and password are entered correctly."
      );
      console.error(error);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex justify-end">
            <ModeToggle></ModeToggle>
          </div>
          <div className="flex flex-col gap-2 text-start">
            <AutominderLogo></AutominderLogo>
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="text-balance text-muted-foreground">
              Let's get you back in, admin.
            </p>
          </div>
          <Card className="flex-grow w-full">
            <form onSubmit={handleSubmit}>
              <br></br>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Log In
                </Button>
              </CardFooter>
            </form>
          </Card>
          <div className="mt-4 text-start text-sm">
            Don&apos;t have an account?{" "}
            <a onClick={navRegisterAdmin} className="underline cursor-pointer">
              Register as Admin{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
