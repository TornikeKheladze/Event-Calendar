import { View, Text, TouchableOpacity } from "react-native";

type MonthDayProps = {
  day: Date | null;
  onDayPress: (date: Date) => void;
  eventTitle?: string;
};

const MonthDay: React.FC<MonthDayProps> = ({ day, onDayPress, eventTitle }) => {
  const today = new Date();

  const isToday = (day: Date) => day.toDateString() === today.toDateString();

  return (
    <View className="w-[14.2%] p-1 items-center mt-10">
      {day ? (
        <TouchableOpacity
          onPress={() => onDayPress(day)}
          className={`h-24 w-14 rounded-lg flex items-center justify-center p-[2px]
                      ${isToday(day) ? "bg-blue-500 text-white" : ""}`}
        >
          {eventTitle && (
            <Text
              className={`text-xs text-center absolute top-0 mt-[2px] rounded-lg w-full ${
                isToday(day) ? "bg-slate-100 " : "bg-sky-300"
              }`}
            >
              {eventTitle?.slice(0, 14)}
            </Text>
          )}

          <Text
            className={`text-lg font-bold ${
              isToday(day) ? "text-white font-bold" : "text-gray-800"
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
