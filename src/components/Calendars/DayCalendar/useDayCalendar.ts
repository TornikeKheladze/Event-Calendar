import { RenderCalendarProps } from "../RenderCalendar";
import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Event } from "../../../types/types";
import { getTodayNotifications } from "../../../helpers/dates";

export const useDayCalendar = (props: RenderCalendarProps) => {
  const [currentHour, setCurrentHour] = useState<string>("00:00");
  const [details, setDetails] = useState<Event | null>(null);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const prevDay = () => {
    props.setCurrentDate(
      new Date(props.currentDate.setDate(props.currentDate.getDate() - 1))
    );
  };

  const nextDay = () => {
    props.setCurrentDate(
      new Date(props.currentDate.setDate(props.currentDate.getDate() + 1))
    );
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheet = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const todayNotifications = getTodayNotifications(
    props.currentDate,
    props.notifications
  );

  const onEventPress = (event: Event) => {
    setDetails(event);
    handleBottomSheet(3);
  };
  const onHourPress = (hour: string) => {
    handleBottomSheet(3);
    setCurrentHour(hour);
  };

  return {
    todayNotifications,
    onEventPress,
    onHourPress,
    bottomSheetRef,
    nextDay,
    prevDay,
    hours,
    details,
    setDetails,
    currentHour,
    setCurrentHour,
    ...props,
  };
};
