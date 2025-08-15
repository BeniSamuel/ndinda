import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

const Inform = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inform_container}>
        <View>
          <Text style={styles.inform}>Don't Know {"\n"}RouteNumber?</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Check Here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image source={require("../../../../assets/home/inform-icon.png")} />
      </View>
    </View>
  );
};

export default Inform;

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.125,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.065,
    // backgroundColor: "green",
  },
  inform: {
    fontFamily: "poppins-medium",
    color: "#6f6b6bff",
    fontSize: 15
  },
  button: {
    backgroundColor: "#00CC99",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.01,
    borderRadius: 6,
  },
  button_text: {
    color: "white",
    fontFamily: "poppins-medium",
  },
  inform_container: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  }
});
