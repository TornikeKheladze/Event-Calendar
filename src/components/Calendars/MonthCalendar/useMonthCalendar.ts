import { RenderCalendarProps } from "../RenderCalendar";
import { getDaysInMonth } from "../../../helpers/dates";

export const useMonthCalendar = (props: RenderCalendarProps) => {
  const year = props.currentDate.getFullYear();
  const month = props.currentDate.getMonth();
  const today = new Date();

  const days = getDaysInMonth(year, month);

  const prevMonth = () => props.setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => props.setCurrentDate(new Date(year, month + 1, 1));

  return {
    prevMonth,
    nextMonth,
    days,
    today,
    ...props,
  };
};
