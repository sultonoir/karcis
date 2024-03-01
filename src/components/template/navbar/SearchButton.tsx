"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchButton = () => {
  return (
    <div className="relative hidden w-full max-w-[300px] md:flex">
      <Input
        placeholder="Find exciting events here"
        className="h-11 w-full px-4 py-3"
      />
      <Button
        size="icon"
        aria-label="search"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm"
      >
        <SearchIcon aria-label="search" />
      </Button>
    </div>
  );
};

export default SearchButton;
