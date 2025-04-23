import React from "react";
import DayCalendar from "./DayCalendar/DayCalendar";
import MonthCalendar from "./MonthCalendar/MonthCalendar";
import WeekCalendar from "./WeekCalendar/WeekCalendar";
import { CalendarView, Event } from "../../types/types";

export type RenderCalendarProps = {
  type: CalendarView;
  onDayPress: (date: Date) => void;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  notifications: Event[];
  setNotifications: React.Dispatch<React.SetStateAction<Event[]>>;
};

const RenderCalendar: React.FC<RenderCalendarProps> = (props) => {
  const { type } = props;
  if (type === "day") return <DayCalendar {...props} />;
  if (type === "month") return <MonthCalendar {...props} />;
  if (type === "week") return <WeekCalendar {...props} />;
};

export default RenderCalendar;
