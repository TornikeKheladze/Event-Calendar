import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "@tanstack/react-form";
import DatePicker from "./DatePicker/DatePicker";
import { useLocation } from "../../../hooks/hooks";
import Map from "./Map/Map";

const Form: React.FC<{ currentHour: string | undefined }> = ({
  currentHour,
}) => {
  const form = useForm({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  const { location, setLocation } = useLocation();

  return (
    <View className="w-full items-center">
      <form.Field
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
      <Text className="text-base font-semibold mb-1">Event Location</Text>
      <Map location={location} setLocation={setLocation} />
      <View className="flex-row w-full justify-around gap-10 mt-3">
        <DatePicker title="Start Time" initialTime={currentHour} />
        <DatePicker title="End Time" initialTime={currentHour} />
      </View>
      <TouchableOpacity
        onPress={() => form.handleSubmit()}
        className="bg-green-500 px-6 py-2 rounded-2xl mt-10"
      >
        <Text className="text-xl">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
