import { Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  eventPositons,
  formatTimeRange,
  rowHeight,
} from "../../../../helpers/dates";
import { Event } from "../../../../types/types";

type EventsProps = {
  events: Event[];
  onEventPress: (event: Event) => void;
};

const Events: React.FC<EventsProps> = ({ events, onEventPress }) => {
  return (
    <>
      {events.map((n) => {
        const { eventHeight, topOffset } = eventPositons(n);
        const height =
          eventHeight < rowHeight * (2 / 3) ? rowHeight * (2 / 3) : eventHeight;
        return (
          <TouchableOpacity
            key={n.id}
            className="absolute bg-sky-600 right-0 rounded-lg w-2/3 z-50 px-3 justify-center items-center"
            style={{
              height,
              top: topOffset,
            }}
            onPress={() => onEventPress(n)}
          >
            <Text className="text-white font-bold">{n.name}</Text>
            <Text className="text-white">
              {formatTimeRange(n.startDate, n.endDate)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default Events;
