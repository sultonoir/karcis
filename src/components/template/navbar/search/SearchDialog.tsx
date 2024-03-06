"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useOpen from "@/hooks/useOpen";
import { api } from "@/trpc/react";
import { ArrowLeft, Loader2, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchDialog = () => {
  const { onClose, isOpen } = useOpen();
  const { data, mutate, isLoading } = api.post.getSearch.useMutation();
  const handleSearch = useDebouncedCallback((term: string) => {
    if (term !== "") {
      mutate({
        title: term,
      });
    }
  }, 300);
  React.useLayoutEffect(() => {
    if (isOpen) {
      const originalStyle: string = window.getComputedStyle(
        document.body,
      ).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] block bg-background"
          onClick={onClose}
        >
          <div
            className="mt-10 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button size="icon" variant="ghost" onClick={onClose}>
              <ArrowLeft />
            </Button>
            <div className="relative mr-2 flex w-full">
              <Input
                placeholder="Search.."
                className="h-11 w-full px-4 py-3"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button
                size="icon"
                aria-label="pencarian"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" aria-label="pencarian" />
                ) : (
                  <SearchIcon aria-label="pencarian" />
                )}
              </Button>
            </div>
          </div>
          <div className="p-2">
            {data?.records.length ? (
              <ul className="overflow-hidden rounded-lg border bg-popover p-2">
                {data.records.map((item) => (
                  <li className="block w-full" key={item.record.id}>
                    <Link
                      href={`/event/${item.record.id}`}
                      className="flex gap-2 rounded-sm hover:bg-accent"
                    >
                      <div className="relative h-[50px] w-[100px]">
                        <Image
                          alt="content"
                          src={item.record.image?.url ?? "/logo.png"}
                          fill
                          className="rounded-sm object-cover"
                        />
                      </div>
                      <h3 className="truncate font-semibold">
                        {item.record.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center rounded-lg bg-popover p-2">
                {isLoading ? (
                  <Loader2 className="animate-spin" aria-label="pencarian" />
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
