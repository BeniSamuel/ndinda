import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/home/header/Header";
import Inform from "../../../components/home/inform/Inform";
import AvailableBuses from "../../../components/home/buses/AvailableBuses";

const { height, width } = Dimensions.get("window");

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header />

      <View style={styles.container_2}>
        <Inform />
        <AvailableBuses />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00CC99",
    paddingTop: Platform.OS === "android" ? height * 0.05 : null,
    flex: 1,
  },
  container_2: {
    backgroundColor: "#F9FAFF",
    flex: 1,
  },
});
