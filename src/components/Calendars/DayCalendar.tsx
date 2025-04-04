import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { RenderCalendarProps } from "./RenderCalendar";

const DayCalendar: React.FC<RenderCalendarProps> = ({
  currentDate,
  setCurrentDate,
}) => {
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

  return (
    <View className="p-4 bg-white rounded-lg">
      <View className="flex flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={prevDay} className="p-2">
          <Text className="text-lg font-bold text-gray-600">{"<"}</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold">
          {currentDate.toLocaleDateString("default", {
            weekday: "long",
            day: "2-digit",
            month: "short",
          })}
        </Text>
        <TouchableOpacity onPress={nextDay} className="p-2">
          <Text className="text-lg font-bold text-gray-600">{">"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mb-48">
        {hours.map((hour, index) => (
          <View
            key={hour}
            className={`border-b border-gray-300 py-4 px-1 ${
              currentDate.toDateString() === today.toDateString() &&
              index === today.getHours()
                ? "bg-blue-100"
                : ""
            }`}
          >
            <Text className="text-gray-700 text-lg">{hour}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DayCalendar;
