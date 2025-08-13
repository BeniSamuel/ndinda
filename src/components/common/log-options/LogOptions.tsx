import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

const LogOptions = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.holder}>
        <Image
          source={require("../../../../assets/common/google-icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.holder}>
        <Image
          source={require("../../../../assets/common/ios-icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.holder}>
        <Image
          source={require("../../../../assets/common/facebook-icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default LogOptions;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: height * 0.045,
    paddingHorizontal: width * 0.05,
  },
  holder: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.025,
    paddingVertical: height * 0.004,
    borderRadius: 6,
  },
  image: {
    width: width * 0.07,
    height: height * 0.045,
  },
});
