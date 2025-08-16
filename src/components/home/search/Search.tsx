import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";

const { height, width } = Dimensions.get("window");

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label_text}>Which Bus Are You Going To Take?</Text>
      </View>
      <View style={styles.input_container}>
        <Image source={require("../../../../assets/home/search-icon.png")} />
        <TextInput
          placeholder="Search by RouteNumber..."
          placeholderTextColor={"#BCC5D2"}
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
          style={styles.input_text}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    shadowColor: "#9BACD859",
    shadowOpacity: 0.35,
    left: width * 0.07,
    bottom: height * -0.09,
    width: width * 0.85,
    height: height * 0.16,
    borderRadius: 12,
    paddingHorizontal: width * 0.045,
    paddingVertical: height * 0.015,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    zIndex: 12,
  },
  label_text: {
    fontFamily: "poppins-medium",
    color: "#004B39",
  },
  input_text: {
    fontFamily: "poppins-regular",
  },
  input_container: {
    borderColor: "#9BACD859",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.025,
    gap: 8,
    borderRadius: 12,
  },
});
