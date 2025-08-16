import {
  Dimensions,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../components/common/header/Header";

const { width, height } = Dimensions.get("window");

type TabLayoutProp = {
  children: ReactNode;
  screen_name?: string;
  image?: ImageSourcePropType;
};

const TabLayout: React.FC<TabLayoutProp> = ({
  children,
  screen_name,
  image,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header screen_name={screen_name} image={image} />
      <View>{children}</View>
    </SafeAreaView>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? height * 0.035 : null,
  },
});
