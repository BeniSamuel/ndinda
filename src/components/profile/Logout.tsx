import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

const Logout = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.delete_button}>
        <Image
          source={require("../../../assets/profile/logout-icon.png")}
          style={styles.button_icon}
        />
        <Text style={styles.button_text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
  },
  delete_button: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  button_text: {
    fontFamily: "poppins-medium",
    color: "#A52A2A",
  },
  button_icon: {
    width: 18,
    height: 18,
  },
});
