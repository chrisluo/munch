import React from "react";
import { StyleSheet, Text } from "react-native";
import Card from "./UI/Card";

export const LocationPreview = props => {
  return (
    <Card style={styles.card}>
      <Text>{props.location.name}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%"
  }
});
