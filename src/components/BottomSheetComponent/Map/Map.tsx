import { View, ActivityIndicator } from "react-native";
import React from "react";
import MapView, { LongPressEvent, Marker } from "react-native-maps";

type MapProps = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  setLocation?: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    } | null>
  >;
};

const Map: React.FC<MapProps> = ({ location, setLocation }) => {
  const onMapLongPress = (e: LongPressEvent) => {
    if (!setLocation) return;
    setLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };
  if (location) {
    return (
      <MapView
        style={{
          width: "100%",
          height: "90%",
          borderRadius: 10,
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={(e) => onMapLongPress(e)}
      >
        <Marker coordinate={location} />
      </MapView>
    );
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Map;
