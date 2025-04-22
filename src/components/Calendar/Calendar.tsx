import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import RenderCalendar from "../Calendars/RenderCalendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CalendarView } from "../../types/types";

const calendarViews: CalendarView[] = ["day", "week", "month"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [activeCalendarView, setActiveCalendarView] =
    useState<CalendarView>("day");

  const onDayPress = (date: Date) => {
    setCurrentDate(date);
    setActiveCalendarView("day");
  };

  return (
    <GestureHandlerRootView className="flex-1 pt-20">
      <View className="flex-row justify-center gap-2">
        {calendarViews.map((calendarView) => (
          <TouchableOpacity
            className={`${
              activeCalendarView === calendarView ? "bg-blue-400" : ""
            } rounded-lg p-2 border border-blue-200 w-20 items-center`}
            onPress={() => setActiveCalendarView(calendarView)}
            key={calendarView}
          >
            <Text>{calendarView}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <RenderCalendar
        type={activeCalendarView}
        onDayPress={onDayPress}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </GestureHandlerRootView>
  );
};

export default Calendar;
