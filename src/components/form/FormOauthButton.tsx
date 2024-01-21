"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle, FcKey } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
const FormOauthButton = () => {
  return (
    <div className="mt-3 flex flex-col gap-1">
      <Button
        variant="outline"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
            redirect: true,
          })
        }
      >
        <FcGoogle className="mr-2" />
        Signin with google
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          signIn("github", {
            redirect: true,
            callbackUrl: "/",
          })
        }
      >
        <FaGithub className="mr-2" />
        Signin with github
      </Button>
      <Button variant="outline">
        <FcKey className="mr-2" />
        try demo account
      </Button>
    </div>
  );
};

export default FormOauthButton;
