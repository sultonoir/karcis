"use client";
import React from "react";
import { FcGoogle, FcKey } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import RippleButton from "../ui/RippleButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const FormOauthButton = () => {
  const [isLoading, setIsLoading] = React.useState({
    github: false,
    demo: false,
  });
  const router = useRouter();
  return (
    <div className="mt-3 flex flex-col gap-1">
      <RippleButton
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
      </RippleButton>
      <RippleButton
        isLoading={isLoading.github}
        variant="outline"
        onClick={async () => {
          setIsLoading({
            ...isLoading,
            github: true,
          });
          await signIn("github", {
            redirect: true,
            callbackUrl: "/",
          }).then((callback) => {
            if (callback?.ok) {
              setIsLoading({
                ...isLoading,
                github: false,
              });
              router.push("/");
            }
            if (callback?.error) {
              toast.error(callback.error);
              setIsLoading({
                ...isLoading,
                github: false,
              });
            }
          });
        }}
      >
        <FaGithub className="mr-2" />
        Signin with github
      </RippleButton>
      <RippleButton
        variant="outline"
        isLoading={isLoading.demo}
        onClick={async () => {
          setIsLoading({
            ...isLoading,
            demo: true,
          });
          await signIn("signin", {
            email: "sulton@gmail.com",
            redirect: false,
          }).then((callback) => {
            if (callback?.ok) {
              setIsLoading({
                ...isLoading,
                demo: false,
              });
              router.push("/");
            }
            if (callback?.error) {
              toast.error(callback.error);
              setIsLoading({
                ...isLoading,
                demo: false,
              });
            }
          });
        }}
      >
        <FcKey className="mr-2" />
        try demo account
      </RippleButton>
    </div>
  );
};

export default FormOauthButton;
