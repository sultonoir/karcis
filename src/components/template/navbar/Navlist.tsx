"use client";
import { dummy } from "@/lib/data";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import useSelectSection from "@/hooks/useSelectSection";

const Navlist = () => {
  const { setActiveSection, setTimeOfLastClick, activeSection } =
    useSelectSection();
  return (
    <ul
      className="hidden w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium sm:w-[initial] sm:flex-nowrap sm:gap-2 lg:flex"
      onMouseLeave={() => {
        setActiveSection("");
        setTimeOfLastClick(Date.now());
      }}
    >
      {dummy.navbar.map((link) => (
        <motion.li
          className="relative flex items-center justify-center"
          key={link.path}
        >
          <Link
            className={clsx(
              "group flex h-9 w-full items-center justify-center gap-2 px-4 py-2 transition",
              {
                "text-primary": activeSection === link.title,
              },
            )}
            href={link.path}
            onMouseEnter={() => {
              setActiveSection(link.title);
              setTimeOfLastClick(Date.now());
            }}
            onClick={() => {
              setActiveSection(link.title);
              setTimeOfLastClick(Date.now());
            }}
          >
            <link.icon />
            {link.title}
            {link.title === activeSection && (
              <motion.span
                className="absolute inset-0 -z-10 rounded-md bg-primary/20"
                layoutId="activeSection"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              ></motion.span>
            )}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default Navlist;
