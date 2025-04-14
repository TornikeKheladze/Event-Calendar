import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { RenderCalendarProps } from "./RenderCalendar";
import { getWeekDays } from "../../helpers/helpers";
import Ionicons from "@expo/vector-icons/Ionicons";

const WeekCalendar: React.FC<RenderCalendarProps> = ({
  onDayPress,
  currentDate,
  setCurrentDate,
}) => {
  const today = new Date();
  const weekDays = getWeekDays(currentDate);

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  return (
    <View className="p-4 bg-white rounded-lg">
      <View className="flex flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={prevWeek} className="p-2">
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row gap-2">
          <Text className="text-xl font-semibold">
            {weekDays[0].date.toLocaleDateString("default", {
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text className="text-xl font-semibold">-</Text>
          <Text className="text-xl font-semibold">
            {weekDays[6].date.toLocaleDateString("default", {
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={nextWeek} className="p-2">
          <Ionicons name="arrow-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {weekDays.map(({ date, label }) => (
          <TouchableOpacity
            key={date.toDateString()}
            className="border-b border-gray-300 py-4"
            onPress={() => onDayPress(date)}
          >
            <Text
              className={`text-lg ${
                date.toDateString() === today.toDateString()
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeekCalendar;
