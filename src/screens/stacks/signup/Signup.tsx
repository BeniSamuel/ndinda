import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import ContinueWith from "../../../components/common/continue-with/ContinueWith";
import LogOptions from "../../../components/common/log-options/LogOptions";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const Signup = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View style={styles.work_area}>
        <View>
          <Text style={styles.login_title}>
            Create An {"\n"}
            Account
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor={"#BCC5D2"}
            style={styles.input_field}
          />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={"#BCC5D2"}
            style={styles.input_field}
          />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={"#BCC5D2"}
            style={styles.input_field}
            secureTextEntry={true}
          />
          <View style={styles.button_container}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.button_text}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <ContinueWith />
          <LogOptions />
        </View>

        <View style={styles.nav_option}>
          <Text style={styles.register_content}>
            Already have an account?{" "}
            <Text
              style={styles.create_new_text}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? height * 0.035 : null,
    // backgroundColor: "red",
    flex: 1,
    paddingHorizontal: width * 0.035,
  },
  work_area: {
    paddingVertical: height * 0.11,
    display: "flex",
    flexDirection: "column",
    gap: height * 0.04,
  },
  login_title: {
    fontFamily: "poppins-semibold",
    textAlign: "center",
    fontSize: 25,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  input_field: {
    fontFamily: "poppins-regular",
    backgroundColor: "#FFFFFF",
    paddingLeft: width * 0.045,
    borderRadius: 9,
  },
  button_container: {
    paddingVertical: height * 0.03,
  },
  button: {
    backgroundColor: "#00CC99",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.015,
    borderRadius: 30,
  },
  button_text: {
    color: "white",
    fontFamily: "poppins-medium",
  },
  nav_option: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  register_content: {
    fontFamily: "poppins-regular",
    color: "#808080",
  },
  create_new_text: {
    color: "#00CC99",
    fontFamily: "poppins-medium",
  },
});
