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

const Empty = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../../../assets/notification/empty-icon.png")}
        />
      </View>
      <View>
        <Text style={styles.text_description}>
          You currently have no {"\n"}
          notifications!
        </Text>
      </View>
      <TouchableOpacity style={styles.find_button}>
        <Text style={styles.find_button_text}>Find A Bus</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text_description: {
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
  find_button: {
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.035,
    borderRadius: 12,
    backgroundColor: "#00CC99",
  },
  find_button_text: {
    fontFamily: "poppins-medium",
  },
});
