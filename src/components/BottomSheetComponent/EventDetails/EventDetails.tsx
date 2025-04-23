import { View, Text } from "react-native";
import React from "react";
import { formatTimeRange } from "../../../helpers/dates";
import { Event } from "../../../types/types";
import Map from "../Map/Map";

const EventDetails: React.FC<{
  details: Event;
}> = ({ details }) => {
  return (
    <View className=" w-full h-full items-center gap-5 p-2">
      <Text className="text-xl font-bold">{details.name}</Text>
      <Text className="text-lg font-semibold">
        {formatTimeRange(details.startDate, details.endDate)}
      </Text>
      <Text className="text-lg">Repeat Type: {details.repeatType}</Text>
      <View className="w-full h-1/2">
        <Map
          location={{
            latitude: details.location?.latitude || 0,
            longitude: details.location?.longitude || 0,
          }}
        />
      </View>
    </View>
  );
};

export default EventDetails;
