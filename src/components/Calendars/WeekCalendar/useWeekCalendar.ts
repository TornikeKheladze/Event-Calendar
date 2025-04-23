import { RenderCalendarProps } from "../RenderCalendar";
import { getWeekDays } from "../../../helpers/dates";

export const useWeekCalendar = (props: RenderCalendarProps) => {
  const weekDays = getWeekDays(props.currentDate);

  const prevWeek = () => {
    props.setCurrentDate(
      new Date(props.currentDate.setDate(props.currentDate.getDate() - 7))
    );
  };

  const nextWeek = () => {
    props.setCurrentDate(
      new Date(props.currentDate.setDate(props.currentDate.getDate() + 7))
    );
  };

  const navText =
    weekDays[0].date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
    }) +
    " - " +
    weekDays[6].date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
    });

  return {
    nextWeek,
    prevWeek,
    weekDays,
    navText,
    ...props,
  };
};
