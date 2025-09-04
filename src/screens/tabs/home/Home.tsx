import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/home/header/Header";
import Inform from "../../../components/home/inform/Inform";
import AvailableBuses from "../../../components/home/buses/AvailableBuses";
import { useExpansionStore } from "../../../store/layout/expansion.store";

const { height } = Dimensions.get("window");

const Home = () => {
  const maximize = useExpansionStore((state) => state.maximize);

  // control AvailableBuses height
  const animatedHeight = useRef(new Animated.Value(height * 0.35)).current; // default minimized height

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: maximize ? height * 0.9 : height * 0.35,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [maximize]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {!maximize && <Header />}

      <View style={styles.container_2}>
        <Inform />

        {/* AvailableBuses overlays from bottom */}
        <Animated.View style={[styles.availableBusesWrapper, { height: animatedHeight }]}>
          <AvailableBuses />
        </Animated.View>
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
  availableBusesWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
