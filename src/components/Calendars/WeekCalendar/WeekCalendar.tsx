import { View, ScrollView } from "react-native";
import { RenderCalendarProps } from "../RenderCalendar";
import { useWeekCalendar } from "./useWeekCalendar";
import WeekDay from "./WeekDay/WeekDay";
import CalendarNavigator from "../CalendarNavigator/CalendarNavigator";

const WeekCalendar: React.FC<RenderCalendarProps> = (props) => {
  const { nextWeek, prevWeek, weekDays, onDayPress, navText } =
    useWeekCalendar(props);

  return (
    <View className="p-4 bg-white rounded-lg">
      <CalendarNavigator
        prevPress={prevWeek}
        nextPress={nextWeek}
        text={navText}
      />
      <ScrollView>
        {weekDays.map((day) => (
          <WeekDay
            key={day.date.getTime() + Math.random()}
            {...day}
            onDayPress={onDayPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default WeekCalendar;
