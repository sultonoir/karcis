import React from "react";
import { AlertCircle, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  handleChange: (values: any) => void;
  value: string[];
}

const FieldTag = ({ handleChange, value }: Props) => {
  const [tag, setTag] = React.useState<string[]>(value);

  //handle tag
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const start: string[] = [];
      const value = e.currentTarget.value.trim(); // Use currentTarget to access the input element
      if (value !== "" && tag.length <= 4) {
        start.push(value);
        setTag([...tag, ...start]);
        handleChange([...tag, ...start]);
        e.currentTarget.value = "";
      }
    }
  };

  const handleDeleteTag = (id: string) => {
    const newTag = [...tag];
    const updatedTags = newTag.filter((item) => item !== id);
    setTag(updatedTags);
  };

  return (
    <div className="my-2 flex flex-col gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <AnimatePresence>
          {tag.map((item, index) => (
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteTag(item);
              }}
              className="flex cursor-pointer gap-2 rounded-full border py-1 pl-3 pr-1"
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5, // mengatur durasi transisi
                ease: "easeInOut", // menetapkan jenis transisi
              }}
            >
              {item}
              <XIcon />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative">
        <Input
          placeholder="Tag"
          className="rounded-none border-x-0 border-b border-t-0 border-muted-foreground pb-2 pl-0 shadow-none focus:ring-0"
          onKeyDown={handleKey}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={(e) => e.preventDefault()}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <AlertCircle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Max tag is 5</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default FieldTag;
