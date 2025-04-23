import { Alert } from "react-native";
import { useForm } from "@tanstack/react-form";
import { useLocation } from "../../../hooks/hooks";
import { EventRepeatType } from "../../../types/types";
import { currentDateHour } from "../../../helpers/dates";
import {
  checkEventOverlap,
  scheduleEventNotification,
} from "../../../helpers/notifications";
import { FormProps } from "./Form";

const repeatTypeData: {
  label: string;
  value: EventRepeatType;
}[] = [
  { label: "Single", value: "single" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
];

export const useFormComponent = ({
  currentHour,
  currentDate,
  closeBottomSheet,
  setNotifications,
  notifications,
}: FormProps) => {
  const { location, setLocation } = useLocation();

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      startDate: currentDateHour(currentHour, currentDate),
      endDate: currentDateHour(currentHour, currentDate),
      repeatType: repeatTypeData[0].value,
    },
    onSubmit: async ({ value }) => {
      const eventData = {
        ...value,
        location,
        id: new Date().toTimeString(),
      };
      const now = new Date();
      if (new Date(eventData.startDate) < now) {
        Alert.alert("Error", "You can't schedule an event in the past.", [
          { text: "Ok" },
        ]);
        return;
      } else if (checkEventOverlap(notifications, eventData)) {
        Alert.alert("Error", "An event already exists during this time.", [
          { text: "Ok" },
        ]);
        return;
      } else {
        await scheduleEventNotification(eventData);
        setNotifications((prevState) => [...prevState, eventData]);
        Alert.alert("Success", "Event Created", [
          { text: "OK", onPress: closeBottomSheet },
        ]);
      }
    },
  });

  return {
    Field,
    location,
    setLocation,
    handleSubmit,
    repeatTypeData,
  };
};
