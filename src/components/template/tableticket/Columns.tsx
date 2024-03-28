"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CheckCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";

import { ColumnHeader } from "../order/ColumnHeader";

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
];
