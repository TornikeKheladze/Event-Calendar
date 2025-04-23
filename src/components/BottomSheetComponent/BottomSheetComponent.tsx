import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, forwardRef, SetStateAction } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Form from "./Form/Form";
import { Event } from "../../types/types";
import EventDetails from "./EventDetails/EventDetails";

export type BottomSheetProps = {
  currentHour: string;
  currentDate: Date;
  details: Event | null;
  setDetails: Dispatch<SetStateAction<Event | null>>;
  setNotifications: React.Dispatch<React.SetStateAction<Event[]>>;
};

const BottomSheetComponent = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (props, ref) => {
    const { details, setDetails } = props;

    const closeBottomSheet = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
      setDetails(null);
    };

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={closeBottomSheet}
        style={{ backgroundColor: "transparent" }}
      />
    );

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={["30%", "50%", "90%"]}
        backgroundStyle={{ backgroundColor: "#c7ecee" }}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <BottomSheetView className="flex-1 px-4 items-center ">
          <View className="flex-row w-full items-center justify-center relative my-4">
            <Text className="text-2xl">
              {details ? "Event Details" : "Create Event"}
            </Text>
            <TouchableOpacity
              className="bg-gray-600 p-1 rounded-xl absolute right-0"
              onPress={closeBottomSheet}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {details ? (
            <EventDetails details={details} />
          ) : (
            <Form {...props} closeBottomSheet={closeBottomSheet} />
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetComponent;
