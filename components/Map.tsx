import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { BUISNESSES } from "../data/dummy-data";

const Map = props => {
  const [region, setRegion] = useState(null);

  const verifyPermissions = useCallback(async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [
          {
            text: "Okay"
          }
        ]
      );
      return false;
    }

    return true;
  }, []);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    } catch (error) {
      Alert.alert("Could not fetch location!", "Please try again later", [
        {
          text: "Okay"
        }
      ]);
    }
  };

  useEffect(() => {
    getLocationHandler();
  }, [verifyPermissions]);

  const markerPressHandler = (event, location) => {
    event.stopPropagation();
    props.onLocation(location);
  };

  return (
    <MapView
      style={styles.mapStyle}
      moveOnMarkerPress={false}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      region={region}
      onPress={props.onRegionChange}
      onRegionChangeComplete={props.onRegionChange}
    >
      {BUISNESSES.map(buisness => (
        <Marker
          key={buisness.id}
          coordinate={{
            latitude: buisness.lat,
            longitude: buisness.lng
          }}
          onPress={event => markerPressHandler(event, buisness)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: "100%"
  }
});
export default Map;
