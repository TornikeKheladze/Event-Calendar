import React from "react";
import DayCalendar from "./DayCalendar";
import MonthCalendar from "./MonthCalendar";
import WeekCalendar from "./WeekCalendar";
import { CalendarView } from "../../types/types";

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
