import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

type CalendarNavigatorProps = {
  nextPress: () => void;
  prevPress: () => void;
  text: string;
};

const CalendarNavigator: React.FC<CalendarNavigatorProps> = ({
  nextPress,
  prevPress,
  text,
}) => {
  return (
    <View className="flex flex-row justify-between items-center mb-4">
      <TouchableOpacity onPress={prevPress}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-xl font-semibold">{text}</Text>
      <TouchableOpacity onPress={nextPress}>
        <Ionicons name="arrow-forward-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarNavigator;
