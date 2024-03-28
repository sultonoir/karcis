"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "./ColumnHeader";
import { CheckCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export type Payment = {
  id: string;
  amount: number;
  ticket: number;
  status: string;
  email: string | null | undefined;
  userName: string | null | undefined;
  eventName: string | null | undefined;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userName",
    header: ({ column }) => <ColumnHeader column={column} title="User name" />,
  },
  {
    accessorKey: "eventName",
    header: "Event name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <ColumnHeader column={column} title="Amount" />,
  },
  {
    accessorKey: "ticket",
    header: ({ column }) => <ColumnHeader column={column} title="Ticket" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="status" />,
    cell: ({ row }) => {
      const payment = row.original;
      const element =
        payment.status === "done" ? (
          <div className="flex items-center gap-2">
            <CheckCircledIcon />
            done
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <StopwatchIcon />
            processing
          </div>
        );
      return element;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const ctx = api.useUtils();
      const setDone = api.revenue.setDone.useMutation({
        onSuccess: async () => {
          await ctx.revenue.getOrder.invalidate();
        },
      });
      const promise = async () => {
        await setDone.mutateAsync({
          id: payment.id,
        });
      };
      const handleClick = () => {
        toast.promise(promise, {
          loading: "Loading...",
          success: () => {
            return "customer has been check-in";
          },
          error: "Error",
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.email ?? "")}
            >
              Copy customer email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClick}>Check-in</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
