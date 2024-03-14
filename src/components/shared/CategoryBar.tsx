"use client";
import { data } from "@/lib/data";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoryBar = () => {
  const params = useSearchParams();
  const category = params.get("category");
  return (
    <ul className="flex items-center justify-between py-2">
      <li className="container flex flex-1 flex-row gap-3 overflow-x-visible">
        {data.category.map((item) => (
          <Button key={item.label} variant="outline" asChild>
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
