import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dimension from "../../theme/dimension.theme";
import Notification from "./Notification";

const Others = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Others</Text>
      </View>
      <View>
        <Notification />
      </View>
    </View>
  );
};

export default Others;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingHorizontal: dimension.width * 0.04,
    paddingVertical: dimension.height * 0.035,
  },
  title: {
    fontFamily: "poppins-semibold",
    color: "#ABABAB",
  },
});
