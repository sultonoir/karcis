"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative flex w-full max-w-md">
      <Input
        placeholder="Find exciting events here"
        className="h-11 w-full px-4 py-3"
        onClick={() => setOpen(!open)}
      />
      <Button
        size="icon"
        aria-label="search"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm"
      >
        <SearchIcon aria-label="search" />
      </Button>
      <div
        className={cn(
          "absolute -bottom-8 right-0 block w-full rounded-lg border bg-popover shadow-md",
        )}
      >
        hallo
      </div>
    </div>
  );
};

export default SearchButton;
