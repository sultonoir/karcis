"use client";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import React from "react";
import useOpen from "@/hooks/useOpen";

const SearchMobile = () => {
  const { onOpen, isOpen } = useOpen();
  console.log(isOpen);
  return (
    <Button size="icon" onClick={onOpen} className="rounded-full lg:hidden">
      <SearchIcon />
    </Button>
  );
};

export default SearchMobile;
