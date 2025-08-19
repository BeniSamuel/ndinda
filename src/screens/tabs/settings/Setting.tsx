import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TabLayout from "../../../layout/TabLayout";

const Setting = () => {
  return (
    <TabLayout
      screen_name="Settings"
      image={require("../../../../assets/onboarding/user-profile-image.png")}
    >
      <View>
        <Text>Settings</Text>
      </View>
    </TabLayout>
  );
};

export default Setting;

const styles = StyleSheet.create({});
