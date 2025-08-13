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
import React, { FormEvent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ContinueWith from "../../../components/common/continue-with/ContinueWith";
import LogOptions from "../../../components/common/log-options/LogOptions";
import { useNavigation } from "@react-navigation/native";
import User from "../../../types/user/user.type";

const { height, width } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const [ formData, setFormData ] = useState<User>();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View style={styles.work_area}>
        <View>
          <Text style={styles.login_title}>
            Login To {"\n"}
            Your Account
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={"#BCC5D2"}
            style={styles.input_field}
            onChange={() => setFormData({...formData, email: })}
          />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={"#BCC5D2"}
            style={styles.input_field}
            secureTextEntry={true}
          />
          <View style={styles.forgot_div}>
            <Text style={styles.forgot_password}>Forgot Password?</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
        </View>

        <View>
          <ContinueWith />
          <LogOptions />
        </View>

        <View style={styles.nav_option}>
          <Text style={styles.register_content}>
            Don't have an account?{" "}
            <Text
              style={styles.create_new_text}
              onPress={() => navigation.navigate("Signup")}
            >
              Create New Account
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    gap: height * 0.06,
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
  forgot_div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgot_password: {
    fontFamily: "poppins-medium",
    color: "#BCC5D2",
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
