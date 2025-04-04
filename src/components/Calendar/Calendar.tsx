import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RenderCalendar from "../Calendars/RenderCalendar";

export type CalendarView = "day" | "week" | "month";

const calendarViews: CalendarView[] = ["day", "week", "month"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [activeCalendarView, setActiveCalendarView] =
    useState<CalendarView>("month");

  const onDayPress = (date: Date) => {
    setCurrentDate(date);
    setActiveCalendarView("day");
  };

  return (
    <View className="p-2">
      <View className="flex-row justify-center gap-2">
        {calendarViews.map((cv) => (
          <TouchableOpacity
            className={`${
              activeCalendarView === cv ? "bg-blue-400" : ""
            } rounded-lg p-2 border border-blue-200 w-20 items-center`}
            onPress={() => setActiveCalendarView(cv)}
            key={cv}
          >
            <Text>{cv}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <RenderCalendar
        type={activeCalendarView}
        onDayPress={onDayPress}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </View>
  );
};

export default Calendar;
