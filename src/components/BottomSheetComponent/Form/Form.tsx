import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm } from "@tanstack/react-form";
import DatePicker from "./DatePicker/DatePicker";
import { useLocation } from "../../../hooks/hooks";
import Map from "./Map/Map";
import DropdownComponent from "./DropdownComponent/DropdownComponent";
import { EventRepeatType } from "../../../types/types";
import { currentDateHour } from "../../../helpers/dates";
import { scheduleEventNotification } from "../../../helpers/notifications";

const repeatTypeData: {
  label: string;
  value: EventRepeatType;
}[] = [
  { label: "Single", value: "single" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
];

const Form: React.FC<{ currentHour: string; currentDate: Date }> = ({
  currentHour,
  currentDate,
}) => {
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
      console.log(eventData);
      await scheduleEventNotification(eventData);
      Alert.alert("Success", "Event Created", [{ text: "OK" }]);
    },
  });

  return (
    <View className="w-full items-center">
      <Field
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? "Name is required" : undefined),
        }}
        children={(field) => (
          <View className="w-full">
            <Text className="text-base font-semibold mb-1">Event Name</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-base bg-white"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter Event name"
            />
            {field.state.meta.errors && (
              <Text className="text-red-500 mt-1 text-sm">
                {field.state.meta.errors}
              </Text>
            )}
          </View>
        )}
      />
      <Field
        name="repeatType"
        children={(field) => (
          <View className="w-full ">
            <Text className="text-base font-semibold mb-1">
              Event Repetition
            </Text>
            <DropdownComponent
              value={field.state.value}
              setValue={field.handleChange}
              data={repeatTypeData}
            />
          </View>
        )}
      />
      <View className="w-full h-[40%] mt-3">
        <Text className="text-base font-semibold mb-1">Event Location</Text>
        <Map location={location} setLocation={setLocation} />
      </View>
      <View className="flex-row w-full justify-around gap-10 mt-3">
        <Field
          name="startDate"
          children={(field) => (
            <DatePicker
              title="Start Time"
              value={field.state.value}
              setValue={field.handleChange}
            />
          )}
        />
        <Field
          name="endDate"
          children={(field) => (
            <DatePicker
              title="End Time"
              value={field.state.value}
              setValue={field.handleChange}
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        className="bg-green-500 px-6 py-2 rounded-2xl mt-2"
      >
        <Text className="text-xl">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
