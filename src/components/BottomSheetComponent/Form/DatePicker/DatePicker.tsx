import { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const getTimeString = (date: Date = new Date()) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const DatePicker: React.FC<{
  title: string;
  initialTime?: string;
}> = ({ title, initialTime }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (initialTime) {
      const initialDate = new Date();
      const [hours, minutes] = initialTime.split(":").map(Number);
      initialDate.setHours(hours, minutes, 0, 0);
      setDate(initialDate);
    }
  }, [initialTime]);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => setShow(true);

  const renderIOSPicker = () => {
    return (
      <>
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          onChange={(event, dateTime) => {
            onDateChange(event, dateTime);
            // onChange(dateTime);
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
          {getTimeString(date)}
        </Text>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()}
            onChange={(event, dateTime) => {
              onDateChange(event, dateTime);
              // onChange(dateTime);
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
