import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { data } from "@/lib/data";

interface Props {
  handleTimeChange: (value: string) => void;
}

const TimePicker = ({ handleTimeChange }: Props) => {
  const [hour, setHour] = useState("00");
  const [minut, setMinut] = useState("00");
  const [diference, setDiference] = useState("am");

  useEffect(() => {
    const time = `${hour} - ${minut} ${diference}`;
    handleTimeChange(time);
  }, [hour, minut, diference, handleTimeChange]);

  return (
    <div className="flex gap-2">
      <Select value={hour} onValueChange={setHour}>
        <SelectTrigger>
          <SelectValue placeholder="00" />
        </SelectTrigger>
        <SelectContent>
          {data.hour.map((item) => (
            <SelectItem value={item.value} key={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={minut} onValueChange={setMinut}>
        <SelectTrigger>
          <SelectValue placeholder="00" />
        </SelectTrigger>
        <SelectContent>
          {data.minut.map((item) => (
            <SelectItem value={item.value} key={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={diference} onValueChange={setDiference}>
        <SelectTrigger>
          <SelectValue placeholder="AM" />
        </SelectTrigger>
        <SelectContent>
          {data.ampm.map((item) => (
            <SelectItem value={item.value} key={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePicker;
