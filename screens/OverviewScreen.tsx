import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OverviewScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.text}>View Title</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    fontFamily: "lato"
  },
  card: {
    height: 100,
    width: "80%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 10,
    padding: 16,
    backgroundColor: "white"
  }
});

export default OverviewScreen;
