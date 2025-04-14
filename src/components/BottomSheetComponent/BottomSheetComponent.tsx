import { View, Text, TouchableOpacity } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Form from "./Form/Form";

type BottomSheetProps = {
  currentHour: string | undefined;
};

const BottomSheetComponent = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (props, ref) => {
    const renderBackdrop = (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          if (ref && typeof ref !== "function") {
            ref.current?.close();
          }
        }}
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
            <Text className="text-2xl">Create Event</Text>
            <TouchableOpacity
              className="bg-gray-600 p-1 rounded-xl absolute right-0"
              onPress={() => {
                if (ref && typeof ref !== "function") {
                  ref.current?.close();
                }
              }}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Form currentHour={props.currentHour} />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetComponent;
