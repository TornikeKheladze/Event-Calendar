import { Text, TouchableOpacity } from "react-native";
import React from "react";

type WeekDayProps = {
  label: string;
  date: Date;
  onDayPress: (date: Date) => void;
  eventNames: string[];
};

const WeekDay: React.FC<WeekDayProps> = ({
  date,
  label,
  onDayPress,
  eventNames,
}) => {
  const today = new Date();

  return (
    <TouchableOpacity
      key={date.toDateString()}
      className="border-b border-gray-300 py-4 flex-row items-center gap-3"
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
      {eventNames.map((name, index) => (
        <Text className="bg-sky-300 p-1 rounded-lg" key={name + index}>
          {name}
        </Text>
      ))}
    </TouchableOpacity>
  );
};

export default WeekDay;
