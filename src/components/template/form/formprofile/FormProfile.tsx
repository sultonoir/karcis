"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/types";
import { type NextauthUsers } from "@/xata";
import Editor from "@/components/shared/Editor";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type ProfileSchema = z.infer<typeof profileSchema>;

interface Props {
  user: NextauthUsers;
}

const FormProfile = ({ user }: Props) => {
  const { update, data } = useSession();
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email ?? "",
      name: user.name ?? "",
      about: user.about ?? "",
      instagram: user.instagram ?? "",
      tiktok: user.tiktok ?? "",
      twitter: user.twitter ?? "",
      facebook: user.facebook ?? "",
    },
  });

  const ctx = api.useUtils();
  const router = useRouter();
  const updateUser = api.user.updateUser.useMutation({
    onSuccess: async (e) => {
      if (e !== user.name) {
        await update({ name: e, image: data?.user.image });
        router.refresh();
      }
      await ctx.user.getUser.invalidate();
      toast.success("Profile updated");
      form.reset();
    },
    onError: () => {
      toast.error("Error updated");
    },
  });
  function onSubmit(values: ProfileSchema) {
    updateUser.mutate(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="order-2 flex-1 space-y-8 pt-5 lg:order-1"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Editor values={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiktok Username</FormLabel>
              <FormControl>
                <Input placeholder="https://tiktok.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Username</FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter Username</FormLabel>
              <FormControl>
                <Input placeholder="https://twitter.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook URL</FormLabel>
              <FormControl>
                <Input placeholder="https://facebook.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={updateUser.isLoading}
          className={cn({ "gap-2": updateUser.isLoading })}
        >
          {updateUser.isLoading ? (
            <>
              <Loader2Icon className="animate-spin" />
              <span>Update profile</span>
            </>
          ) : (
            <>Update profile</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormProfile;
