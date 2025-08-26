import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

const UserInform = () => {
  return (
    <View style={styles.parent_container}>
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Text style={styles.text_label}>Username</Text>
          <Text style={styles.text_detail}>Beni Samuel</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text_label}>Email</Text>
          <Text style={styles.text_detail}>benisamuel566@gmail.com</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text_label}>Phone Number</Text>
          <Text style={styles.text_detail}>Not provided</Text>
        </View>
        <TouchableOpacity style={styles.edit_div}>
          <Text style={styles.edit_text}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInform;

const styles = StyleSheet.create({
  parent_container: {
    paddingHorizontal: width * 0.03,
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: width * 0.045,
    paddingVertical: height * 0.03,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    borderRadius: 10,
  },
  text_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text_label: {
    fontFamily: "poppins-semibold",
  },
  text_detail: {
    fontFamily: "poppins-regular",
    color: "#ABABAB",
  },
  edit_div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  edit_text: {
    color: "#00CC99",
    fontFamily: "poppins-semibold",
  },
});
