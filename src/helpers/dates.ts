import { Event } from "../types/types";

export const getDaysInMonth = (year: number, month: number) => {
  let days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

export const getWeekDays = (
  baseDate: Date
): { date: Date; label: string }[] => {
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay() + 1);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return {
      date: day,
      label: day.toLocaleDateString("default", {
        weekday: "long",
        day: "2-digit",
        month: "short",
      }),
    };
  });
};

export const getTodayNotifications = (
  currentDate: Date,
  notifications: Event[]
) => {
  const todayStart = new Date(currentDate);
  const todayEnd = new Date(currentDate);
  todayStart.setHours(0, 0, 0, 0);
  todayEnd.setHours(23, 59, 59, 59);

  const todayNotifications = notifications.filter((n) => {
    const startDate = new Date(n.startDate);
    if (
      startDate.getTime() >= todayStart.getTime() &&
      startDate.getTime() < todayEnd.getTime()
    ) {
      return true;
    } else {
      return false;
    }
  });
  return todayNotifications;
};

export const currentDateHour = (hour: string, date: Date) => {
  const initialDate = date;
  const [hours, minutes] = hour.split(":").map(Number);
  initialDate.setHours(hours, minutes, 0, 0);
  return initialDate;
};

export function msToHoursMinutes(ms: number) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

export const rowHeight = 64;

export const eventPositons = (n: Event) => {
  const startOfDay = new Date(n.startDate);
  startOfDay.setHours(0, 0, 0, 0);

  const oneDayInMs = 24 * 60 * 60 * 1000;
  const fullHeight = 24 * rowHeight;

  const eventStartMs = new Date(n.startDate).getTime() - startOfDay.getTime();
  const eventEndMs =
    new Date(n.endDate).getTime() - new Date(n.startDate).getTime();

  const pixelInMs = fullHeight / oneDayInMs;

  const topOffset = eventStartMs * pixelInMs;
  const eventHeight = eventEndMs * pixelInMs;

  return { topOffset, eventHeight, rowHeight };
};
