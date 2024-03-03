"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import usePayment from "@/hooks/usePayment";

const formSchema = z.object({
  cardNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string(),
  email: z.string(),
  CardName: z.string(),
  date: z.string(),
  cvc: z.string(),
});

const FormPayment = () => {
  const { data } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      email: data?.user.email ?? "Sultonnoir@gmail.com",
      name: data?.user.name ?? "Sulton",
      CardName: "",
      date: "",
      cvc: "",
    },
  });

  //create payment
  const { eventId, selected, amount, price } = usePayment();

  if (!eventId && !data) {
    redirect("/discover");
  }

  const payment = api.payment.createPayment.useMutation({
    onSuccess: () => {
      toast.success("payment created");
      router.replace("/");
      form.reset();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  function onSubmit() {
    payment.mutate({
      event: eventId,
      totalPrice: price,
      amount: amount,
      tiket: selected,
    });
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex-row gap-4">
        <span className="flex h-10 w-11 items-center justify-center rounded-lg border p-1">
          <CreditCardIcon />
        </span>
        <p className="text-lg font-bold">Debit / Credit Card</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <div className="flex w-full flex-col gap-2 lg:flex-row">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        disabled
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        disabled
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-5 lg:flex-row">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Expiration date (MM/YY)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                disabled={payment.isLoading}
                className="w-full"
                onClick={onSubmit}
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormPayment;
