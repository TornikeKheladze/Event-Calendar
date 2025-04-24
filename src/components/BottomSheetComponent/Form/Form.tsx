import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "./DatePicker/DatePicker";
import Map from "../Map/Map";
import DropdownComponent from "./DropdownComponent/DropdownComponent";
import { BottomSheetProps } from "../BottomSheetComponent";
import { useFormComponent } from "./useFormComponent";

export interface FormProps extends BottomSheetProps {
  closeBottomSheet: () => void;
  setResetRef?: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const Form: React.FC<FormProps> = (props) => {
  const { Field, location, setLocation, handleSubmit, repeatTypeData } =
    useFormComponent(props);

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
