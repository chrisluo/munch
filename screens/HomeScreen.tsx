import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Map from "../components/Map";
import SlideInView from "../components/UI/SlideInView";
import { LocationPreview } from "../components/LocationPreview";

const HomeScreen = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [locationSelected, setLocationSelected] = useState(null);

  const locationHandler = location => {
    setLocationSelected(location);
    setModalOpen(true);
  };

  const regionChangeHandler = () => {
    setModalOpen(false);
  };

  const animationCompleteHandler = () => {
    setLocationSelected(null);
  };

  return (
    <View style={styles.screen}>
      <Map onLocation={locationHandler} onRegionChange={regionChangeHandler} />
      {locationSelected ? (
        <SlideInView
          style={styles.cardView}
          isOpen={modalOpen}
          animationComplete={animationCompleteHandler}
        >
          <LocationPreview location={locationSelected} />
        </SlideInView>
      ) : null}
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cardView: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0
  }
});

export default HomeScreen;
