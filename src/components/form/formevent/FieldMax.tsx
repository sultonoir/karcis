import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  handleChange: (values: any) => void;
  value: string;
}

const FieldMax = ({ handleChange, value }: Props) => {
  return (
    <Select onValueChange={handleChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Max" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Max ticket</SelectLabel>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5">5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FieldMax;
