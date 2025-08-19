import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

type HeaderProp = {
  screen_name?: string;
  image?: ImageSourcePropType;
};

const Header: React.FC<HeaderProp> = ({ screen_name, image }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.screen_options}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../../../assets/common/left-arrow-icon.png")}
          />
        </TouchableOpacity>
        <Text style={styles.screen_name}>{screen_name}</Text>
      </View>
      <View>
        <Image source={image} style={styles.image} />
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
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? height * 0.055 : null,
    flexDirection: "row",
  },
  screen_options: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    width: 37,
    height: 35,
  },
  screen_name: {
    fontFamily: "poppins-medium",
    color: "white",
  },
});
