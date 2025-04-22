import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { currentDateHour } from "../../helpers/dates";
import { Event } from "../../types/types";

type HourItemProps = {
  hour: string;
  handleBottomSheet: (index: number, hour: string) => void;
  currentDate: Date;
  today: Date;
  index: number;
  todayNotifications: Event[];
};

const HourItem: React.FC<HourItemProps> = ({
  hour,
  handleBottomSheet,
  currentDate,
  today,
  index,
  todayNotifications,
}) => {
  const hourStart = currentDateHour(hour, currentDate);
  const hourEnd = new Date(hourStart);
  hourEnd.setHours(hourEnd.getHours() + 1);

  const notifications = todayNotifications.filter((n) => {
    const startDate = new Date(n.startDate);
    const endDate = new Date(n.endDate);
    const middleTime = new Date((startDate.getTime() + endDate.getTime()) / 2);

    // if (middleTime >= hourStart.getTime() && middleTime < hourEnd.getTime()) {
    if (middleTime >= hourStart && middleTime < hourEnd) {
      console.log(startDate.toString(), endDate.toString());
      console.log(middleTime.toString());
      return true;
    } else {
      return false;
    }
  });

  const itemHeightUnit = 0.64;

  return (
    <TouchableOpacity
      onPress={() => handleBottomSheet(3, hour)}
      className={`border-b box-border border-gray-300 justify-center px-1 relative z-0 ${
        currentDate.toDateString() === today.toDateString() &&
        index === today.getHours()
          ? "bg-blue-100"
          : ""
      }`}
      style={{
        height: itemHeightUnit * 100,
      }}
    >
      {notifications.map((n) => {
        const duration =
          new Date(n.endDate).getTime() - new Date(n.startDate).getTime();
        const millisecondsInOneHour = 60 * 60 * 1000;
        const height =
          Number(((duration / millisecondsInOneHour) * 100).toFixed()) *
          itemHeightUnit;

        function msToHoursMinutes(ms: number) {
          const hours = Math.floor(ms / (1000 * 60 * 60));
          const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
          return { hours, minutes };
        }

        // console.log(heightPercentage);

        return (
          <View
            key={n.id}
            className={
              "absolute bg-sky-600 right-0 rounded-lg w-2/3 items-center z-50"
            }
            style={{
              //   height: heightPercentage * itemHeightUnit,
              height: height,
              bottom: 100 * itemHeightUnit,
              //   bottom: 0,
              transform: [{ translateY: height / 2 }],
            }}
          >
            <Text className="text-white">{n.name}</Text>
          </View>
        );
      })}
      <Text className="text-gray-700 text-lg">{hour}</Text>
    </TouchableOpacity>
  );
};

export default HourItem;
