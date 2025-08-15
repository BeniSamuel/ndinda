import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Search from "../search/Search";

const { width, height } = Dimensions.get("window");

const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.user_inform}>
            Welcome, {"\n"}
            John Doe
          </Text>
        </View>
        <View>
          <Image
            source={require("../../../../assets/home/profile-picture.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.search_container}>
        <Search />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.035,
    paddingHorizontal: width * 0.035,
    backgroundColor: "#00CC99",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: height * 0.1,
  },
  user_inform: {
    fontFamily: "poppins-medium",
    color: "white",
  },
  image: {
    width: 45,
    height: 45,
  },
  search_container: {
    position: "relative",
  },
});
