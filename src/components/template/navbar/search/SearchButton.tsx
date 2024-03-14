"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Loader2, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchButton = () => {
  const [open, setOpen] = React.useState(false);
  const { data, mutate, isLoading } = api.post.getSearch.useMutation();
  const handleSearch = useDebouncedCallback((term: string) => {
    if (term !== "") {
      mutate({
        title: term,
      });
    }
  }, 300);

  return (
    <div className="relative hidden w-[140px] basis-2/3 sm:w-full lg:flex lg:max-w-md">
      <Input
        placeholder="Search.."
        className="h-11 w-full px-4 py-3"
        onChange={(e) => handleSearch(e.target.value)}
        onClick={() => {
          setOpen(!open);
        }}
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
      {open && (
        <>
          <div
            className="fixed left-0 right-0 top-0 z-10 block h-screen bg-transparent"
            onClick={() => setOpen(!open)}
          />
          <div
            className={cn("absolute -bottom-12 right-0 z-20 block size-full", {
              hidden: data?.records.length === 0,
            })}
          >
            {!data ? null : (
              <>
                {data?.records.length ? (
                  <ul className="flex flex-col gap-2 overflow-hidden rounded-lg border bg-popover p-2 shadow-md">
                    {data.records.map((item) => (
                      <li
                        className="block w-full"
                        key={item.record.id}
                        onClick={() => setOpen(!open)}
                      >
                        <Link
                          href={`/event/${item.record.id}`}
                          className="flex gap-2 rounded-sm p-2 hover:bg-accent"
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
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-lg bg-popover p-2 shadow-md",
                      {
                        hidden: data?.records.length === 0,
                      },
                    )}
                  >
                    {isLoading ? (
                      <Loader2
                        className="animate-spin"
                        aria-label="pencarian"
                      />
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchButton;
