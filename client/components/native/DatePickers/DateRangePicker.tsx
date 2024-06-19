"use client";

import dayjs from "dayjs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "next/navigation";

export const DateRangePicker = () => {
  const searchParam = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs(
      searchParam.get("start_date") ?? dayjs().startOf("month")
    ).toDate(),
    to: dayjs(searchParam.get("end_date") ?? dayjs().endOf("month")).toDate(),
  });
  const updateURL = () => {
    const newURL = new URLSearchParams(searchParam.toString());
    newURL.set(
      "start_date",
      dayjs(date?.from ?? dayjs().startOf("month")).format("YYYY-MM-DD")
    );
    newURL.set(
      "end_date",
      dayjs(date?.to ?? dayjs().endOf("month")).format("YYYY-MM-DD")
    );

    return `?${newURL}`;
  };

  return (
    <div className={"flex flex-row gap-2 items-baseline"}>
      <strong>Filter Expenses:</strong>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("YYYY-MM-DD")} -{" "}
                  {dayjs(date.to).format("YYYY-MM-DD")}
                </>
              ) : (
                dayjs(date.from).format("YYYY-MM-DD")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
      <a href={updateURL()} className={cn(buttonVariants(), "mx-1")}>
        Submit
      </a>
    </div>
  );
};

export default DateRangePicker;
