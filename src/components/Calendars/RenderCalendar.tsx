import React from "react";
import { CalendarView } from "../Calendar/Calendar";
import DayCalendar from "./DayCalendar";
import MonthCalendar from "./MonthCalendar";
import WeekCalendar from "./WeekCalendar";

export type RenderCalendarProps = {
  type: CalendarView;
  onDayPress: (arg: any) => void;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
};

const RenderCalendar: React.FC<RenderCalendarProps> = (props) => {
  const { type } = props;
  if (type === "day") return <DayCalendar {...props} />;
  if (type === "month") return <MonthCalendar {...props} />;
  if (type === "week") return <WeekCalendar {...props} />;
};

export default RenderCalendar;
