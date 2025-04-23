import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { rowHeight } from "../../../../helpers/dates";

type HourItemProps = {
  onHourPress: (hour: string) => void;
  currentDate: Date;
  index: number;
  hour: string;
};

const HourItem: React.FC<HourItemProps> = ({
  currentDate,
  index,
  onHourPress,
  hour,
}) => {
  const today = new Date();
  return (
    <TouchableOpacity
      onPress={() => onHourPress(hour)}
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
  );
};

export default HourItem;
