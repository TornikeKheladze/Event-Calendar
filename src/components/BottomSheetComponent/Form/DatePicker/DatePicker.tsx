import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Updater } from "@tanstack/react-form";

const getTimeString = (date: Date = new Date()) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

type DatePickerProps = {
  title: string;
  setValue: (updater: Updater<Date>) => void;
  value: Date;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  title,
  value,
  setValue,
}) => {
  const [show, setShow] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setValue(currentDate);
  };

  const showDatepicker = () => setShow(true);

  const renderIOSPicker = () => {
    return (
      <>
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          onChange={(event, dateTime) => {
            onDateChange(event, dateTime as Date);
          }}
          mode="time"
          display="default"
        />
        <Text className="p-1 rounded-lg w-20 text-sm text-center  mt-2">
          {title}
        </Text>
      </>
    );
  };

  const renderAndroidPicker = () => {
    return (
      <>
        <Text className="text-xl p-1 bg-[#80808040] rounded-lg mb-2 w-28 text-center">
          {getTimeString(value)}
        </Text>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            onChange={(event, dateTime) => {
              onDateChange(event, dateTime as Date);
            }}
            mode="time"
            display="default"
            is24Hour
          />
        )}
        <TouchableOpacity
          onPress={showDatepicker}
          className="bg-blue-400 p-1 rounded-lg w-28 items-center "
        >
          <Text className="text-white text-xl">{title}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View className="items-end justify-center ">
      {Platform.OS === "ios" ? renderIOSPicker() : renderAndroidPicker()}
    </View>
  );
};

export default DatePicker;
