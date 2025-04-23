import { View, Text } from "react-native";
import { RenderCalendarProps } from "../RenderCalendar";
import { useMonthCalendar } from "./useMonthCalendar";
import CalendarNavigator from "../CalendarNavigator/CalendarNavigator";
import MonthDay from "./MonthDay/MonthDay";
import { getTodayNotifications } from "../../../helpers/dates";

const MonthCalendar: React.FC<RenderCalendarProps> = (props) => {
  const { prevMonth, nextMonth, days, currentDate, onDayPress, notifications } =
    useMonthCalendar(props);

  return (
    <View className="p-4 rounded-lg flex-1">
      <CalendarNavigator
        nextPress={nextMonth}
        prevPress={prevMonth}
        text={currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      />

      <View className="flex flex-row justify-between">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <Text
            key={day}
            className="w-[14.2%] text-center font-extrabold text-gray-700"
          >
            {day}
          </Text>
        ))}
      </View>

      <View className="flex-wrap flex-row flex-1">
        {days.map((day, index) => {
          const event = day
            ? getTodayNotifications(day, notifications)[0]
            : null;
          return (
            <MonthDay
              key={Math.random() + index}
              day={day}
              onDayPress={onDayPress}
              eventTitle={event?.name}
            />
          );
        })}
      </View>
    </View>
  );
};

export default MonthCalendar;
