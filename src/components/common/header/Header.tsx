import { StyleSheet, Text, TouchableOpacity, View, Image, ImageSourcePropType, Dimensions } from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

type HeaderProp = {
  screen_name?: string;
  image?: ImageSourcePropType
};

const Header: React.FC<HeaderProp> = ({ screen_name, image }) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image source={require("../../../../assets/common/left-arrow-icon.png")}/>
        </TouchableOpacity>
        <Text>{screen_name}</Text>
      </View>
      <View>
        <Image source={image} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00CC99",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.035,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
