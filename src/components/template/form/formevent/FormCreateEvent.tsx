"use client";

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
import FieldImage from "./FieldImage";
import FieldTag from "./FieldTag";
import User from "@/components/shared/User";
import { Building2, MapPinIcon, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FieldTicket from "./FieldTicket";
import Editor from "@/components/shared/Editor";
import TicketCard from "@/components/shared/TicketCard";
import FieldMax from "./FieldMax";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import FieldDate from "./FieldDate";
import { useRouter } from "next/navigation";
import { type Session } from "next-auth";
import FieldCategory from "./FieldCategory";
import FieldTime from "./FieldTime";
import { eventSchema } from "@/types";

interface Props {
  user: Session | null;
}

export default function FormCreateEvent({ user }: Props) {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      image: "",
      title: "",
      category: "",
      tag: [],
      date: {
        start: new Date(),
        end: new Date(),
      },
      time: "",
      place: "",
      location: "",
      ticket: [],
      oneBuy: false,
    },
  });

  // 2. Define a submit handler.
  const router = useRouter();
  const create = api.post.postEvent.useMutation({
    onSuccess: (e) => {
      toast.success("Event created");
      form.reset();
      router.push(`/event/${e}`);
    },
    onError(opts) {
      toast.error(opts.message);
    },
  });
  function onSubmit(values: z.infer<typeof eventSchema>) {
    create.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg border shadow-sm">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FieldImage handleChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-2 p-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title event*"
                      className="border-none pl-0 shadow-none focus:ring-0 lg:h-20 lg:text-4xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FieldCategory handleChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FieldTag
                      value={field.value}
                      handleChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-between gap-y-3 lg:flex-row">
              <div className="flex flex-col gap-5">
                <h3>Hosted By</h3>
                <User
                  avatar={user?.user?.image ?? "/logo.png"}
                  name={user?.user?.name ?? "user"}
                  description={user?.user?.email}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>Date and time</h3>
                <div className="flex flex-col gap-2 lg:flex-row">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FieldDate handleChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FieldTime handleTimeChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex h-full flex-col gap-2">
                <h3>Locations</h3>
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center rounded-md border focus-within:border-primary/50 focus-within:ring focus-within:ring-primary/30">
                          <span className="pl-2">
                            <Building2 size={16} />
                          </span>
                          <Input
                            {...field}
                            placeholder="Place"
                            className="border-none pl-2 focus:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center rounded-md border focus-within:border-primary/50 focus-within:ring focus-within:ring-primary/30">
                          <span className="pl-2">
                            <MapPinIcon size={16} />
                          </span>
                          <Input
                            {...field}
                            placeholder="Address"
                            className="border-none pl-2 focus:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="ticket">
          <TabsList className="h-16 w-full justify-between">
            <TabsTrigger
              className="flex h-14 w-full justify-center"
              value="ticket"
            >
              Ticket
            </TabsTrigger>
            <TabsTrigger
              className="flex h-14 w-full justify-center"
              value="description"
            >
              Description
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ticket">
            <div className="mt-4 grid gap-2">
              <FormField
                control={form.control}
                name="ticket"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        {field.value
                          .sort((a, b) => {
                            const itemA = parseInt(a.price);
                            const itemB = parseInt(b.price);
                            return itemA - itemB;
                          })
                          .map((item) => (
                            <TicketCard
                              key={item.title}
                              value={item}
                              actions={
                                <div className="flex gap-2">
                                  <FieldTicket
                                    values={field.value}
                                    mode="edit"
                                    editValues={item}
                                    handleChange={field.onChange}
                                  />
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => {
                                      const newValues = [...field.value];
                                      const updateValue = newValues.filter(
                                        (i) => i.title !== item.title,
                                      );
                                      field.onChange(updateValue);
                                    }}
                                  >
                                    <Trash />
                                  </Button>
                                </div>
                              }
                            />
                          ))}
                        <FieldTicket
                          values={field.value}
                          mode="create"
                          handleChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h3 className="text-3xl">Additional Settings</h3>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 flex-col">
                  <p>Max amount tickets per transaction</p>
                  <p className="text-muted-foreground">
                    Maximum number of tickets that can be purchased in 1
                    transaction
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="max"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FieldMax
                          value={field.value}
                          handleChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 flex-col">
                  <p>1 email account - 1 transaction</p>
                  <p className="text-muted-foreground">
                    1 email account can only make 1 purchase transaction ticket.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="oneBuy"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="description">
            <div className="flex size-full flex-col gap-5">
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Description</FormLabel>
                    <FormControl>
                      <Editor values={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">
                      Terms and conditions
                    </FormLabel>
                    <FormControl>
                      <Editor values={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
        <div className="sticky bottom-[64px] left-0 h-20 w-full border-t bg-background lg:bottom-0">
          <div className="flex size-full items-center justify-between">
            <p>Just one more step and your event is created.</p>
            <div className="flex gap-2">
              <Button
                disabled={create.isLoading}
                type="submit"
                className="gap-2"
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
