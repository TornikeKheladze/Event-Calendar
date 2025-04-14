import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

type MapProps = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    } | null>
  >;
};

const Map: React.FC<MapProps> = ({ location, setLocation }) => {
  if (location) {
    return (
      <MapView
        style={{
          width: "100%",
          height: "40%",
          borderRadius: 10,
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={(e) =>
          setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }
      >
        <Marker coordinate={location} />
      </MapView>
    );
  }
  return (
    <View>
      <Text>Something Went Wrong</Text>
    </View>
  );
};

export default Map;
