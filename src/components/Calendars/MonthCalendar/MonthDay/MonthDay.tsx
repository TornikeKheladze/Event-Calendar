import { View, Text, TouchableOpacity } from "react-native";

type MonthDayProps = {
  day: Date | null;
  onDayPress: (date: Date) => void;
};

const MonthDay: React.FC<MonthDayProps> = ({ day, onDayPress }) => {
  const today = new Date();

  return (
    <View className="w-[14.2%] p-1 items-center mt-10">
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
  );
};

export default MonthDay;
