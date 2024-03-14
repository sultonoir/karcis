import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const DiscoverSelect = () => {
  const [select, setSelect] = React.useState("");

  const filterEvents = React.useMemo(() => {
    const sekarang = new Date();

    const awalMingguIni = new Date(
      sekarang.getFullYear(),
      sekarang.getMonth(),
      sekarang.getDate() - sekarang.getDay(),
    );

    const akhirBulanIni = new Date(
      sekarang.getFullYear(),
      sekarang.getMonth() + 1,
      0,
    );

    const awalBulanDepan = new Date(
      sekarang.getFullYear(),
      sekarang.getMonth() + 1,
      1,
    );
    const akhirBulanDepan = new Date(
      sekarang.getFullYear(),
      sekarang.getMonth() + 2,
      0,
    );

    return [
      {
        label: "This month",
        value: akhirBulanIni.toISOString(),
        startDate: awalMingguIni.toISOString(),
        endDate: akhirBulanIni.toISOString(),
      },
      {
        label: "Next month",
        value: akhirBulanDepan.toISOString(),
        startDate: awalBulanDepan.toISOString(),
        endDate: akhirBulanDepan.toISOString(),
      },
    ];
  }, []);

  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const selectedEvent = filterEvents.find((event) => event.value === select);

    if (selectedEvent) {
      params.set("startDate", selectedEvent.startDate);
      params.set("endDate", selectedEvent.value);
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }
    router.replace(`${path}?${params.toString()}`);
  }, [path, router, searchParams, select, filterEvents]);

  return (
    <Select defaultValue={select} onValueChange={setSelect}>
      <SelectTrigger className="w-[150px]" aria-label="select-options-date">
        <SelectValue placeholder="Nearby time" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Nearby time</SelectItem>
        {filterEvents.map((item) => (
          <SelectItem key={item.label} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DiscoverSelect;
