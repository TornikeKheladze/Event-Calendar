import React from "react";
import RenderCalendar from "../Calendars/RenderCalendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCalendar } from "./useCalendar";
import CalendarHead from "./CalendarHead/CalendarHead";

const Calendar = () => {
  const { activeCalendarView, setActiveCalendarView, ...rest } = useCalendar();

  return (
    <GestureHandlerRootView className="flex-1 pt-20">
      <CalendarHead
        activeCalendarView={activeCalendarView}
        setActiveCalendarView={setActiveCalendarView}
      />
      <RenderCalendar type={activeCalendarView} {...rest} />
    </GestureHandlerRootView>
  );
};

export default Calendar;
