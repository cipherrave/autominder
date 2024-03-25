import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "../components/mode-toggle";

const baseURL = "http://localhost:8989/register";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  function navLogin() {
    nav("/login");
  }
  function navHome() {
    nav("/");
  }

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      setIsLoading(true);
      const response = await axios.post(baseURL, values);
      nav("/login");
    } catch (error) {
      alert("Registration failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto w-[350px] gap-6">
          <div>
            <ModeToggle></ModeToggle>
          </div>
          <div className="flex flex-col gap-2 text-start">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="text-balance text-muted-foreground">
              Let's get you started.
            </p>
          </div>
          <br></br>
          <Tabs defaultValue="personal" className="flex- grow w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <br />
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="fname">First Name</Label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        id="fname"
                        name="fname"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lname">Last Name</Label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        id="lname"
                        name="lname"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                      />
                    </div>
                    <input
                      type="checkbox"
                      placeholder="company"
                      id="company"
                      name="company"
                      className="hidden"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="company">
              <Card>
                <form onSubmit={handleSubmit}>
                  <br />

                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input
                        type="text"
                        id="company_name"
                        name="company_name"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                      />
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      placeholder="company"
                      id="company"
                      name="company"
                      className="hidden"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled={isLoading}
                      value={isLoading ? "Registering..." : "Register"}
                      type="submit"
                      className="w-full"
                    >
                      Create Account{" "}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="col-span-6 w-96 p-6">
            <p className="text-sm">
              By creating an account, you agree to our{" "}
              <Dialog>
                <DialogTrigger className="underline">
                  terms and condition
                </DialogTrigger>
                <DialogContent className="w-11/12 p-6 align-middle">
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[500px]">
                    <DialogDescription>
                      <b>Introduction</b>
                      <br />
                      Welcome to AutoMinder ("we", "our", "us")! As you have
                      just clicked our Terms of Service, please pause, grab a
                      cup of coffee and carefully read the following pages. It
                      will take you approximately 20 minutes.
                      <br></br>
                      <br></br>
                      <li>
                        <b>These Terms and Conditions </b>("Terms", "Terms and
                        Conditions") govern your relationship with AutoMinder
                        website (the "Service") operated by cipherrave
                        Industries Sdn Bhd ("us", "we", or "our").
                      </li>
                      <br />
                      <li>
                        <b>Acceptance of Terms</b>
                        <br />
                        By accessing and using the Service, you acknowledge that
                        you have read, understood, and agree to be bound by
                        these Terms and Conditions and our Privacy Policy, which
                        is hereby incorporated by reference (collectively, these
                        "Terms"). If you do not accept these Terms, then you may
                        not use the Service.
                      </li>
                      <br />
                      <li>
                        <b>Changes to Terms</b>
                        <br></br>
                        We reserve the right, at our sole discretion, to modify
                        or replace these Terms at any time. If a revision is
                        material we will make reasonable efforts to provide at
                        least 30 days' notice prior to any new terms taking
                        effect. What constitutes a material change will be
                        determined at our sole discretion.
                      </li>
                      <br />
                      <li>
                        <b>Content</b>
                        <br></br>
                        Our Service allows you to post, link, store, share and
                        otherwise make available certain information, text,
                        graphics, videos, or other material ("Content"). You are
                        responsible for the Content that you post to the
                        Service, including its legality, reliability, and
                        appropriateness.
                      </li>
                      <br />
                      <li>
                        <b>Termination</b>
                        <br />
                        We may terminate or suspend your account immediately,
                        without prior notice or liability, for any reason
                        whatsoever, including without limitation if you breach
                        the Terms.
                      </li>
                      <br />
                      <li>
                        <b>Governing Law </b>
                        <br />
                        These Terms shall be governed and construed in
                        accordance with the laws of Isketambola, without regard
                        to its conflict of law provisions.
                      </li>
                      <br />
                      <li>
                        <b> Contact Us</b>
                        <br />
                        If you have any questions about these Terms, please
                        contact us at arif_akmal@hotmail.com.
                      </li>
                    </DialogDescription>
                  </ScrollArea>
                </DialogContent>
              </Dialog>{" "}
              and{" "}
              <Dialog>
                <DialogTrigger className="underline">
                  privacy policy{" "}
                </DialogTrigger>
                <DialogContent className="w-11/12 p-6 align-middle">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[500px]">
                    <DialogDescription>
                      <b>Introduction</b>
                      <br />
                      Welcome to **cipherrave Industries Sdn Bhd** ("we", "our",
                      "us")! We are committed to protecting your personal
                      information and your right to privacy. If you have any
                      questions or concerns about our policy, or our practices
                      with regards to your personal information, please contact
                      us at arif_akmal@hotmail.com.
                      <br></br>
                      <br></br>
                      <li>
                        <b>Information We Collect </b>
                        <br />
                        We collect personal information that you voluntarily
                        provide to us when you express an interest in obtaining
                        information about us or our products and services, when
                        you participate in activities on the **AutoMinder**
                        website (the "Website") or otherwise when you contact
                        us.
                      </li>
                      <br />
                      <li>
                        <b>Use of Your Information</b>
                        <br />
                        We use personal information collected via our Website
                        for a variety of business purposes described below. We
                        process your personal information for these purposes in
                        reliance on our legitimate business interests, in order
                        to enter into or perform a contract with you, with your
                        consent, and/or for compliance with our legal
                        obligations.
                      </li>
                      <br />
                      <li>
                        <b>Disclosure of Your Information</b>
                        <br></br>
                        We may share, sell, and disclose your information in the
                        situations described below:
                      </li>
                      <br />
                      **Vendors, Consultants and Other Third-Party Service
                      Providers.** We may share your data with third-party
                      vendors, service providers, contractors or agents who
                      perform services for us or on our behalf and require
                      access to such information to do that work.
                      <br />
                      <br />
                      <li>
                        <b>Security of Your Information</b>
                        <br />
                        We use administrative, technical, and physical security
                        measures to help protect your personal information.
                        While we have taken reasonable steps to secure the
                        personal information you provide to us, please be aware
                        that despite our efforts, no security measures are
                        perfect or impenetrable, and no method of data
                        transmission can be guaranteed against any interception
                        or other type of misuse.
                      </li>
                      <br />
                      <li>
                        <b> Contact Us</b>
                        <br />
                        If you have any questions about these Privacy Policy,
                        please contact us at arif_akmal@hotmail.com.
                      </li>
                    </DialogDescription>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              .
            </p>
            <br />

            <p className="mt-4 text-sm sm:mt-0">
              Already have an account?{" "}
              <a onClick={navLogin} className="underline cursor-pointer">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-slate-400"
        />
      </div>
    </div>
  );
}

export default Register;
