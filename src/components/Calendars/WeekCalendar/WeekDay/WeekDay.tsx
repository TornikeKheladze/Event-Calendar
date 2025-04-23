import { Text, TouchableOpacity } from "react-native";
import React from "react";

type WeekDayProps = {
  label: string;
  date: Date;
  onDayPress: (date: Date) => void;
};

const WeekDay: React.FC<WeekDayProps> = ({ date, label, onDayPress }) => {
  const today = new Date();
  return (
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
  );
};

export default WeekDay;
