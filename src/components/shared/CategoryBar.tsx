"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { dummy } from "@/lib/data";

const CategoryBar = () => {
  const params = useSearchParams();
  const category = params.get("category");
  return (
    <ul className="flex items-center justify-between overflow-x-auto">
      <li className="flex flex-1 flex-row gap-3 py-2">
        {dummy.category.map((item) => (
          <Button
            key={item.label}
            variant={item.value === category ? "secondary" : "outline"}
            asChild
          >
            <Link
              href={
                item.value === category
                  ? {
                      pathname: "/discover",
                    }
                  : {
                      pathname: "/discover",
                      query: { category: item.value },
                    }
              }
            >
              {item.label}
            </Link>
          </Button>
        ))}
      </li>
    </ul>
  );
};

export default CategoryBar;
