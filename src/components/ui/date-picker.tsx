import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps extends React.ComponentProps<"div"> {
  isSmall?: boolean;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker(props: DatePickerProps) {
  return (
    <div className={cn(props.className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={props.isSmall ? "xs" : "default"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !props.date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={props.date}
            onSelect={props.onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
