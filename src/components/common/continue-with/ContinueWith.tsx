import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

const ContinueWith = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block} />
      <Text style={styles.text}> Or Continue With </Text>
      <View style={styles.block} />
    </View>
  );
};

export default ContinueWith;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  block: {
    backgroundColor: "#808080",
    width: width * 0.24,
    height: height * 0.002,
    borderRadius: 12,
  },
  text: {
    fontFamily: "poppins-medium",
    color: "#808080",
    fontSize: 13,
  },
});
