import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { RenderCalendarProps } from "./RenderCalendar";
import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheetComponent from "../BottomSheetComponent/BottomSheetComponent";

import { Event } from "../../types/types";
import {
  deleteAllEventNotifications,
  getScheduledNotifications,
} from "../../helpers/notifications";
import {
  eventPositons,
  getTodayNotifications,
  rowHeight,
} from "../../helpers/dates";

const DayCalendar: React.FC<RenderCalendarProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const [currentHour, setCurrentHour] = useState<string>("00:00");
  const [notifications, setNotifications] = useState<Event[]>([]);

  const today = new Date();
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const prevDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const nextDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheet = useCallback((index: number, hour: string) => {
    setCurrentHour(hour);
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    getScheduledNotifications().then((n) => {
      setNotifications(n);
    });
    // deleteAllEventNotifications();
  }, []);

  const todayNotifications = getTodayNotifications(currentDate, notifications);
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between items-center mb-4  h-10">
        <TouchableOpacity onPress={prevDay} className="p-2">
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">
          {currentDate.toLocaleDateString("default", {
            weekday: "long",
            day: "2-digit",
            month: "short",
          })}
        </Text>
        <TouchableOpacity onPress={nextDay} className="p-2">
          <Ionicons name="arrow-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="mb-10 relative">
        {todayNotifications.map((n) => {
          const { eventHeight, topOffset } = eventPositons(n);
          return (
            <View
              key={Math.random()}
              className="absolute bg-sky-600 right-0 rounded-lg w-2/3 items-center z-50"
              style={{
                height: eventHeight,
                top: topOffset,
              }}
            >
              <Text>{n.name}</Text>
            </View>
          );
        })}
        {hours.map((hour, index) => (
          <TouchableOpacity
            key={hour}
            onPress={() => handleBottomSheet(3, hour)}
            className={`border-b box-border border-gray-300 justify-center px-1 relative z-0 ${
              currentDate.toDateString() === today.toDateString() &&
              index === today.getHours()
                ? "bg-blue-100"
                : ""
            }`}
            style={{
              height: rowHeight,
            }}
          >
            <Text className="text-gray-700 text-lg">{hour}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomSheetComponent
        ref={bottomSheetRef}
        currentHour={currentHour}
        currentDate={currentDate}
      />
    </View>
  );
};

export default DayCalendar;
