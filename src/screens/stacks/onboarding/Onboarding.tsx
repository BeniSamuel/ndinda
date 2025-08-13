import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const Onboarding = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.image_container}>
        <Image
          source={require("../../../../assets/onboarding/onboarding_image.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.title}>
          Choose Owning Your {"\n"}
          Time.
        </Text>
      </View>

      <View>
        <Text style={styles.content}>
          Create quality moments with loved ones. {"\n"}
          Thrive professionally and academically.
        </Text>
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.button_text}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS !== "ios" ? height * 0.045 : null,
    paddingHorizontal: width * 0.035,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: height * 0.045,
    backgroundColor: "#F9FAFF"
  },
  image_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: height * 0.55,
    width: width * 0.75,
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 18,
    textAlign: "center"
  },
  content: {
    fontFamily: "poppins-medium",
    lineHeight: 22,
    textAlign: "center",
    color: "#46444499"
  },
  button: {
    backgroundColor: "#00CC99",
    paddingVertical: height * 0.015,
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",
    borderRadius: 30
  },
  button_text: {
    color: "white",
    fontFamily: "poppins-medium",
  },
  button_container: {
    paddingHorizontal: width * 0.09,
  }
});
