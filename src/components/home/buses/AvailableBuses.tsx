import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import available_buses from "../../../data/available/available.data";

const { height, width } = Dimensions.get("window");

const AvailableBuses = () => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.container_title}>Available Buses</Text>
        <Text
          style={styles.expand_option}
          onPress={() => {
            setExpand(!expand);
          }}
        >
          {expand ? "Minimize -" : "Expand +"}
        </Text>
      </View>
      {available_buses.length == 0 ? (
        <View style={styles.content_unavailable}>
          <Text style={styles.no_available_content}>
            You Haven't Searched For A Bus!
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default AvailableBuses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: height * 0.035,
    paddingHorizontal: width * 0.035,
  },
  container_title: {
    fontFamily: "poppins-medium",
  },
  content_unavailable: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  no_available_content: {
    fontFamily: "poppins-regular",
    color: "#A52A2A",
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expand_option: {
    fontFamily: "poppins-medium",
    color: "#00CC99",
  },
});
