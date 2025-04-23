import { View, ScrollView } from "react-native";
import { RenderCalendarProps } from "../RenderCalendar";
import { useWeekCalendar } from "./useWeekCalendar";
import WeekDay from "./WeekDay/WeekDay";
import CalendarNavigator from "../CalendarNavigator/CalendarNavigator";
import { getTodayNotifications } from "../../../helpers/dates";

const WeekCalendar: React.FC<RenderCalendarProps> = (props) => {
  const { nextWeek, prevWeek, weekDays, onDayPress, navText, notifications } =
    useWeekCalendar(props);

  return (
    <View className="p-4 bg-white rounded-lg">
      <CalendarNavigator
        prevPress={prevWeek}
        nextPress={nextWeek}
        text={navText}
      />
      <ScrollView>
        {weekDays.map((day) => {
          const events = getTodayNotifications(day.date, notifications);
          const eventNames = events.map((n) => n.name);
          return (
            <WeekDay
              key={day.date.getTime() + Math.random()}
              {...day}
              onDayPress={onDayPress}
              eventNames={eventNames}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeekCalendar;
