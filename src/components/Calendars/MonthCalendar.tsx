import { View, Text, TouchableOpacity } from "react-native";
import { RenderCalendarProps } from "./RenderCalendar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDaysInMonth } from "../../helpers/dates";

const MonthCalendar: React.FC<RenderCalendarProps> = ({
  onDayPress,
  setCurrentDate,
  currentDate,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const days = getDaysInMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <View className="p-4 rounded-lg flex-1">
      <View className="flex flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={prevMonth}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Ionicons name="arrow-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

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
        {days.map((day, index) => (
          <View key={index} className="w-[14.2%] p-1 items-center mt-10">
            {day ? (
              <TouchableOpacity
                onPress={() => onDayPress(day)}
                className={`h-14 w-14 rounded-full flex items-center justify-center 
                  ${
                    day.toDateString() === today.toDateString()
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
              >
                <Text
                  className={`text-lg font-bold ${
                    day.toDateString() === today.toDateString()
                      ? "text-white font-bold"
                      : "text-gray-800"
                  }`}
                >
                  {day.getDate()}
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="h-14 w-14" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MonthCalendar;
