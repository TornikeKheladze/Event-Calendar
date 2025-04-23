import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CalendarView } from "../../../types/types";

const calendarViews: CalendarView[] = ["day", "week", "month"];

type CalendarHeadrProps = {
  setActiveCalendarView: React.Dispatch<React.SetStateAction<CalendarView>>;
  activeCalendarView: CalendarView;
};

const CalendarHead: React.FC<CalendarHeadrProps> = ({
  activeCalendarView,
  setActiveCalendarView,
}) => {
  return (
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
  );
};

export default CalendarHead;
