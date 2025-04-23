import { useEffect, useState } from "react";
import { CalendarView, Event } from "../../types/types";
import {
  getScheduledNotifications,
  deleteAllEventNotifications,
} from "../../helpers/notifications";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notifications, setNotifications] = useState<Event[]>([]);

  const [activeCalendarView, setActiveCalendarView] =
    useState<CalendarView>("day");

  const onDayPress = (date: Date) => {
    setCurrentDate(date);
    setActiveCalendarView("day");
  };

  useEffect(() => {
    getScheduledNotifications().then((n) => {
      setNotifications(n);
    });
    // deleteAllEventNotifications();
  }, []);

  return {
    activeCalendarView,
    setActiveCalendarView,
    onDayPress,
    currentDate,
    setCurrentDate,
    notifications,
    setNotifications,
  };
};
