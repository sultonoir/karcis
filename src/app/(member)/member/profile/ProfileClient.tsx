"use client";
import Loader from "@/components/shared/Loader";
import FieldBanner from "@/components/template/form/formprofile/FieldBanner";
import FieldImageProfile from "@/components/template/form/formprofile/FieldImageProfile";
import FormProfile from "@/components/template/form/formprofile/FormProfile";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileClient = () => {
  const { data, isLoading } = api.user.getUser.useQuery();
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    router.replace("/login");
    return;
  }

  return (
    <div className="container max-w-screen-lg">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-2xl font-medium">Public profile</h3>
        <Link
          href="/"
          className="rounded-sm bg-accent px-3 py-1 text-center text-sm"
        >
          Go to your personal profile
        </Link>
      </div>
      <Separator />
      <FieldBanner banner={data.banner?.url} />
      <Separator />
      <div className="flex w-full flex-col gap-10 lg:flex-row">
        <FormProfile user={data} />
        <FieldImageProfile />
      </div>
    </div>
  );
};

export default ProfileClient;
