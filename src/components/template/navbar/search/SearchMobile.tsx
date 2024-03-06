"use client";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import React from "react";
import useOpen from "@/hooks/useOpen";

const SearchMobile = () => {
  const { onOpen, isOpen } = useOpen();
  console.log(isOpen);
  return (
    <section className="relative">
      <Button size="icon" onClick={onOpen}>
        <SearchIcon />
      </Button>
    </section>
  );
};

export default SearchMobile;
