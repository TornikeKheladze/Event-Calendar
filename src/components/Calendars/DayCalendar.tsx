import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { RenderCalendarProps } from "./RenderCalendar";
import { useCallback, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const DayCalendar: React.FC<RenderCalendarProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const today = new Date();
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const prevDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const nextDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleBottomSheet = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      onPress={() => handleBottomSheet(-1)}
      style={{ backgroundColor: "transparent" }}
    />
  );

  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={prevDay} className="p-2">
          <Text className="text-lg font-bold text-gray-600">{"<"}</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold">
          {currentDate.toLocaleDateString("default", {
            weekday: "long",
            day: "2-digit",
            month: "short",
          })}
        </Text>
        <TouchableOpacity onPress={nextDay} className="p-2">
          <Text className="text-lg font-bold text-gray-600">{">"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mb-10 p-4">
        {hours.map((hour, index) => (
          <TouchableOpacity
            key={hour}
            onPress={() => handleBottomSheet(3)}
            className={`border-b border-gray-300 py-4 px-1 ${
              currentDate.toDateString() === today.toDateString() &&
              index === today.getHours()
                ? "bg-blue-100"
                : ""
            }`}
          >
            <Text className="text-gray-700 text-lg">{hour}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={["30%", "50%", "90%"]}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#c7ecee" }}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <BottomSheetView className="flex-1 p-9 items-center ">
          <TouchableOpacity
            className="bg-blue-300 p-1 rounded-xl"
            onPress={() => bottomSheetRef.current?.close()}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default DayCalendar;
