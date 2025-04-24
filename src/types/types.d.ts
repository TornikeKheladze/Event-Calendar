export type EventRepeatType = "single" | "day" | "week";

export type Location = {
  latitude: number;
  longitude: number;
};

export interface Event {
  id: string;
  name: string;
  location: Location | null;
  startDate: Date;
  endDate: Date;
  repeatType: EventRepeatType;
  address: string;
}

export type CalendarView = "day" | "week" | "month";
