import { View, ScrollView } from "react-native";
import { RenderCalendarProps } from "../RenderCalendar";
import BottomSheetComponent from "../../BottomSheetComponent/BottomSheetComponent";

import { useDayCalendar } from "./useDayCalendar";
import CalendarNavigator from "../CalendarNavigator/CalendarNavigator";
import Events from "./Events/Events";
import HourItem from "./HourItem/HourItem";

const DayCalendar: React.FC<RenderCalendarProps> = (props) => {
  const {
    todayNotifications,
    onEventPress,
    onHourPress,
    bottomSheetRef,
    nextDay,
    prevDay,
    hours,
    details,
    setDetails,
    currentHour,
    currentDate,
    setNotifications,
  } = useDayCalendar(props);

  return (
    <View className="flex-1 p-4">
      <CalendarNavigator
        nextPress={nextDay}
        prevPress={prevDay}
        text={currentDate.toLocaleDateString("default", {
          weekday: "long",
          day: "2-digit",
          month: "short",
        })}
      />
      <ScrollView className="mb-10 relative">
        <Events events={todayNotifications} onEventPress={onEventPress} />
        {hours.map((hour, index) => (
          <HourItem
            key={hour + index}
            currentDate={currentDate}
            hour={hour}
            index={index}
            onHourPress={onHourPress}
          />
        ))}
      </ScrollView>
      <BottomSheetComponent
        ref={bottomSheetRef}
        currentHour={currentHour}
        currentDate={currentDate}
        details={details}
        setDetails={setDetails}
        setNotifications={setNotifications}
        notifications={todayNotifications}
      />
    </View>
  );
};

export default DayCalendar;
